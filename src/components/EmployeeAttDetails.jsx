import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
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

// ===== Utils =====
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

// ===== Custom Dropdown =====
const CustomDropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block", marginLeft: 10 }}
    >
      <Button
        variant="secondary"
        size="sm"
        style={{ borderRadius: 6, fontSize: 14 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </Button>
      {isOpen && (
        <div
          className="dropdown-menu show"
          style={{ maxHeight: 200, overflowY: "auto", fontSize: 14 }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
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

// ===== Main Component =====
const EmployeeAttendance = () => {
  const { userId } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [workDuration, setWorkDuration] = useState({ hours: 0, minutes: 0 });
  const [breakDuration, setBreakDuration] = useState({ hours: 0, minutes: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const formattedMonth = padZero(selectedMonth);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          `${import.meta.env.VITE_API_GET_ATTENDANCE
          }/${userId}/?month=${formattedMonth}&year=${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );


        let totalWorkMinutes = 0;
        let totalBreakMinutes = 0;

        const combinedData = data.reduce((acc, record) => {
          totalWorkMinutes += Math.round(Number(record.total_work || 0));
          totalBreakMinutes += Math.round(Number(record.total_break || 0));

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
              total_work: "00:00",
              breaks: [],
            };
            acc.push(userRecord);
          }

          if (record.type === "clock_in") {
            userRecord.clock_in = convertTo12Hour(record.time);
          }
          if (record.type === "clock_out") {
            userRecord.clock_out = convertTo12Hour(record.time);
            userRecord.total_work = formatDuration(record.total_work);
          }
          if (record.type === "break_in") {
            userRecord.breaks.push({
              break_in: convertTo12Hour(record.time),
              break_out: "N/A",
              total_break: "00:00",
            });
          }
          if (record.type === "break_out") {
            let lastBreak = userRecord.breaks.find(
              (b) => b.break_out === "N/A"
            );
            if (lastBreak) {
              lastBreak.break_out = convertTo12Hour(record.time);
              lastBreak.total_break = formatDuration(record.total_break);
            }
          }

          return acc;
        }, []);


        setWorkDuration(convertMinutes(totalWorkMinutes));
        setBreakDuration(convertMinutes(totalBreakMinutes));
        setAttendanceData(
          combinedData
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, selectedMonth, selectedYear]);

  const months = [...Array(12).keys()].map((m) => m + 1);
  const years = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

  return (
    <Container className="border rounded shadow-sm p-4 bg-white">
      {/* Header */}
      <Row className="mb-4 d-flex align-items-center">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{ cursor: "pointer", fontSize: 32, color: "#343a40" }}
          ></i>
        </Col>
        <Col md={9}>
          <h3 className="mt-2">Attendance Records for {userId}</h3>
        </Col>
      </Row>

      {/* Monthly Summary */}
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

      {/* Filters */}
      <Row>
        <Col className="d-flex justify-content-end">
          <CustomDropdown
            title={`Month: ${formattedMonth}`}
            options={months}
            onSelect={setSelectedMonth}
          />
          <CustomDropdown
            title={`Year: ${selectedYear}`}
            options={years}
            onSelect={setSelectedYear}
          />
        </Col>
      </Row>

      {/* Attendance Table */}
      <Row>
       <div style={{ position: "relative" }}>
  <DataGrid
    dataSource={isLoading ? [] : attendanceData}
    keyExpr="id"
    showBorders={true}
    rowAlternationEnabled={true}
    className="shadow-sm rounded"
    height="500px" 
    columnAutoWidth={true}
    wordWrapEnabled={true}
    columnHidingEnabled={true}
  >
    <SearchPanel visible={true} placeholder="Search..." />
    <FilterRow visible={true} />
    <HeaderFilter visible={true} />
    <Paging defaultPageSize={20} />
    <Column caption="#" width={50} cellRender={({ rowIndex }) => rowIndex + 1} />
    <Column dataField="date" caption="Date" dataType="date" />
    <Column dataField="user_name" caption="User Name" />
    <Column dataField="clock_in" caption="Check In" />
    <Column dataField="clock_out" caption="Check Out" /> 
    <Column dataField="total_work" caption="Total Work" />

    <MasterDetail
      enabled={true}
      component={({ data }) => (
        <DataGrid
          dataSource={data.data.breaks}
          showBorders={true}
          columnAutoWidth={true}
        >
          <Column dataField="break_in" caption="Break In" />
          <Column dataField="break_out" caption="Break Out" />
          <Column dataField="total_break" caption="Total Break" />
        </DataGrid>
      )}
    />
  </DataGrid>

  {isLoading && (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255,255,255,0.6)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <div role="status"> 
        <LoaderSpiner />  
      </div>
    </div>
  )}
</div>
      </Row>
    </Container>
  );
};

export default EmployeeAttendance;
