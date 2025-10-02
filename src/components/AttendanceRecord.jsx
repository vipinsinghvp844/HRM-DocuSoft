import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GetAttendanceDataActionById } from "../../redux/actions/EmployeeDetailsAction";
import LoaderSpiner from "./LoaderSpiner";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  MasterDetail,
} from "devextreme-react/data-grid";
import { ArrowLeftCircle } from "lucide-react";


// Utility function to format time in HH:MM format
const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  return `${padZero(hours)}:${padZero(mins)}`;
};

const padZero = (num) => num.toString().padStart(2, "0");

const CustomDropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginLeft: "10px",
      }}
    >
      <Button onClick={() => setIsOpen(!isOpen)} variant="secondary">
        {title}
      </Button>
      {isOpen && (
        <div className="dropdown-menu show">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
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

const AttendanceRecord = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [workDuration, setWorkDuration] = useState({ hours: 0, minutes: 0 });
  const [breakDuration, setBreakDuration] = useState({ hours: 0, minutes: 0 });
  const userId = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const convertTo12Hour = (time24) => {
    let [hours, minutes] = time24.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${padZero(hours)}:${padZero(minutes)} ${period}`;
  };
  // ✅ Utility: minutes → hours:minutes
  const formatHoursMinutes = (value) => {
    if (!value) return "--:--";
    if (typeof value === "object" && value.hours !== undefined && value.minutes !== undefined) {
      return `${value.hours}h ${value.minutes}m`;
    }
    const minutes = Number(value);
    if (isNaN(minutes)) return "--:--";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };


  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await dispatch(
          GetAttendanceDataActionById(selectedMonth, selectedYear)
        );

        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const combinedData = sortedData.reduce((acc, record) => {
          let userRecord = acc.find(
            (item) =>
              item.user_id === record.user_id && item.date === record.date
          );

          if (!userRecord) {
            userRecord = {
              id: record.id,
              user_id: record.user_id,
              user_name: record.user_name,
              date: record.date,
              clock_in: "N/A",
              clock_out: "N/A",
              total_work: "0.00",
              breaks: [],
            };
            acc.push(userRecord);
          }

          switch (record.type) {
            case "clock_in":
              userRecord.clock_in = convertTo12Hour(record.time);
              break;
            case "clock_out":
              userRecord.clock_out = convertTo12Hour(record.time);
              userRecord.total_work = record.total_work; // minutes me hai
              break;
            case "break_in":
              userRecord.breaks.push({
                break_in: convertTo12Hour(record.time),
                break_out: "N/A",
                total_break: "0",
              });
              break;
            case "break_out":
              let lastBreak = userRecord.breaks.find(
                (b) => b.break_out === "N/A"
              );
              if (lastBreak) {
                lastBreak.break_out = convertTo12Hour(record.time);
                lastBreak.total_break = record.total_break; // minutes me hai
              }
              break;
            default:
              break;
          }

          return acc;
        }, []);

        combinedData.forEach((record) => {
          record.breaks.sort(
            (a, b) => new Date(a.break_in) - new Date(b.break_in)
          );
        });

        // ✅ Monthly totals calculate karo
        let totalWorkMinutes = 0;
        let totalBreakMinutes = 0;

        combinedData.forEach((rec) => {
          totalWorkMinutes += Math.round(parseFloat(rec.total_work || 0));
          rec.breaks.forEach((br) => {
            totalBreakMinutes += Math.round(parseFloat(br.total_break || 0));
          });
        });

        setWorkDuration({
          hours: Math.floor(totalWorkMinutes / 60),
          minutes: totalWorkMinutes % 60,
        });

        setBreakDuration({
          hours: Math.floor(totalBreakMinutes / 60),
          minutes: totalBreakMinutes % 60,
        });

        setAttendanceData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, selectedMonth, selectedYear]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const months = [...Array(12).keys()].map((month) => month + 1);
  const years = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

  return (
   <div className="pt-4 px-2">
  <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
    <button
      onClick={() => window.history.back()}
      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
    >
      <ArrowLeftCircle size={32} className="mr-2" />
      <span className="hidden md:inline text-lg font-semibold">Back</span>
    </button>

    <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">
      Attendance Records for {selectedMonth}/{selectedYear}
    </h3>
  </div>

  <div className="flex flex-wrap gap-4 items-end mb-1">
    {/* Month & Year Selector */}
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col">
        <label className="font-medium">Select Month:</label>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Select Year:</label>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="flex gap-4 justify-end ml-auto">
      <div className="flex gap-4 p-1 border border-green-300 rounded shadow-sm justify-center align-items-center h-10">
        <h5 className="text-green-600 font-semibold text-sm m-0">Total Work</h5>
        <p className="text-base font-medium m-0">
          {padZero(workDuration.hours)} hrs {padZero(workDuration.minutes)} mins
        </p>
      </div>

      <div className="flex gap-4 p-1 border border-green-300 rounded shadow-sm justify-center align-items-center h-10">
        <h5 className="text-red-600 font-semibold text-sm m-0">Total Break</h5>
        <p className="text-base font-medium m-0">
          {padZero(breakDuration.hours)} hrs {padZero(breakDuration.minutes)} mins
        </p>
      </div>
    </div>
  </div>

  <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
    <DataGrid
      dataSource={isLoading ? [] : attendanceData}
      keyExpr="id"
      showBorders={true}
      rowAlternationEnabled={true}
      className="shadow-sm rounded"
      // height="500px"
      columnAutoWidth={true}
      wordWrapEnabled={true}
      columnHidingEnabled={true}
    >
      <SearchPanel visible={true} placeholder="Search..." />
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Paging defaultPageSize={20} />

      <Column caption="#" width={30} cellRender={({ rowIndex }) => rowIndex + 1} />
      <Column dataField="date" caption="Date" dataType="date" />
      <Column dataField="user_name" caption="User Name" />
      <Column dataField="clock_in" caption="Check In" />
      <Column dataField="clock_out" caption="Check Out" />
      <Column
        dataField="total_work"
        caption="Total Work"
        cellRender={({ value }) => formatHoursMinutes(value)}
      />

      <MasterDetail
        enabled={true}
        component={({ data }) => (
          <DataGrid
            dataSource={data.data.breaks}
            showBorders={true}
            columnAutoWidth={true}
            className="rounded"
          >
            <Column dataField="break_in" caption="Break In" />
            <Column dataField="break_out" caption="Break Out" />
            <Column dataField="total_break" caption="Total Break" />
          </DataGrid>
        )}
      />
    </DataGrid>

    {/* {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
        <LoaderSpiner />
      </div>
    )} */}
  </div>
</div>


  );
};

export default AttendanceRecord;
