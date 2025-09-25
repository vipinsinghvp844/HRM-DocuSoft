import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import "./AddAttendance.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "./api";
import { submitAttendanceAction } from "../../redux/actions/EmployeeDetailsAction";

const AddAttendance = ({ currentUserRole }) => {
  const dispatch = useDispatch();
  const { TotalUsers } = useSelector(({ EmployeeDetailReducers }) => EmployeeDetailReducers);

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);

  useEffect(() => {
    const employeeUsers = TotalUsers.filter(
      (user) => ["employee", "hr"].includes(user.role)
    );
    setEmployees(employeeUsers);
  }, [TotalUsers]);

  const checkUserAttendance = async (userId, date) => {
    try {
      const { data } = await api.get(`${import.meta.env.VITE_API_ATTENDANCE}`, {
        params: { user_id: userId, date },
        headers: { Authorization: `Bearer ${localStorage.getItem("authtoken")}` },
      });

      let clockIn = false, clockOut = false;
      data.forEach((record) => {
        if (record.type === "clock_in") clockIn = true;
        if (record.type === "clock_out") clockOut = true;
      });

      setHasClockedIn(clockIn);
      setHasClockedOut(clockOut);
    } catch (error) {
      if (error.response?.status === 404) {
        setHasClockedIn(false);
        setHasClockedOut(false);
      } else {
        console.error("Error checking attendance:", error);
      }
    }
  };

  const handleUserSelection = async (employee) => {
    setUserName(employee.username);
    setUserId(employee.id);
    setShowDropdown(false);
    await checkUserAttendance(employee.id, date);
  };

  const resetForm = () => {
    setUserName("");
    setUserId("");
    setClockInTime("");
    setClockOutTime("");
    setHasClockedIn(false);
    setHasClockedOut(false);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please select a user.");
      return;
    }

    try {
      const payload = {
        user_id: userId,
        user_name: userName,
        date,
        time: hasClockedIn ? clockOutTime : clockInTime,
        type: hasClockedIn ? "clock_out" : "clock_in",
      };

      await dispatch(submitAttendanceAction(payload));
      toast.success("Attendance added successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error adding attendance. Please try again.");
      console.error("Error adding attendance:", error);
    }
  };

  return (
    <Container className="add-attendance-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <div className="dropdown-wrapper">
            <Form.Control
              type="text"
              placeholder="Click to select user name"
              value={userName}
              onClick={() => setShowDropdown((prev) => !prev)}
              readOnly
              required
            />
            {showDropdown && (
              <ul className="dropdown-menu">
                {employees.map((employee) => (
                  <li
                    key={employee.id}
                    className="dropdown-item"
                    onClick={() => handleUserSelection(employee)}
                  >
                    {employee.username}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        {hasClockedIn && hasClockedOut ? (
          <Alert variant="info" className="mt-3">
            ✅ Attendance already completed for today
          </Alert>
        ) : (
          <>
            {!hasClockedIn ? (
              <Form.Group controlId="formClockInTime">
                <Form.Label>Clock In Time</Form.Label>
                <Form.Control
                  type="time"
                  value={clockInTime}
                  onChange={(e) => setClockInTime(e.target.value)}
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="formClockOutTime">
                <Form.Label>Clock Out Time</Form.Label>
                <Form.Control
                  type="time"
                  value={clockOutTime}
                  onChange={(e) => setClockOutTime(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="submit-button mt-3">
              {hasClockedIn ? "Add Check Out Time" : "Add Check In Time"}
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default AddAttendance;
