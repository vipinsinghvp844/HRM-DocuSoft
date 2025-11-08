import { useState, useEffect } from "react";
import LoaderSpiner from "./LoaderSpiner";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  MasterDetail,
} from "devextreme-react/data-grid";
import api from "./api";
import { ArrowLeftCircle } from "lucide-react";
import { GetAttendanceDataActionById } from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch, useSelector } from "react-redux";

// Utility functions
const padZero = (num) => String(num).padStart(2, "0");

const formatDuration = (minutes = 0) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${padZero(hours)}:${padZero(mins)}`;
};

const convertMinutes = (minutes = 0) => ({
  hours: Math.floor(minutes / 60),
  minutes: minutes % 60,
});

const convertTo12Hour = (time24) => {
  if (!time24) return "N/A";
  let [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${padZero(hours)}:${padZero(minutes)} ${period}`;
};

// Tailwind Dropdown
const CustomDropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 transition"
      >
        {title}
      </button>

      {isOpen && (
        <div className="absolute z-20 bg-white border rounded shadow-md mt-1 max-h-48 overflow-y-auto text-sm">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Component
const AttendanceRecord = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [workDuration, setWorkDuration] = useState({ hours: 0, minutes: 0 });
  const [breakDuration, setBreakDuration] = useState({ hours: 0, minutes: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const formattedMonth = padZero(selectedMonth);
  const { TotalEmployeeInLeaveById, TotalHolidays } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await dispatch(
          GetAttendanceDataActionById(formattedMonth, selectedYear)
        );

        // Sort by time to ensure proper sequence of clock/break events
        data.sort((a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`));

        // const Holires = await api.get(import.meta.env.VITE_API_HOLIDAYS);
        const holidaysData = TotalHolidays;

        // const Leaveres = await api.get(`${import.meta.env.VITE_API_LEAVE}`);
        const leaveData = TotalEmployeeInLeaveById;

        let totalWorkMinutes = 0;
        let totalBreakMinutes = 0;

        // Combine attendance data per user/date
        const combinedData = data.reduce((acc, record) => {
          totalWorkMinutes += Math.round(Number(record.total_work || 0));
          totalBreakMinutes += Math.round(Number(record.total_break || 0));

          let userRecord = acc.find(
            (item) => item.user_id === record.user_id && item.date === record.date
          );

          if (!userRecord) {
            userRecord = {
              id: record.id,
              user_id: record.user_id,
              user_name: record.user_name,
              date: record.date,
              clock_in: "N/A",
              clock_out: "N/A",
              total_work: "00:00",
              breaks: [],
              status: "",
            };
            acc.push(userRecord);
          }

          if (record.type === "clock_in") {
            userRecord.clock_in = convertTo12Hour(record.time);
          }

          if (record.type === "clock_out") {
            userRecord.clock_out = convertTo12Hour(record.time);
            if (record.total_work) {
              userRecord.total_work = formatDuration(Math.round(Number(record.total_work)));
            }
          }

          if (record.type === "break_in") {
            userRecord.breaks.push({
              break_in: convertTo12Hour(record.time),
              break_out: "N/A",
              total_break: "00:00",
            });
          }

          if (record.type === "break_out") {
            let last = userRecord.breaks.find((b) => b.break_out === "N/A");
            if (last) {
              last.break_out = convertTo12Hour(record.time);
              if (record.total_break) {
                last.total_break = formatDuration(Math.round(Number(record.total_break)));
              }
            } else {
              // fallback in case of missing break_in
              userRecord.breaks.push({
                break_in: "N/A",
                break_out: convertTo12Hour(record.time),
                total_break: record.total_break
                  ? formatDuration(Math.round(Number(record.total_break)))
                  : "00:00",
              });
            }
          }

          return acc;
        }, []);

        // Fill month view with holidays, leaves, absents
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const fullMonthData = [];

        for (let day = 1; day <= daysInMonth; day++) {
          const date = `${selectedYear}-${padZero(selectedMonth)}-${padZero(day)}`;
          const record = combinedData.find((r) => r.date === date);
          const holiday = holidaysData.find((h) => h.holiday_date === date);
          const leave = leaveData.find(
            (l) => l.start_date <= date && l.end_date >= date && l.status === "Accept"
          );

          fullMonthData.push(
            record
              ? record
              : leave
                ? {
                  id: `leave-${day}`,
                  date,
                  clock_in: "-",
                  clock_out: "-",
                  total_work: "-",
                  status: "On Leave",
                  breaks: [],
                }
                : holiday
                  ? {
                    id: `holiday-${day}`,
                    date,
                    clock_in: "-",
                    clock_out: "-",
                    total_work: "-",
                    status: `Holiday: ${holiday.holiday_name}`,
                    breaks: [],
                  }
                  : {
                    id: `absent-${day}`,
                    date,
                    clock_in: "-",
                    clock_out: "-",
                    total_work: "-",
                    status: "Absent",
                    breaks: [],
                  }
          );
        }

        setWorkDuration(convertMinutes(totalWorkMinutes));
        setBreakDuration(convertMinutes(totalBreakMinutes));
        setAttendanceData(fullMonthData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [formattedMonth, selectedYear, dispatch]);

  // Row Color Coding
  const statusColorMap = {
    Present: { bg: "bg-green-100 text-green-800", row: "#e6ffed" },
    Holiday: { bg: "bg-blue-100 text-blue-800", row: "#e6f0ff" },
    Leave: { bg: "bg-yellow-100 text-yellow-800", row: "#fff9e6" },
    Absent: { bg: "bg-red-100 text-red-800", row: "#ffe6e6" },
  };

  const getStatusType = (status = "") => {
    if (status.includes("Holiday")) return "Holiday";
    if (status.includes("Leave")) return "Leave";
    if (status === "Absent") return "Absent";
    return "Present";
  };

  const months = [...Array(12).keys()].map((m) => m + 1);
  const years = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

  // Render UI
  return (
    <div className="pt-4 px-2">
      {/* Header */}
      <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">
          Attendance Records for {formattedMonth}/{selectedYear}
        </h3>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="border border-green-300 rounded p-3 shadow-sm flex-1">
          <h5 className="text-green-600 font-semibold text-sm">Total Work</h5>
          <p className="text-base font-medium">
            {padZero(workDuration.hours)} hrs {padZero(workDuration.minutes)} mins
          </p>
        </div>

        <div className="border border-red-300 rounded p-3 shadow-sm flex-1">
          <h5 className="text-red-600 font-semibold text-sm">Total Break</h5>
          <p className="text-base font-medium">
            {padZero(breakDuration.hours)} hrs {padZero(breakDuration.minutes)} mins
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-end gap-3 mb-2">
        <CustomDropdown title={`Month: ${formattedMonth}`} options={months} onSelect={setSelectedMonth} />
        <CustomDropdown title={`Year: ${selectedYear}`} options={years} onSelect={setSelectedYear} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
        <DataGrid
          dataSource={isLoading ? [] : attendanceData}
          // rowAlternationEnabled
          showBorders
          columnAutoWidth
          wordWrapEnabled
          height="500px"
          onRowPrepared={(e) => {
            if (e.rowType !== "data") return;
            const type = getStatusType(e.data.status);
            const color = statusColorMap[type];
            if (color?.row) e.rowElement.style.backgroundColor = color.row;
          }}
        >
          <SearchPanel visible placeholder="Search..." />
          <FilterRow visible />
          <HeaderFilter visible />
          <Paging defaultPageSize={31} />

          <Column caption="#" width={50} cellRender={({ rowIndex }) => rowIndex + 1} />
          <Column dataField="date" caption="Date" dataType="date" />
          <Column dataField="clock_in" caption="Check In" />
          <Column dataField="clock_out" caption="Check Out" />
          <Column dataField="total_work" caption="Total Work" />
          <Column
            dataField="status"
            caption="Status"
            cellRender={({ data }) => {
              const type = getStatusType(data.status);
              const color = statusColorMap[type];
              return (
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${color.bg}`}
                >
                  {data.status}
                </span>
              );
            }}
          />

          {/* Break Details */}
          <MasterDetail
            enabled
            component={({ data }) => {
              const breaks = data.data.breaks || [];
              // Calculate total minutes of all breaks
              const totalBreakMinutes = breaks.reduce((sum, b) => {
                const [hours, mins] = b.total_break.split(":").map(Number);
                return sum + (hours * 60 + mins);
              }, 0);

              const totalFormatted = formatDuration(totalBreakMinutes);

              return (
                <div className="p-2 bg-gray-50 rounded-md">
                  <DataGrid
                    dataSource={breaks}
                    columnAutoWidth
                    showBorders
                    wordWrapEnabled
                    noDataText="No breaks recorded"
                  >
                    <Column dataField="break_in" caption="Break In" />
                    <Column dataField="break_out" caption="Break Out" />
                    <Column dataField="total_break" caption="Break Duration" />
                  </DataGrid>

                  {/* Total Summary */}
                  <div className="flex justify-end mt-2 pr-4">
                    <div className="text-sm font-semibold text-gray-700">
                      Total Break:{" "}
                      <span className="text-red-600">{totalFormatted}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          />

        </DataGrid>

        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <LoaderSpiner />
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceRecord;
