import React, { useState, useEffect } from "react";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  isSunday,
} from "date-fns";
import "./AttendanceCsv.css";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
  import DataGrid, {
    Column,
    Paging,
    FilterRow,
    HeaderFilter,
    SearchPanel,
    Export,
  } from "devextreme-react/data-grid";
  import jsPDF from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

const AttendanceCsv = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth()); // Default current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default current year
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );
   const onExporting = (e) => {
    const doc = new jsPDF();

    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save("DataGrid.pdf");
    });
  };

  // Convert minutes → hr:min
  const convertMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = TotalUsers;
        const employeeUsers = response.filter(
          (user) => user.role === "employee" || user.role === "hr"
        );
        setEmployees(employeeUsers);
      } catch (error) {
        console.log("Error fetching employee data", error);
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_GET_ATTENDANCE}?month=${
            month + 1
          }&year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );
        setAttendance(response.data || []);
      } catch (error) {
        console.log("Error fetching attendance data", error);
      }
    };

    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_LEAVE, {
          params: { month: month + 1, year },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });
        setLeaves(response.data);
      } catch (error) {
        console.log("Error fetching leave data", error);
      }
    };

    const fetchHolidays = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_HOLIDAYS, {
          params: { year },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });
        setHolidays(response.data);
      } catch (error) {
        console.log("Error fetching holiday data", error);
      }
    };

    fetchEmployeeData();
    fetchAttendanceData();
    fetchLeaveData();
    fetchHolidays();
  }, [month, year]);

  const employeeList = Array.isArray(employees) ? employees : [];
  const attendanceList = Array.isArray(attendance) ? attendance : [];
  const leaveList = Array.isArray(leaves) ? leaves : [];
  const holidaysList = Array.isArray(holidays) ? holidays : [];

  // Month ke start aur end dates
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const datesInMonth = eachDayOfInterval({ start, end });

  // Week Offs (Sunday)
  const getWeekOffs = () => {
    const weekOffs = new Set();
    datesInMonth.forEach((date) => {
      if (isSunday(date)) {
        weekOffs.add(format(date, "yyyy-MM-dd"));
      }
    });
    return weekOffs;
  };
  const weekOffs = getWeekOffs();

  // Attendance Status check
  function getAttendanceStatus(employeeId, date) {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");

    // Check present
    const isPresent = attendanceList.some(
      (entry) =>
        entry.user_id === employeeId.toString() &&
        entry.date === formattedDate &&
        entry.type === "clock_in"
    );
    if (isPresent) return "P";

    // Holiday
    const isHoliday = holidaysList.some(
      (holiday) => holiday.holiday_date === formattedDate
    );
    if (isHoliday) return "H";

    // Week Off
    if (weekOffs.has(formattedDate)) return "WO";

    // Paid Leave
    const leaveRecord = leaveList.find(
      (entry) =>
        entry.user_id.toString() === employeeId.toString() &&
        entry.status === "Accept" &&
        entry.leave_type === "Paid Leave" &&
        entry.start_date &&
        entry.end_date &&
        isWithinInterval(new Date(formattedDate), {
          start: new Date(entry.start_date),
          end: new Date(entry.end_date),
        })
    );

    // Unpaid Leave
    const leaveRecordUnpaid = leaveList.find(
      (entry) =>
        entry.user_id.toString() === employeeId.toString() &&
        entry.status === "Accept" &&
        entry.leave_type === "Unpaid Leave" &&
        entry.start_date &&
        entry.end_date &&
        isWithinInterval(new Date(formattedDate), {
          start: new Date(entry.start_date),
          end: new Date(entry.end_date),
        })
    );

    if (leaveRecord) return "PL";
    else if (leaveRecordUnpaid) return "UL";

    return "A"; // Default Absent
  }

  // Totals calculation (present, leave, absent + work/break minutes)
  const calculateTotals = (employeeId) => {
    let presentCount = 0,
      absentCount = 0,
      leaveCount = 0,
      holidayCount = 0,
      weekOffCount = 0;

    let totalWorkMinutes = 0;
    let totalBreakMinutes = 0;

    // Attendance Status Count
    datesInMonth.forEach((date) => {
      const status = getAttendanceStatus(employeeId, date);
      if (status === "P") presentCount++;
      else if (status === "A") absentCount++;
      else if (status === "PL" || status === "UL") leaveCount++;
      else if (status === "H") holidayCount++;
      else if (status === "WO") weekOffCount++;
    });

    // Work/Break Minutes SUM (filter current month only)
    const empRecords = attendanceList.filter((rec) => {
      const recDate = new Date(rec.date);
      return (
        rec.user_id === employeeId.toString() &&
        recDate.getMonth() === month &&
        recDate.getFullYear() === year
      );
    });

    empRecords.forEach((rec) => {
      totalWorkMinutes += parseFloat(rec.total_work || 0);
      totalBreakMinutes += parseFloat(rec.total_break || 0);
    });
    // round off to avoid decimal fractions
    totalWorkMinutes = Math.round(totalWorkMinutes);
    totalBreakMinutes = Math.round(totalBreakMinutes);
    return {
      presentCount,
      absentCount,
      leaveCount,
      holidayCount,
      weekOffCount,
      totalWorkMinutes,
      totalBreakMinutes,
    };
  };

  // AttendanceCsv.jsx me function add karein

  const exportToCSV = () => {
    if (!employees.length) return;

    // CSV Header
    const headers = [
      "SR No.",
      "Emp-Name",
      ...datesInMonth.map((date) => format(date, "d")),
      "Total Days",
      "Absent",
      "Leave",
      "Present",
      "Holidays",
      "Wk-Offs",
      "Total Work",
      "Total Break",
    ];

    // CSV Rows
    const rows = employees.map((employee, index) => {
      const totals = calculateTotals(employee.id);

      // Daily status row
      const dailyStatus = datesInMonth.map((date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return getAttendanceStatus(employee.id, formattedDate);
      });

      return [
        index + 1,
        employee.username,
        ...dailyStatus,
        datesInMonth.length,
        totals.absentCount,
        totals.leaveCount,
        totals.presentCount,
        totals.holidayCount,
        totals.weekOffCount,
        convertMinutes(totals.totalWorkMinutes),
        convertMinutes(totals.totalBreakMinutes),
      ];
    });

    // Convert to CSV string
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    // Download CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${month + 1}-${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };



  // export to excel color 
  const exportToExcelWithColors = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    // Header row
    const headers = [
      "SR No.",
      "Emp-Name",
      ...datesInMonth.map((date) => format(date, "d")),
      "Total Days",
      "Absent",
      "Leave",
      "Present",
      "Holidays",
      "Wk-Offs",
      "Total Work",
      "Total Break",
    ];
    worksheet.addRow(headers);

    // Apply header style
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4CAF50" }, // Green header
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Data rows
    employees.forEach((employee, index) => {
      const totals = calculateTotals(employee.id);
      const dailyStatus = datesInMonth.map((date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return getAttendanceStatus(employee.id, formattedDate);
      });

      const row = worksheet.addRow([
        index + 1,
        employee.username,
        ...dailyStatus,
        datesInMonth.length,
        totals.absentCount,
        totals.leaveCount,
        totals.presentCount,
        totals.holidayCount,
        totals.weekOffCount,
        convertMinutes(totals.totalWorkMinutes),
        convertMinutes(totals.totalBreakMinutes),
      ]);

      // Status cell coloring
      dailyStatus.forEach((status, i) => {
        const cell = row.getCell(3 + i);
        if (status === "P")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4CAF50" },
          }; // green
        else if (status === "A")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF44336" },
          }; // red
        else if (status === "PL")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFEB3B" },
          }; // yellow
        else if (status === "UL")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF00BCD4" },
          }; // cyan
        else if (status === "H")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF9C27B0" },
          }; // purple
        else if (status === "WO")
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF9E9E9E" },
          }; // grey
      });
    });

    // Generate and download file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `attendance_${month + 1}-${year}.xlsx`
    );
  };



  return (
    <Container fluid className={isFullScreen ? "fullscreen" : ""}>
      <Row className="mb-4 d-flex">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{
              cursor: "pointer",
              fontSize: "32px",
              color: "#343a40",
            }}
          ></i>
        </Col>
        <Col md={9}>
          <h3 className="mt-2">Total Attendance Overview </h3>
        </Col>
      </Row>

      {/* Month & Year Selector */}
      <Row className="my-3">
        <Col xs={12} md={3}>
          <Form.Group controlId="selectMonth">
            <Form.Label>Select Month:</Form.Label>
            <Form.Control
              as="select"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {format(new Date(0, i), "MMMM")}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} md={3}>
          <Form.Group controlId="selectYear">
            <Form.Label>Select Year:</Form.Label>
            <Form.Control
              as="select"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={year - 5 + i}>
                  {year - 5 + i}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-end justify-content-end"
        >
          <div className="text-end">
            <Button variant="primary" onClick={handleToggleFullScreen}>
              {isFullScreen ? (
                <i className="bi bi-fullscreen-exit"></i>
              ) : (
                <i className="bi bi-fullscreen"></i>
              )}
            </Button>
            <Button
              variant="success"
              className="ms-2"
              onClick={exportToCSV}
              disabled={!attendance.length}
            >
              <i className="bi bi-download"></i> Export CSV
            </Button>

            <Button
              variant="warning"
              className="ms-2"
              onClick={exportToExcelWithColors}
            >
              <i className="bi bi-file-earmark-excel"></i> Export Excel
            </Button>
          </div>
        </Col>
      </Row>

      {/* Attendance Table */}
      <Row>
        <DataGrid
          dataSource={employeeList}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="shadow-sm rounded"
          height="auto"
          columnAutoWidth={true}
          wordWrapEnabled={true}
          columnHidingEnabled={true}
          onExporting={onExporting}
        >
          <SearchPanel visible={true} placeholder="Search..." />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Paging defaultPageSize={20} />

          {/* Serial Number */}
          <Column
            caption="SR No."
            width={30}
            cellRender={({ rowIndex }) => rowIndex + 1}
          />

          <Column dataField="username" caption="Emp-Name" />

          {/* Dynamic Date Columns */}
          {datesInMonth.map((date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const dayNumber = format(date, "d");
            const dayName = format(date, "EEE"); 

            return (
              <Column
                key={formattedDate}
                caption={`${dayNumber}\n${dayName}`} // shows day + short day name
                alignment="center"
                cellRender={({ data }) => {
                  const status = getAttendanceStatus(data.id, formattedDate);

                  const className =
                    status === "P"
                      ? "bg-success text-white coustomclass"
                      : status === "A"
                      ? "bg-danger text-white coustomclass"
                      : status === "PL"
                      ? "bg-warning text-dark coustomclass"
                      : status === "UL"
                      ? "bg-info text-dark coustomclass"
                      : status === "H"
                      ? "bg-info text-white coustomclass"
                      : status === "WO"
                      ? "bg-secondary text-white coustomclass"
                      : "ram";

                  return <div className={className}>{status}</div>;
                }}
              />
            );
          })}

          {/* Summary Columns */}
          <Column caption="Total Days" cellRender={() => datesInMonth.length} />
          <Column
            caption="Absent"
            cellRender={({ data }) => calculateTotals(data.id).absentCount}
          />
          <Column
            caption="Leave"
            cellRender={({ data }) => calculateTotals(data.id).leaveCount}
          />
          <Column
            caption="Present"
            cellRender={({ data }) => calculateTotals(data.id).presentCount}
          />
          <Column
            caption="Holidays"
            cellRender={({ data }) => calculateTotals(data.id).holidayCount}
          />
          <Column
            caption="Wk-Offs"
            cellRender={({ data }) => calculateTotals(data.id).weekOffCount}
          />
          <Column
            caption="Total Work"
            cellRender={({ data }) =>
              convertMinutes(calculateTotals(data.id).totalWorkMinutes)
            }
          />
          <Column
            caption="Total Break"
            cellRender={({ data }) =>
              convertMinutes(calculateTotals(data.id).totalBreakMinutes)
            }
          />
           <Export enabled={true} />
        </DataGrid>
      </Row>
    </Container>
  );
};

export default AttendanceCsv;
