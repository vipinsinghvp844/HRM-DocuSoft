import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GetAttendanceDataActionById } from "../../redux/actions/EmployeeDetailsAction";
import LoaderSpiner from "./LoaderSpiner";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';


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

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await dispatch(
          GetAttendanceDataActionById(selectedMonth, selectedYear)
        );
console.log(data,"+++++++++");

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
    <Container-fluid className="border rounded shadow-sm p-3">
      <Row className="mb-4 d-flex">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{ cursor: "pointer", fontSize: "32px", color: "#343a40" }}
          ></i>
        </Col>
        <Col md={9}>
          <h3 className="mt-2">
            Attendance Records for {selectedMonth}/{selectedYear}
          </h3>
        </Col>
      </Row>

      {/* ✅ Monthly Summary UI */}
      <Row className="mb-3">
        <Col md={6}>
          <Card className="p-3 shadow-sm border-success">
            <h5 className="text-success">Total Work This Month</h5>
            <p className="mb-0">
              {padZero(workDuration.hours)} hrs {padZero(workDuration.minutes)}{" "}
              mins
            </p>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 shadow-sm border-danger">
            <h5 className="text-danger">Total Break This Month</h5>
            <p className="mb-0">
              {padZero(breakDuration.hours)} hrs{" "}
              {padZero(breakDuration.minutes)} mins
            </p>
          </Card>
        </Col>
      </Row>

      {/* Month & Year Selector */}
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150, mr: 2 }}>
            <InputLabel>Select Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              label="Select Month"
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150, mr: 2 }}>
            <InputLabel>Select Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              label="Select Year"
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>    
              </Col>
      </Row>


      {/* Attendance Table */}
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>User Name</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Total Work</th>
              <th>Breaks</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="9" className="text-center">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "200px" }}
                  >
                    <LoaderSpiner />
                  </div>
                </td>
              </tr>
            ) : attendanceData.length > 0 ? (
              attendanceData.map((record, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{record.date}</td>
                    <td>{record.user_name}</td>
                    <td>{record.clock_in}</td>
                    <td>{record.clock_out}</td>
                    <td>{formatDuration(record.total_work || 0)}</td>
                    <td>
                      {record.breaks.length === 0 ? (
                        "No Breaks"
                      ) : (
                        <Table bordered size="sm">
                          <tbody>
                            {record.breaks.map((breakItem, breakIndex) => (
                              <tr key={breakIndex}>
                                <td>{breakItem.break_in}</td>
                                <td>{breakItem.break_out}</td>
                                <td>
                                  {formatDuration(breakItem.total_break || 0)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No data available for the selected month and year.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container-fluid>
  );
};

export default AttendanceRecord;
