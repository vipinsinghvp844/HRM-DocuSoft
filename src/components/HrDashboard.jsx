import React, { useState, useEffect } from "react";
import TodayPresent from "./TodayPresent";
import TodayAbsent from "./TodayAbsent";
import TodayOnLeave from "./TodayOnLeave";
import TotalUsers from "./TotalUsers";
import MarkAttendance from "./MarkAttendance";
import { useDispatch } from "react-redux";
import {
  GetAttendanceDataAction,
  GetEmployeeLeaveDetailAction,
  GetTotalUserAction,
  GetLeavePolicyAction,
  GetOfficeShiftsAction,
} from "../../redux/actions/EmployeeDetailsAction";
import { FetchAllUserProfileAction } from "../../redux/actions/dev-aditya-action";
import CalendarComponent from "./CalendarComponent .jsx";

const HrDashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [birthdayMessages, setBirthdayMessages] = useState([]);
  const dispatch = useDispatch();
  const firstName = localStorage.getItem("firstname") || "";
  useEffect(() => {
    const user_name = localStorage.getItem("user_name");

    if (user_name) {
      setUserName(user_name);
    }
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setUserId(user_id);
    }
    const date = new Date();
    setCurrentDate(date.toISOString().split("T")[0]); // Format to YYYY-MM-DD
    if (userId) {
      // fetchAttendanceRecords(date);
    }
  }, [userId]);


  useEffect(() => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      dispatch(GetEmployeeLeaveDetailAction());
      dispatch(GetTotalUserAction());
      dispatch(GetAttendanceDataAction(currentDate));
      dispatch(FetchAllUserProfileAction());
      dispatch(GetLeavePolicyAction());
      dispatch(GetOfficeShiftsAction());
    } catch (error) {
      ("Error fetching All Detailed")
    }
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          👋 Welcome Back,{" "}
          <span className="text-blue-600">
            {firstName}
          </span>
          !
        </h1>
        <p className="text-gray-600 mt-2">Have a great day ahead 😊</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <TotalUsers setBirthdayMessages={setBirthdayMessages} />
        <TodayPresent />
        <TodayOnLeave />
        <TodayAbsent />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <MarkAttendance userName={userName} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <CalendarComponent />
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📢 Announcements</h2>
          <p className="text-gray-600">Upcoming......</p>
        </div>
      </div>
    </div>

  );
};

export default HrDashboard;
