import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Alert } from "react-bootstrap";
import TodayPresent from "./TodayPresent";
import TodayAbsent from "./TodayAbsent";
import TodayOnLeave from "./TodayOnLeave";
import TotalUsers from "./TotalUsers";
import MarkAttendance from "./MarkAttendance";
import "./HrDashboard.css"; // Import custom CSS for styling
import { useDispatch } from "react-redux";
import {
  GetAttendanceDataAction,
  GetEmployeeLeaveDetailAction,
  GetTotalUserAction,
  GetLeavePolicyAction,
  GetOfficeShiftsAction,
} from "../../redux/actions/EmployeeDetailsAction";
import { FetchAllUserProfileAction } from "../../redux/actions/dev-aditya-action";
import CalendarComponent from "./CalendarComponent .jsx";

const HrDashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [birthdayMessages, setBirthdayMessages] = useState([]);
  const dispatch = useDispatch();
  const firstName = localStorage.getItem("firstname") || "";
  useEffect(() => {
    const user_name = localStorage.getItem("user_name");

    if (user_name) {
      setUserName(user_name);
    }
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setUserId(user_id);
    }
    const date = new Date();
    setCurrentDate(date.toISOString().split("T")[0]); // Format to YYYY-MM-DD
    if (userId) {
      // fetchAttendanceRecords(date);
    }
  }, [userId]);


  useEffect(() => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      dispatch(GetEmployeeLeaveDetailAction());
      dispatch(GetTotalUserAction());
      dispatch(GetAttendanceDataAction(currentDate));
      dispatch(FetchAllUserProfileAction());
      dispatch(GetLeavePolicyAction());
      dispatch(GetOfficeShiftsAction());
    } catch (error) {
      ("Error fetching All Detailed")
    }
  }, []);

  return (
    <Container fluid className="p-2 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          👋 Welcome Back,{" "}
          <span className="text-blue-600 underline decoration-wavy">
            {firstName}
          </span>
          !
        </h1>
        <p className="text-gray-600 mt-2">
          Have a great day ahead 😊
        </p>
      </div>

      <Row className="g-3 p-3">
        <Col xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <TotalUsers setBirthdayMessages={setBirthdayMessages} />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <TodayPresent />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <TodayOnLeave />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <TodayAbsent />
          </Card>
        </Col>
      </Row>
      <MarkAttendance />
      <CalendarComponent />
    </Container>
  );
};

export default HrDashboard;
