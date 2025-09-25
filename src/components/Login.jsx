import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import Spinner from "./LoaderSpiner";
import "./Login.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import {
  FetchUserProfileAction,
  LoginUserAction,
} from "../../redux/actions/dev-aditya-action";
import { setValueForSideBarClick } from "../../redux/redecer/EmployeeDetailReducers";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().required("Username or Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (data, { setSubmitting }) => {
      setLoading(true);
      try {
        const payload = {
          login: data.login,
          password: data.password,
        };
        const user = await dispatch(LoginUserAction(payload));

        const userRole = user.roles && user.roles[0] ? user.roles[0] : null;
        if (userRole) {
          await dispatch(FetchUserProfileAction());
          onLogin(userRole);

          // Redirect based on the role
          if (userRole === "admin") {
            navigate("/admin-dashboard");
          } else if (userRole === "hr") {
            navigate("/hr-dashboard");
          } else if (userRole === "employee") {
            navigate("/employee-dashboard");
          } else {
            navigate("/default-dashboard");
          }

        }
      } catch (error) {
        if (error?.response?.data?.code === "invalid_login") {
          setErrorMessage("Invalid password. Please try again.");
          setShowPopup(true);
        } else if (error.response.data.code === "[jwt_auth] invalid_email") {
          setErrorMessage(
            "Invalid email address. Please check and try again. "
          );
          setShowPopup(true);
        } else {
          setErrorMessage("Login failed. Please try again later.");
        }
        setShowPopup(true);

      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    let authToken = localStorage.getItem("authtoken");
    if (authToken) {
      let userRole = localStorage.getItem('role')

      dispatch(setValueForSideBarClick(0))

      onLogin(userRole)
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "hr") {
        navigate("/hr-dashboard");
      } else if (userRole === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/default-dashboard");
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPopup]);

  return (
    <Container fluid className="maincontainer">
      <Row className="w-100">
        <Col
          md={4}
          className="mx-auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="cardcontainer">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={formik.handleSubmit} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  name="login"
                  type="text"
                  placeholder="Enter your username or Email"
                  value={formik.values.login}
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 position-relative" >
                <Form.Control
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                  <i
                    className={`bi eyecolorhover ${showPassword ? "bi-eye-slash " : "bi-eye"} me-2`}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "1px",  
                      top: "50%",  
                      transform: "translateY(-50%)",
                      fontSize: "18px",
                      color: "#555"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>

              </Form.Group>
              <div className="d-flex justify-content-end mb-3">
                <Link
                  to="/request-password-reset"
                  className="forgot-password-link"
                >
                  Forget password?
                </Link>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3 button-login"
                disabled={formik.isSubmitting}
              >
                LOGIN
              </Button>
            </Form>
            {loading && (
              <div className="overlay">
                <Spinner size={100} color="#fff" />
              </div>
            )}
            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <span
                    className="popup-close"
                    onClick={() => setShowPopup(false)}
                  >
                    &times;
                  </span>
                  <p>{errorMessage}</p>
                  <Button onClick={() => setShowPopup(false)}>Try Again</Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
