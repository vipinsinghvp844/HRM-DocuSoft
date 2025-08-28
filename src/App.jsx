import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ChatBox from "./components/ChatBox.jsx";
import { Container, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AdDashboard from "./components/AdDashboard";
import HrDashboard from "./components/HrDashboard";
import HrShift from "./components/HrShift";
import LeaveRequests from "./components/LeaveRequests";
import LeaveEntitlements from "./components/LeaveEntitlements";
import AllEmpDetails from "./components/AllEmpDetails";
import AddNewEmployee from "./components/AddNewEmployee";
import AddAttendance from "./components/AddAttendance";
import ManageHolidays from "./components/HrManageHolidays";
import LeavePolicies from "./components/HrLeavePolicies";
import EmployeeAttDetails from "./components/EmployeeAttDetails";
import EmployeeDashboard from "./components/EmDashboard";
import EmployeeViewLeave from "./components/EmployeeViewLeave";
import ApplyLeave from "./components/EmApplyLeave";
import Holidays from "./components/EmHolidays";
import OurShift from "./components/OurShift";
import Login from "./components/Login";
import RequestPasswordReset from "./components/RequestPasswordReset";
import ResetPassword from "./components/ResetPassword";
import Sidebar from "./components/Sidebar";
import EditEmployee from "./components/EditEmployee";
import LeaveBalance from "./components/LeaveBalance";
import Notification from "./components/Notification";
import BirthdayMessages from "./components/BirthdayMessages";
import AttendanceCsv from "./components/AttendanceCsv";
import ManageYourAccount from "./components/ManageYourAccount";
import OverviewAttendance from "./components/OverviewAttendance";
import ManageAttendance from "./components/ManageAttendance";
import AttendanceRecord from "./components/AttendanceRecord";
import DateCalendar from "./components/DateCalendar";
import AddEmployeeDetails from "./components/AddEmployeeDetails";
import EmployeePerDetail from "./components/EmployeePerDetail";
import OfferLetter from "./components/OfferLetter";
import ManageDocument from "./components/ManageDocument";
import ExperienceLetter from "./components/ExperienceLetter";
import NocLetter from "./components/NocLetter";
import EmDocuments from "./components/EmDocuments.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { WebSocketProvider } from "./components/WebSocketContext.jsx";
import AdminAddEmpLeave from "./components/AdminAddEmpLeave.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pendingCount, setPendingCount] = useState(0); //sidebar notifications
  const handleLogin = (role, id) => {
    setUserRole(role);
    setUserId(id);
    localStorage.setItem("user", JSON.stringify({ roles: [role], id }));
  };
  // const userId = localStorage.getItem("user_id")
  const handleLogout = () => {
    setUserRole(null); // Reset user role
    setUserId(null); // Reset user id
    localStorage.removeItem("user"); // Clear user from local storage
  };

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (
          userData.roles &&
          Array.isArray(userData.roles) &&
          userData.roles.length > 0
        ) {
          setUserRole(userData.roles[0]); // Assuming roles is an array and taking the first role
        } else {
          console.error("Roles is not defined or not an array or is empty");
        }
        
        if (userData.id) {
          setUserId(userData.id);
        }
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
      }
    }
  }, []);

  // Create a component to handle the layout
  const Layout = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";
    const isPasswordChangePage =
      location.pathname === "/request-password-reset";

    return (
      <Container fluid className="p-0">
        {!isLoginPage && !isPasswordChangePage && (
          <>
            <main className="main">
              {userRole && (
                <Sidebar userRole={userRole} pendingCount={pendingCount} />
              )}
              <div
                className="right-main-box">
                <Header
                  userRole={userRole}
                  onLogout={handleLogout}
                  pendingCount={pendingCount}
                />
                {children}
              </div>
            </main>
          </>
        )}
        {(isLoginPage || isPasswordChangePage) && children}
      </Container>
    );
  };

  return (
    <>
      <WebSocketProvider>
        <Router>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Login onLogin={handleLogin} />} />
                  <Route
                    path="/request-password-reset"
                    element={<RequestPasswordReset />}
                  />
                  <Route
                    path="/reset-password/:key/:login"
                    element={<ResetPassword />}
                  />
                  <Route
                    path="/admin-dashboard"
                    element={
                      <ProtectedRoute
                        element={AdDashboard}
                        allowedRoles={["admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/hr-dashboard"
                    element={
                      <ProtectedRoute
                        element={HrDashboard}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/employee-dashboard"
                    element={
                      <ProtectedRoute
                        element={EmployeeDashboard}
                        allowedRoles={["employee"]}
                        userRole={userRole}
                        userId={userId}
                      />
                    }
                  />
                  <Route
                    path="/shifts"
                    element={
                      <ProtectedRoute
                        element={HrShift}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/leave-requests"
                    element={
                      <ProtectedRoute
                        element={LeaveRequests}
                        allowedRoles={["hr", "admin"]}
                        setPendingCount={setPendingCount}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/leave-policies"
                    element={
                      <ProtectedRoute
                        element={LeavePolicies}
                        allowedRoles={["hr", "admin", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/leave-balance"
                    element={
                      <ProtectedRoute
                        element={LeaveBalance}
                        allowedRoles={["hr", "admin", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/leave-entitlements"
                    element={
                      <ProtectedRoute
                        element={LeaveEntitlements}
                        allowedRoles={["hr", "admin", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/all-employee"
                    element={
                      <ProtectedRoute
                        element={AllEmpDetails}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/edit-employee/:id"
                    element={
                      <ProtectedRoute
                        element={EditEmployee}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/add-attendance"
                    element={
                      <ProtectedRoute
                        element={AddAttendance}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/add-employee"
                    element={
                      <ProtectedRoute
                        element={AddNewEmployee}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/manage-holidays"
                    element={
                      <ProtectedRoute
                        element={ManageHolidays}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/notification"
                    element={
                      <ProtectedRoute
                        element={Notification}
                        allowedRoles={["hr", "admin", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/employee-attendance/:userId"
                    element={
                      <ProtectedRoute
                        element={EmployeeAttDetails}
                        allowedRoles={["hr", "admin"]}
                        userRole={userRole}
                      />
                    }
                  />

                  <Route
                    path="/my-leaves"
                    element={
                      <ProtectedRoute
                        element={EmployeeViewLeave}
                        allowedRoles={["hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/apply-leave"
                    element={
                      <ProtectedRoute
                        element={ApplyLeave}
                        allowedRoles={["hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  ></Route>
                  <Route
                    path="/holidays"
                    element={
                      <ProtectedRoute
                        element={Holidays}
                        allowedRoles={["employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/our-shift"
                    element={
                      <ProtectedRoute
                        element={OurShift}
                        allowedRoles={["employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="birthday"
                    element={
                      <ProtectedRoute
                        element={BirthdayMessages}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="attendance-csv"
                    element={
                      <ProtectedRoute
                        element={AttendanceCsv}
                        allowedRoles={["admin", "hr"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/manage-your-account"
                    element={
                      <ProtectedRoute
                        element={ManageYourAccount}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="today-attendance"
                    element={
                      <ProtectedRoute
                        element={OverviewAttendance}
                        allowedRoles={["admin", "hr"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="manage-attendance"
                    element={
                      <ProtectedRoute
                        element={ManageAttendance}
                        allowedRoles={["admin", "hr"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="my-attendance"
                    element={
                      <ProtectedRoute
                        element={AttendanceRecord}
                        allowedRoles={["employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/Calender"
                    element={
                      <ProtectedRoute
                        element={DateCalendar}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/add-employee-details"
                    element={
                      <ProtectedRoute
                        element={AddEmployeeDetails}
                        allowedRoles={["admin", "hr"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/personal-detail/:id"
                    element={
                      <ProtectedRoute
                        element={EmployeePerDetail}
                        allowedRoles={["admin", "hr"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/offer-letter"
                    element={
                      <ProtectedRoute
                        element={OfferLetter}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/experience-letter"
                    element={
                      <ProtectedRoute
                        element={ExperienceLetter}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/noc-letter"
                    element={
                      <ProtectedRoute
                        element={NocLetter}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/manage-documents"
                    element={
                      <ProtectedRoute
                        element={ManageDocument}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/documents"
                    element={
                      <ProtectedRoute
                        element={EmDocuments}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="/chat"
                    element={
                      <ProtectedRoute
                        element={ChatBox}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                  <Route
                    path="add-employee-leaves"
                    element={
                      <ProtectedRoute
                        element={AdminAddEmpLeave}
                        allowedRoles={["admin", "hr", "employee"]}
                        userRole={userRole}
                      />
                    }
                  />
                </Routes>
              </Layout>
            </PersistGate>
          </Provider>
        </Router>
      </WebSocketProvider>
      <ToastContainer />
    </>
  );
}

export default App;
