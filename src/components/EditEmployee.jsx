import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { GetTotalUserAction } from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "./api";

const EditEmployee = ({ employeeId, show, handleClose }) => {
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    username: "",
    dob: "",
    email: "",
    mobile: "",
    role: "",
    address: "",
    user_state:"",
  });
  const dispatch = useDispatch();
    const { TotalUsers } = useSelector(
      ({ EmployeeDetailReducers }) => EmployeeDetailReducers
    );

  useEffect(() => {
     if (show && employeeId && TotalUsers?.length > 0) {
       const selectedUser = TotalUsers.find((u) => u.id === employeeId);
       if (selectedUser) {
         setEmployee(selectedUser);
       } else {
         toast.error("Employee not found.");
       }
     }
   }, [show, employeeId, TotalUsers]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`${import.meta.env.VITE_API_CUSTOM_USERS}/${employeeId}`, employee);
      toast.success("Employee details updated successfully.");
      handleClose();
      const response = await dispatch(GetTotalUserAction());
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee details.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={employee.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={employee.last_name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={employee.username}
                    onChange={handleInputChange}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={employee.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={employee.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Role --</option>
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="formdob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    rows={3}
                    name="dob"
                    value={employee.dob}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={employee.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>User State</Form.Label>
                  <Form.Control
                    type="text"
                    rows={3}
                    name="user_state"
                    value={employee.user_state}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEmployee;
