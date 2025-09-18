import React, { useEffect, useState } from "react";
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
  const [leaveDays, setLevaDays] = useState({
    unpaidLeave: 0,
    paidLeave: 0,
  })
  const [reasonForLeave, setReasonForLeave] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];


  const isDateInPast = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const givenDate = new Date(date).setHours(0, 0, 0, 0);
    return givenDate < today;
  };

  const isStartDateBeforeEndDate = (startDate, endDate) => {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(0, 0, 0, 0);
    return start <= end;
  };

  const checkExistingLeaveRequests = async (userId, startDate, endDate) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_LEAVE}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        }
      }
      );
      const leaveRequests = response.data;
      // Check if any leave requests overlap with the new request
      return leaveRequests.some((request) => {
        const requestStart = new Date(request.start_date);
        const requestEnd = new Date(request.end_date);
        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);

        return newStart <= requestEnd && newEnd >= requestStart;
      });
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      return false;
    }
  };
  const handleSubmit = async (event) => {

    event.preventDefault();
    setIsLoading(true);

    const user_name = localStorage.getItem("user_name");
    const user_id = localStorage.getItem("user_id");

    if (!user_id || !user_name) {
      toast.info("User not logged in. Please log in and try again.");
      return;
    }
    const totalLeave = (parseInt(leaveDays?.paidLeave) || 0) + (parseInt(leaveDays?.unpaidLeave) || 0);
    if (totalLeave <= 0) {
      toast.warn("Please enter at least 1 day of leave (paid or unpaid).");
      setIsLoading(false);
      return;
    }

    // Check if start date is in the past
    if (isDateInPast(startDate)) {
      toast.info("Start date cannot be in the past.");
      return;
    }

    if (!isStartDateBeforeEndDate(startDate, endDate)) {
      toast.info("Start date cannot be after end date.");

      return;
    }

    // Check for existing leave requests
    const hasExistingRequest = await checkExistingLeaveRequests(
      user_id,
      startDate,
      endDate
    );
    if (hasExistingRequest) {
      toast.warn("Leave request already exists for the specified dates.");

      return;
    }
    const resetForm = () => {
      setStartDate("");
      setEndDate("");
      setReasonForLeave("");
      setLevaDays({ unpaidLeave: 0, paidLeave: 0 });
    };



    const newLeaveRequest = {
  user_id: user_id,
  user_name: user_name,
  apply_date: currentDate,
  start_date: startDate,
  end_date: endDate,
  reason_for_leave: reasonForLeave,
  total_leave_days: totalLeave,
  paid_leave_count: parseInt(leaveDays?.paidLeave) || 0, 
  unpaid_leave_count: parseInt(leaveDays?.unpaidLeave) || 0,
  status: "Pending",
  action: "Submitted",
  hr_note: ""
};


    try {

      const response = await dispatch(
        SubmitLeave(newLeaveRequest,
          async (data) => {
            await dispatch(GetEmployeeLeaveDetailActionById());
          }
        ));
      toast.success("Leave request submitted successfully.");
      resetForm();
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Error submitting leave request. Please try again later.");
    } finally {
      setIsLoading(false);

    }
  };

  const formateEndDate = (value, paidLeave, unPaidLeave) => {
    let selectedDate = new Date(value);
    let paidLeaveNumber = Number(paidLeave) || 0;
    let unpaidLeavenumber = Number(unPaidLeave) || 0;
    let totalLeaveDays = (paidLeaveNumber || unpaidLeavenumber) ? paidLeaveNumber + unpaidLeavenumber - 1 : 0;
    selectedDate.setDate(selectedDate.getDate() + totalLeaveDays);
    let formattedEndDate = selectedDate.toISOString().split('T')[0];
    return formattedEndDate

  }


  return (
    <Container className="mt-4 ">
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
          <h3 className="mt-2">Apply Leave</h3>
        </Col>
      </Row>
      <Row className="">
        <Card>
          <Card.Header as="h3" className="text-center">
            Leave Requests
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="PaidLeave" className="mb-3">
                <Form.Label column sm={4}>
                  Paid Leave
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    min="0"
                    value={leaveDays?.paidLeave}
                    onChange={(e) => {
                      e.preventDefault();
                      let value = e.target.value.trim()
                        ? parseInt(e.target.value, 10)
                        : 0;

                      if (!isNaN(value) && value >= 0) {
                        setLevaDays((prev) => ({
                          ...prev,
                          paidLeave: value,
                        }));
                      }
                      if (startDate) {
                        let formattedEndDate = formateEndDate(
                          startDate,
                          value,
                          leaveDays?.unpaidLeave
                        );
                        if (formattedEndDate) {
                          setEndDate(formattedEndDate);
                        }
                      }
                    }}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="UnpaidLeave" className="mb-3">
                <Form.Label column sm={4}>
                  Unpaid Leave
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    min="0"
                    value={leaveDays?.unpaidLeave}
                    onChange={(e) => {
                      e.preventDefault();
                      const value = parseInt(e.target.value, 10) || 0;
                      if (value >= 0) {
                        setLevaDays((prev) => ({
                          ...prev,
                          unpaidLeave: value,
                        }));
                      }

                      if (startDate) {
                        let formattedEndDate = formateEndDate(
                          startDate,
                          leaveDays?.paidLeave,
                          value
                        );
                        setEndDate(formattedEndDate);
                      }
                    }}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="startDate" className="mb-3">
                <Form.Label column sm={4}>
                  Start Date
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      let formattedEndDate = formateEndDate(
                        e.target.value,
                        leaveDays?.paidLeave,
                        leaveDays?.unpaidLeave
                      );
                      setEndDate(formattedEndDate);
                      setStartDate(e.target.value);
                    }}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="endDate" className="mb-3">
                <Form.Label column sm={4}>
                  End Date
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    readOnly
                  />
                </Col>
              </Form.Group>

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
