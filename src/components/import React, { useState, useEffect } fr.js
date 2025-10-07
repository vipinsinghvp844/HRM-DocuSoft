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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1000&q=80"
          alt="Login illustration"
          className="w-4/5 max-w-lg rounded-2xl shadow-2xl animate-zoom-in"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl w-full max-w-md p-8 transform transition-all duration-500 ease-out hover:scale-[1.01] animate-fade-in">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Welcome Back 👋
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Username / Email */}
            <div>
              <input
                name="login"
                type="text"
                placeholder="Username or Email"
                value={formik.values.login}
                onChange={formik.handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
              />
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-600`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a
                href="/request-password-reset"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition-all duration-200 transform hover:scale-[1.02]"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>

      {/* ✨ Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoom-in {
          animation: zoomIn 1s ease-out forwards;
        }
      `}</style>
    </div>  
  );
};

export default Login;
