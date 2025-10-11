import React, { useState } from "react";
// import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ChangePasswordAction } from "../../redux/actions/dev-aditya-action";
import { Box } from "@mui/material";
// import { toast } from "react-toastify";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'danger'
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_id"); // Assume userId is stored in localStorage

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      setMessageType("danger");
      return;
    }
    let body = {
      user_id: userId,
      current_password: currentPassword,
      new_password: newPassword,
    };
    const response = await dispatch(ChangePasswordAction(body));
    // console.log(response, "=============response");
    if (response) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      //   setMessage(response.data.message);
      //   setMessageType("success");
    } else {
      //   setMessage("Error changing password");
      //   setMessageType("danger");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={12}>
          <h3 className="my-4 text-center text-primary">Change Password</h3>
          {message && <Alert variant={messageType}>{message}</Alert>}
          <Form className="p-4 shadow rounded bg-white">
            <Form.Group controlId="currentPassword">
              <Form.Label className="fw-bold">Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group controlId="newPassword" className="mt-3">
              <Form.Label className="fw-bold">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label className="fw-bold">Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>

           <Box className="flex items-center justify-end">
             <Button
              variant="primary"
              onClick={handleChangePassword}
              className="btn-blue  mt-2"
              size="lg"
            >
              Change Password
            </Button>
           </Box>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
