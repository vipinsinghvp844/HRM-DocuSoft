import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAttendanceDataActionByDate } from "../../redux/actions/EmployeeDetailsAction";
import EditEmployeeAttendance from "./EditEmployeeAttendance";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { ArrowLeftCircle } from "lucide-react";

function OverviewAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  

  const [isLoading, setIsLoading] = useState("false");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
 const { getAttendanceByDate } = useSelector(
   ({ EmployeeDetailReducers }) => EmployeeDetailReducers
 );

  useEffect(() => {
    fetchAttendanceRecords();
       dispatch(GetAttendanceDataActionByDate());
    
  }, []);

  const fetchAttendanceRecords = async () => {
    setIsLoading(true);
    try {
      const combinedData = getAttendanceByDate.reduce((acc, record) => {
        let userRecord = acc.find(
          (item) => item.user_id === record.user_id && item.date === record.date
        );

        if (!userRecord) {
          userRecord = {
            user_id: record.user_id,
            user_name: record.user_name,
            date: record.date,
            clock_in: "N/A",
            clock_out: "N/A",
            break_in: "N/A",
            break_out: "N/A",
            total_break_time: 0,
          };
          acc.push(userRecord);
        }

        switch (record.type) {
          case "clock_in":
            userRecord.clock_in = convertTo12HourFormat(record.time);
            break;
          case "clock_out":
            userRecord.clock_out = convertTo12HourFormat(record.time);
            break;
          case "break_in":
            userRecord.break_in = convertTo12HourFormat(record.time);
            break;
          case "break_out":
            userRecord.break_out = convertTo12HourFormat(record.time);
            break;
          default:
            break;
        }

        if (record.type === "break_out" && userRecord.break_in !== "N/A") {
          const breakDuration =
            (new Date(`1970-01-01T${record.time}Z`) -
              new Date(`1970-01-01T${userRecord.break_in}Z`)) /
            1000 /
            60; // duration in minutes
          userRecord.total_break_time += breakDuration;
        }

        return acc;
      }, []);

      setAttendanceRecords(combinedData);
      // setLoading(false);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };
  function convertTo12HourFormat(time24) {
    if (!time24) return "--:--"; // Handle null/undefined input gracefully
    let [hours, minutes, seconds] = time24.split(":"); // Split the time string
    hours = parseInt(hours, 10);

    const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    return `${hours}:${minutes} ${period}`;
  }

  return (
    <div className="pt-4 px-2">
      <div className="flex  md:flex-row items-center justify-between gap-2 mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>

        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">
          Today Attendance
        </h3>

        <button
          onClick={handleShow}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Edit Attendance
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3">
        <DataGrid
          dataSource={attendanceRecords}
          keyExpr="user_id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="w-full"
          height="auto"
          columnAutoWidth={true}
          wordWrapEnabled={true}
          columnHidingEnabled={true}
        >
          <SearchPanel visible={true} placeholder="Search..." />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Paging defaultPageSize={20} />
          <Column caption="#" width={50} cellRender={({ rowIndex }) => rowIndex + 1} />
          <Column dataField="user_id" caption="ID" />
          <Column dataField="user_name" caption="User Name" />
          <Column dataField="date" caption="Date" dataType="date" />
          <Column dataField="clock_in" caption="Check In" />
          <Column dataField="clock_out" caption="Check Out" />
          <Column dataField="break_in" caption="Break In" />
          <Column dataField="break_out" caption="Break Out" />
          <Column dataField="total_break" caption="Total Break" />
          <Column dataField="total_work" caption="Total Work" />
        </DataGrid>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 right-0 h-full w-25 bg-white shadow-lg z-50 transform transition-transform duration-300">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Edit Attendance</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <EditEmployeeAttendance />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OverviewAttendance;
