import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import "./AddNewEmployee.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  AddNewEmployeeAction,
  GetTotalUserAction,
} from "../../redux/actions/EmployeeDetailsAction";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  address: "",
  mobile: "",
  dob: "",
  role: "",
  userState: "active",
};

const AddNewEmployee = () => {
  const [formData, setFormData] = useState(initialState);
  // const [userState, setUserState] = useState("active");
  const [userRoleOptions, setUserRoleOptions] = useState([]);
  const currentUserRole = localStorage.getItem("role");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserRole === "admin") {
      setUserRoleOptions(["employee", "hr", "admin"]);
    } else if (currentUserRole === "hr") {
      setUserRoleOptions(["employee"]);
    }
  }, [currentUserRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        AddNewEmployeeAction(formData, async () => {
          await dispatch(GetTotalUserAction());
        })
      );

      if (response?.status === 200) {
        toast.success("User added successfully!");
        setFormData(initialState); // reset form
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Something went wrong");
    }
  };

  // Utility for text inputs
  const renderInput = (label, name, type = "text", extraProps = {}) => (
    <Form.Group className="mb-3" controlId={`form${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        required
        {...extraProps}
      />
    </Form.Group>
  );

  return (
    <Container className="add-new-employee">
      <Row className="mb-4">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{ cursor: "pointer", fontSize: "32px", color: "#343a40" }}
          ></i>
        </Col>
        <Col md={10}>
          <h3 className="mt-2">Add New Employee</h3>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Form onSubmit={handleAddUser}>
            <Row>
              <Col md={6}>{renderInput("First Name", "firstName")}</Col>
              <Col md={6}>{renderInput("Last Name", "lastName")}</Col>
            </Row>

            <Row>
              <Col md={6}>{renderInput("Username", "username")}</Col>
              <Col md={6}>{renderInput("Email", "email", "email")}</Col>
            </Row>

            <Row>
              <Col md={6}>{renderInput("Address", "address")}</Col>
              <Col md={6}>
                <Form.Group controlId="formUserRole" className="mb-3">
                  <Form.Label>User Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select role...</option>
                    {userRoleOptions.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {renderInput("Mobile Number", "mobile", "tel")}
              </Col>
              <Col md={6}>{renderInput("Date of Birth", "dob", "date")}</Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formUserState" className="mb-3">
                  <Form.Label>User State</Form.Label>
                  <Form.Select
                    name="userState"
                    value={formData.userState}
                    onChange={handleChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                {renderInput("Password", "password", "password")}
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="submit-button">
              Add User
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewEmployee;
