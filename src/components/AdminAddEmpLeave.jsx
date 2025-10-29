import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "./api";

const AdminAddEmpLeave = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveDays, setLeaveDays] = useState({ unpaidLeave: 0, paidLeave: 0 });
  const [reasonForLeave, setReasonForLeave] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  const currentDate = new Date().toISOString().split("T")[0];

  // Utility: calculate end date based on start date & leave counts
  const formatEndDate = (value, paidLeave, unpaidLeave) => {
    let selectedDate = new Date(value);
    let totalLeaveDays =
      (Number(paidLeave) || 0) + (Number(unpaidLeave) || 0) - 1;
    selectedDate.setDate(selectedDate.getDate() + totalLeaveDays);
    return selectedDate.toISOString().split("T")[0];
  };

  // Reset form
  const resetForm = () => {
    setUserName("");
    setUserId("");
    setStartDate("");
    setEndDate("");
    setReasonForLeave("");
    setLeaveDays({ unpaidLeave: 0, paidLeave: 0 });
    setShowDropdown(false);
  };

  // Initial load
  useEffect(() => {
    const storedUserRole = localStorage.getItem("role");
    setUserRole(storedUserRole || "");

    try {
      const employeeUsers = TotalUsers?.filter(
        (user) => user.role === "employee" || user.role === "hr"
      );
      setEmployees(employeeUsers || []);
    } catch (error) {
      toast.error("Error loading employees");
    }
  }, [TotalUsers]);

  // User select from dropdown
  const handleUserSelection = (employee) => {
    setUserName(employee.username);
    setUserId(employee.id);
    setShowDropdown(false);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "employee" && localStorage.getItem("role") === "hr") {
      toast.info("Admin can only add leaves for employees.");
      return;
    }

    const totalLeave =
      (parseInt(leaveDays?.paidLeave) || 0) +
      (parseInt(leaveDays?.unpaidLeave) || 0);

    if (totalLeave <= 0) {
      toast.warn("Please enter at least 1 day of leave (paid or unpaid).");
      return;
    }

    try {
      const payload = {
        user_id: userId,
        user_name: userName,
        apply_date: currentDate,
        start_date: startDate,
        end_date: endDate,
        reason_for_leave: reasonForLeave,
        total_leave_days: totalLeave,
        paid_leave_count: parseInt(leaveDays?.paidLeave) || 0,
        unpaid_leave_count: parseInt(leaveDays?.unpaidLeave) || 0,
        status: "Pending",
        action: "Submitted",
        hr_note: "",
      };
      setIsLoading(true);

      await api.post(`${import.meta.env.VITE_API_LEAVE}`, payload);
      toast.success("Leave added successfully!");
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message,"Error adding leaves. Please try again." );
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Container className="add-attendance-container">
      <Row className="mb-4 d-flex">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{ cursor: "pointer", fontSize: "32px", color: "#343a40" }}
          ></i>
        </Col>
        <Col md={8}>
          <h3 className="mt-2">Add Leave Request</h3>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        {/* User Name Dropdown */}
        <Form.Group controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <div className="dropdown-wrapper">
            <Form.Control
              type="text"
              placeholder="Click to select user name"
              value={userName}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
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

        {/* Paid & Unpaid Leave */}
        <Form.Group controlId="formLeaveDays">
          <Form.Label>Paid Leave</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={leaveDays?.paidLeave}
            onChange={(e) => {
              const value = e.target.value.trim()
                ? parseInt(e.target.value, 10)
                : 0;
              if (value >= 0) {
                setLeaveDays((prev) => ({ ...prev, paidLeave: value }));
              }
              if (startDate) {
                setEndDate(
                  formatEndDate(startDate, value, leaveDays?.unpaidLeave)
                );
              }
            }}
            required
          />

          <Form.Label className="mt-2">Unpaid Leave</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={leaveDays?.unpaidLeave}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10) || 0;
              if (value >= 0) {
                setLeaveDays((prev) => ({ ...prev, unpaidLeave: value }));
              }
              if (startDate) {
                setEndDate(
                  formatEndDate(startDate, leaveDays?.paidLeave, value)
                );
              }
            }}
            required
          />
        </Form.Group>

        {/* Start Date */}
        <Form.Group as={Row} controlId="startDate" className="mb-3">
          <Form.Label column sm={4}>
            Start Date
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setEndDate(
                  formatEndDate(
                    e.target.value,
                    leaveDays?.paidLeave,
                    leaveDays?.unpaidLeave
                  )
                );
              }}
              required
            />
          </Col>
        </Form.Group>

        {/* End Date */}
        <Form.Group as={Row} controlId="endDate" className="mb-3">
          <Form.Label column sm={4}>
            End Date
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="date" value={endDate} readOnly required />
          </Col>
        </Form.Group>

        {/* Reason */}
        <Form.Group as={Row} controlId="reasonForLeave" className="mb-3">
          <Form.Label column sm={4}>
            Reason for Leave
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="textarea"
              rows={3}
              value={reasonForLeave}
              onChange={(e) => setReasonForLeave(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        {/* Submit Button */}
        <Form.Group as={Row} className="text-center">
          <Col>
            <Button variant="primary" type="submit">
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AdminAddEmpLeave;
