import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button, Offcanvas, Nav } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllUserProfileAction,
} from "../../redux/actions/dev-aditya-action";
import {
  fetchNotificationsAll,
  unseenUserandMessagecount,
} from "../../redux/actions/EmployeeDetailsAction";
import api from "./api";

const Header = ({ onLogout, userRole, pendingCount }) => {
  const { TotalNotifications, AllUnseenUserAndMessages } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placeholderImage = import.meta.env.VITE_PLACEHOLDER_IMAGE;
  const popupRef = useRef(null);
  const { loginUserProfile, loginUserData } = useSelector(
    ({ AllReducers }) => AllReducers
  );
  const [userStatus, setUserStatus] = useState("active");
  const [show, setShow] = useState(false);
  const userId = localStorage.getItem("user_id");


  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_CUSTOM_USERS}/${userId}`
        );
        setUserStatus(response.data.user_state);
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();
  }, [userId]);


  const toggleMenu = () => {
    if (window.innerWidth < 992) {
      setShow((prev) => !prev);
    }
  };
  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setShow(false);
    }
  };

  const sidebarItems = {
    admin: [
      {
        to: "/admin-dashboard",
        icon: "bi-house-door",
        label: "Admin Dashboard",
      },
      {
        to: "/today-attendance",
        icon: "bi-record-btn",
        label: "Today Attendance",
      },
      {
        to: "/manage-attendance",
        icon: "bi-kanban",
        label: "Manage Attendance",
      },
      { to: "/all-employee", icon: "bi-people", label: "All Employee" },
      {
        to: "/add-employee-details",
        icon: "bi-file-earmark-spreadsheet",
        label: "Add Employee Details",
      },
      { to: "/add-employee", icon: "bi-person-add", label: "Add User" },
      {
        to: "/leave-requests",
        icon: "bi-person-exclamation",
        label: "Leave Requests",
        badge: pendingCount,
      },
      {
        to: "/leave-policies",
        icon: "bi-person-exclamation",
        label: "Leave Policies",
      },
      {
        to: "/leave-balance",
        icon: "bi-person-exclamation",
        label: "Leave Balance",
      },
      { to: "/manage-holidays", icon: "bi-cassette", label: "Manage Holidays" },
      { to: "/shifts", icon: "bi-emoji-sunglasses", label: "Shifts" },
      {
        to: "/attendance-csv",
        icon: "bi-filetype-csv",
        label: "Attendance CSV",
      },
      {
        to: "/manage-documents",
        icon: "bi-file-earmark-check",
        label: "Manage Documents",
      },
    ],
    hr: [
      { to: "/hr-dashboard", icon: "bi-house-door", label: "HR Dashboard" },
      ...(userStatus === "active"
        ? [
          {
            to: "/today-attendance",
            icon: "bi-record-btn",
            label: "Today Attendance",
          },
          {
            to: "/manage-attendance",
            icon: "bi-kanban",
            label: "Manage Attendance",
          },
          {
            to: "/add-employee-details",
            icon: "bi-file-earmark-spreadsheet",
            label: "Add Employee Details",
          },
          { to: "/all-employee", icon: "bi-people", label: "All Employee" },
          {
            to: "/manage-holidays",
            icon: "bi-cassette",
            label: "Manage Holidays",
          },
          {
            to: "/my-leaves",
            icon: "bi-person-exclamation",
            label: "My Leaves",
          },
          {
            to: "/leave-requests",
            icon: "bi-person-exclamation",
            label: "Leave Requests",
            badge: pendingCount,
          },
          {
            to: "/leave-policies",
            icon: "bi-person-exclamation",
            label: "Leave Policies",
          },
          {
            to: "/leave-balance",
            icon: "bi-person-exclamation",
            label: "Leave Balance",
          },
          { to: "/shifts", icon: "bi-emoji-sunglasses", label: "Shifts" },
          {
            to: "/manage-documents",
            icon: "bi-file-earmark-check",
            label: "Manage Documents",
          },
          {
            to: "/attendance-csv",
            icon: "bi-calendar-check",
            label: "Attendance Csv",
          },
        ]
        : []),
      { to: "/documents", icon: "bi-file-earmark-check", label: "Documents" },
    ],
    employee: [
      {
        to: "/employee-dashboard",
        icon: "bi-house-door",
        label: "Employee Dashboard",
      },
      ...(userStatus === "active"
        ? [
          {
            to: "/my-Attendance",
            icon: "bi-person-add",
            label: "My Attendance",
          },
          {
            to: "/my-leaves",
            icon: "bi-person-exclamation",
            label: "My Leaves",
          },
          {
            to: "/leave-entitlements",
            icon: "bi-person-exclamation",
            label: "My Balance Leave",
          },
          {
            to: "/holidays",
            icon: "bi-arrow-up-right-circle",
            label: "Holidays",
          },
          { to: "/our-shift", icon: "bi-emoji-sunglasses", label: "Shift" },
        ]
        : []),
      { to: "/documents", icon: "bi-file-earmark-check", label: "Documents" },
    ],
  };

  const renderNavItems = () =>
    (sidebarItems[userRole] || []).map(({ to, icon, label, badge }, index) => (
      <Nav.Link
        key={`${to}-${index}`}
        as={NavLink}
        to={to}
        onClick={handleNavClick}
        className={({ isActive }) =>
          isActive ? "active nav-link" : "nav-link"
        }
      >
        <i className={`bi ${icon}`}></i> {label}
        {badge && <span className="badge bg-danger">{badge}</span>}
      </Nav.Link>
    ));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        await dispatch(
          fetchNotificationsAll(1, (res) => {
            // console.log(res, "====res 7878");
          })
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (Array.isArray(TotalNotifications)) {
      const unreadNotifications = TotalNotifications.filter(
        (notif) => notif.is_read === "0"
      );
      // console.log(unreadNotifications, "====unreadNotifications 7878");
      setUnreadCount(unreadNotifications.length);
    }
  }, [TotalNotifications]);


  useEffect(() => {
    const fetchUnseenUserandMessegesCount = async () => {
      try {
        await dispatch(
          unseenUserandMessagecount((res) => {
            // console.log(res, "====res 7878");
          })
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUnseenUserandMessegesCount();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileImage = await dispatch(FetchAllUserProfileAction());

        const profileResponse = profileImage;
        setProfileImage(profileResponse?.data?.profile_image);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const handleLogout = async () => {
    const authtoken = localStorage.getItem("authtoken");
    const userId = localStorage.getItem("user_id"); // Ensure you have user ID
    // console.log(userId);

    if (authtoken && userId) {
      try {
        await api.post(
          `${import.meta.env.VITE_API_ON_OFF_USER_STATUS}`,
          { user_id: userId, status: "offline" },
          { headers: { Authorization: `Bearer ${authtoken}` } }
        );

        onLogout();
        navigate("/");
      } catch (error) {
        console.error("Error updating offline status:", error);
      }
    }
    localStorage.clear();
    navigate("/");
  };

  const handleManageAccountClick = () => {
    setShowPopup(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-red-600 hover:bg-red-50"
          >
            <i className="bi bi-list text-2xl"></i>
          </button>

          <div className="flex items-center gap-6 ml-auto">
            <Link to="/notification" className="relative">
              <i className="bi bi-bell text-xl text-gray-700 hover:text-red-600"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Chat */}
            <Link to="/chat" className="relative">
              <i className="bi bi-chat text-xl text-gray-700 hover:text-red-600"></i>
              {AllUnseenUserAndMessages?.length > 0 &&
                AllUnseenUserAndMessages[0]?.unread_senders_count > 0 && (
                  <span className="absolute -top-3 -right-4 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {AllUnseenUserAndMessages[0].unread_senders_count}
                  </span>
                )}
            </Link>

            <div className="relative">
              <div
                onClick={() => setShowPopup(!showPopup)}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={loginUserProfile || placeholderImage}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                />
                <span className="text-gray-800 font-medium flex items-center gap-1">
                  {loginUserData?.user_display_name}
                  <i
                    className={`bi ${showPopup ? "bi-chevron-up" : "bi-chevron-down"
                      } text-gray-500 text-sm`}
                  ></i>
                </span>
              </div>

              {showPopup && (
                <div
                  ref={popupRef}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 transform transition-all duration-200 ease-out"
                >
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPopup(false)}
                  >
                    <i className="bi bi-x-lg text-lg"></i>
                  </button>

                  <div className="flex flex-col items-center pt-2">
                    <div className="relative">
                      <img
                        src={loginUserProfile || placeholderImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <h5 className="mt-4 text-xl font-bold text-gray-800">
                      {loginUserData?.user_display_name}
                    </h5>
                    <p className="text-sm text-gray-500 font-medium">
                      {loginUserData?.user_email}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link
                      to="/manage-your-account"
                      onClick={handleManageAccountClick}
                      className="flex btn-blue items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                    >
                      <i className="bi bi-gear-fill"></i>
                      Manage Your Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn-red btn w-100 gap-2"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        {show && (
          <div className="fixed inset-0 bg-transparant bg-opacity-40 z-50 lg:hidden">
            <div className="absolute left-0 top-0 w-65 h-full bg-white shadow-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <img
                  src="/assets/Docusoft-logo-red.svg"
                  alt="HRM"
                  className="h-10"
                />
                <button onClick={toggleMenu} className="text-gray-600 text-xl">
                  ✕
                </button>
              </div>
              <nav className="flex flex-col space-y-2 sidebar">{renderNavItems()}</nav>
            </div>
          </div>
        )}
      </header>

    </>
  );
};

export default Header;
