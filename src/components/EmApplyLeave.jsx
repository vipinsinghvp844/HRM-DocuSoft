import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import "./EmApplyLeave.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  SubmitLeave,
  GetEmployeeLeaveDetailActionById,
} from "../../redux/actions/EmployeeDetailsAction";
import api from "./api";

const ApplyLeave = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveDays, setLeaveDays] = useState({ unpaidLeave: 0, paidLeave: 0 });
  const [reasonForLeave, setReasonForLeave] = useState("");

  const currentDate = new Date().toISOString().split("T")[0];

  // 🔹 Helper functions
  const isDateInPast = (date) =>
    new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

  const isStartDateBeforeEndDate = (start, end) =>
    new Date(start).setHours(0, 0, 0, 0) <= new Date(end).setHours(0, 0, 0, 0);

  const formatEndDate = (start, paidLeave, unpaidLeave) => {
    if (!start) return "";
    const selectedDate = new Date(start);
    const totalDays =
      (Number(paidLeave) || 0) + (Number(unpaidLeave) || 0) - 1;

    if (totalDays >= 0) {
      selectedDate.setDate(selectedDate.getDate() + totalDays);
      return selectedDate.toISOString().split("T")[0];
    }
    return start;
  };

  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setReasonForLeave("");
    setLeaveDays({ unpaidLeave: 0, paidLeave: 0 });
  };

  const checkExistingLeaveRequests = async (userId, start, end) => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_API_LEAVE}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      return data.some((req) => {
        const reqStart = new Date(req.start_date);
        const reqEnd = new Date(req.end_date);
        const newStart = new Date(start);
        const newEnd = new Date(end);
        return newStart <= reqEnd && newEnd >= reqStart; // overlap check
      });
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      return false;
    }
  };

  // 🔹 Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user_name = localStorage.getItem("user_name");
    const user_id = localStorage.getItem("user_id");

    if (!user_id || !user_name) {
      toast.error("User not logged in. Please log in and try again.");
      setIsLoading(false);
      return;
    }

    const totalLeave =
      (parseInt(leaveDays.paidLeave) || 0) +
      (parseInt(leaveDays.unpaidLeave) || 0);

    if (totalLeave <= 0) {
      toast.warn("Please enter at least 1 day of leave.");
      setIsLoading(false);
      return;
    }

    if (isDateInPast(startDate)) {
      toast.info("Start date cannot be in the past.");
      setIsLoading(false);
      return;
    }

    if (!isStartDateBeforeEndDate(startDate, endDate)) {
      toast.info("Start date cannot be after end date.");
      setIsLoading(false);
      return;
    }

    const hasExistingRequest = await checkExistingLeaveRequests(
      user_id,
      startDate,
      endDate
    );

    if (hasExistingRequest) {
      toast.warn("Leave request already exists for these dates.");
      setIsLoading(false);
      return;
    }

    const newLeaveRequest = {
      user_id,
      user_name,
      apply_date: currentDate,
      start_date: startDate,
      end_date: endDate,
      reason_for_leave: reasonForLeave,
      total_leave_days: totalLeave,
      paid_leave_count: parseInt(leaveDays.paidLeave) || 0,
      unpaid_leave_count: parseInt(leaveDays.unpaidLeave) || 0,
      status: "Pending",
      action: "Submitted",
      hr_note: "",
    };

    try {
      const res = await dispatch(SubmitLeave(newLeaveRequest));
        toast.success("Leave request submitted successfully.");
        resetForm();
      if (res?.status === 200) {
        await dispatch(GetEmployeeLeaveDetailActionById());
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Error submitting leave request. Try again later.");
    } finally {
      setIsLoading(false);
    }

  };

  // 🔹 Handle leave day input
  const handleLeaveChange = (type, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    const updated = { ...leaveDays, [type]: num };
    setLeaveDays(updated);

    if (startDate) {
      setEndDate(formatEndDate(startDate, updated.paidLeave, updated.unpaidLeave));
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4 d-flex">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{ cursor: "pointer", fontSize: "32px", color: "#343a40" }}
          ></i>
        </Col>
        <Col md={9}>
          <h3 className="mt-2">Apply Leave</h3>
        </Col>
      </Row>

      <Row>
        <Card>
          <Card.Header as="h3" className="text-center">
            Leave Requests
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* Paid Leave */}
              <Form.Group as={Row} controlId="PaidLeave" className="mb-3">
                <Form.Label column sm={4}>
                  Paid Leave
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    min="0"
                    value={leaveDays.paidLeave}
                    onChange={(e) => handleLeaveChange("paidLeave", e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>

              {/* Unpaid Leave */}
              <Form.Group as={Row} controlId="UnpaidLeave" className="mb-3">
                <Form.Label column sm={4}>
                  Unpaid Leave
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    min="0"
                    value={leaveDays.unpaidLeave}
                    onChange={(e) => handleLeaveChange("unpaidLeave", e.target.value)}
                    required
                  />
                </Col>
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
                      const val = e.target.value;
                      setStartDate(val);
                      setEndDate(
                        formatEndDate(val, leaveDays.paidLeave, leaveDays.unpaidLeave)
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
                  <Form.Control
                    type="date"
                    value={endDate}
                    readOnly
                    required
                  />
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

              {/* Submit */}
              <Form.Group as={Row} className="text-center">
                <Col>
                  <Button variant="primary" type="submit" disabled={isLoading}>
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
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ApplyLeave;
