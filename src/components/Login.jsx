import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import Spinner from "./LoaderSpiner";
import "./Login.css";
import { useDispatch } from "react-redux";
import {
  FetchUserProfileAction,
  LoginUserAction,
} from "../../redux/actions/dev-aditya-action";
import { setValueForSideBarClick } from "../../redux/redecer/EmployeeDetailReducers";
import api from "./api";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
        const userRole = user.roles?.[0] || null;

        if (userRole) {
          await dispatch(FetchUserProfileAction());
          onLogin(userRole);
          dispatch(setValueForSideBarClick(0));

          // Redirect based on role
          const routes = {
            admin: "/admin-dashboard",
            hr: "/hr-dashboard",
            employee: "/employee-dashboard",
          };
          navigate(routes[userRole] || "/default-dashboard");
        }
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.code === "invalid_login"
            ? "Invalid password. Please try again."
            : error?.response?.data?.code === "[jwt_auth] invalid_email"
              ? "Invalid email address. Please check and try again."
              : "Login failed. Please try again later."
        );
        setShowPopup(true);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  // auto login if token exists
  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");
    if (authToken) {
      const userRole = localStorage.getItem("role");
      dispatch(setValueForSideBarClick(0));
      onLogin(userRole);
      const routes = {
        admin: "/admin-dashboard",
        hr: "/hr-dashboard",
        employee: "/employee-dashboard",
      };
      navigate(routes[userRole] || "/default-dashboard");
    }
  }, []);

  // close modal with Esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowForgotPassword(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // forgot password submit
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post(
        import.meta.env.VITE_API_REQUEST_PASSWORD_RESET,
        { email }
      );
      const data =
        typeof response.config.data === "string"
          ? JSON.parse(response.config.data)
          : response.config.data;
      toast.success(`Password reset link sent to ${data.email}`);
      setEmail("");
      setShowForgotPassword(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="maincontainer">
      <Row className="w-100">
        <Col
          md={4}
          className="mx-auto flex items-center justify-center min-h-screen"
        >
          <div className="cardcontainer relative">
            <h2 className="text-center mb-4 font-bold text-xl text-blue-700">
              Login
            </h2>
            <Form onSubmit={formik.handleSubmit}>
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

              <Form.Group className="mb-3 position-relative">
                <Form.Control
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
                    } me-2 eyecolorhover`}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "18px",
                    color: "#555",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </Form.Group>

              <div className="d-flex justify-content-end mb-3">
                <span
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </span>
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

          {/*  Forgot Password Modal */}
          {showForgotPassword && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
                onClick={() => setShowForgotPassword(false)}
              ></div>

              <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-100 w-full max-w-md mx-4 animate-slideUp">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                >
                  ✕
                </button>

                <div className="p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
                    Forgot Password
                  </h2>

                  <form onSubmit={handleForgotSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 text-white ${isLoading
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                      {isLoading ? "Sending..." : "Request Password Reset"}
                    </button>

                    <div className="text-center text-sm mt-4">
                      <span
                        onClick={() => setShowForgotPassword(false)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        ← Back to Login
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
