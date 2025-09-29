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


  //unseen user and messages count 
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
      <Container fluid className="sticky-top bg-white pb-0 pt-0">
        <Row className="align-items-center header-row">
          <Col>
            <Button
              variant="danger"
              onClick={toggleMenu}
              className="d-md-none togglemobile"
            >
              <i className="bi bi-list"></i>
            </Button>

            {/* Mobile Sidebar */}
            <Offcanvas
              show={show}
              onHide={toggleMenu}
              className="sidenav sidenavmobile"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className="sidebar-logo">
                  <img
                    src="/assets/Docusoft-logo-red.svg"
                    alt="HRM"
                    className="img-fluid"
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column sidebar">{renderNavItems()}</Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className=" d-flex align-items-center me-4 ">
              <Link className="position-relative" to="/notification">
                <i className="bi bi-bell"></i>
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </Link>
            </div>
            <div className="d-flex align-items-center me-4">
              <Link to="/chat" className="position-relative">
                <i className="bi bi-chat"></i>
                {AllUnseenUserAndMessages?.length > 0 &&
                  AllUnseenUserAndMessages[0]?.unread_senders_count > 0 && (
                    <span className="chat-badge">
                      {AllUnseenUserAndMessages[0].unread_senders_count}
                    </span>
                  )}
              </Link>
            </div>

            <div className="profile-container">
              <div
                className="profile-image-container d-flex"
                onClick={() => setShowPopup(!showPopup)}
              >
                <img
                  src={loginUserProfile || placeholderImage}
                  alt="Logged in user"
                  className="profile-image"
                />
                <h5 className="mt-1 USERNAMEHEAD">
                  {loginUserData?.user_display_name}{" "}
                  <i className="bi bi-chevron-down"></i>
                </h5>
              </div>
              {showPopup && (
                <div className="popup-dropdown" ref={popupRef}>
                  <FaTimes
                    className="popup-close"
                    onClick={() => setShowPopup(false)}
                  />
                  <img
                    src={loginUserProfile || placeholderImage}
                    alt="Profile"
                    className="popup-profile-image"
                  />
                  <h5>{loginUserData?.user_display_name}</h5>
                  <p>{loginUserData?.user_email}</p>
                  <Link
                    to="/manage-your-account"
                    className="manage-account-link"
                    onClick={handleManageAccountClick}
                  >
                    Manage Your Account
                  </Link>
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="popup-logout-button"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
