import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "./api";
import { submitAttendanceAction } from "../../redux/actions/EmployeeDetailsAction";

const AddAttendance = ({ currentUserRole }) => {
  const dispatch = useDispatch();
  const { TotalUsers } = useSelector(({ EmployeeDetailReducers }) => EmployeeDetailReducers);

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);

  useEffect(() => {
    const employeeUsers = TotalUsers.filter(
      (user) => ["employee", "hr"].includes(user.role)
    );
    setEmployees(employeeUsers);
  }, [TotalUsers]);

  const checkUserAttendance = async (userId, date) => {
    try {
      const { data } = await api.get(`${import.meta.env.VITE_API_ATTENDANCE}`, {
        params: { user_id: userId, date },
        headers: { Authorization: `Bearer ${localStorage.getItem("authtoken")}` },
      });

      let clockIn = false, clockOut = false;
      data.forEach((record) => {
        if (record.type === "clock_in") clockIn = true;
        if (record.type === "clock_out") clockOut = true;
      });

      setHasClockedIn(clockIn);
      setHasClockedOut(clockOut);
    } catch (error) {
      if (error.response?.status === 404) {
        setHasClockedIn(false);
        setHasClockedOut(false);
      } else {
        console.error("Error checking attendance:", error);
      }
    }
  };

  const handleUserSelection = async (employee) => {
    setUserName(employee.username);
    setUserId(employee.id);
    setShowDropdown(false);
    await checkUserAttendance(employee.id, date);
  };

  const resetForm = () => {
    setUserName("");
    setUserId("");
    setClockInTime("");
    setClockOutTime("");
    setHasClockedIn(false);
    setHasClockedOut(false);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please select a user.");
      return;
    }

    try {
      const payload = {
        user_id: userId,
        user_name: userName,
        date,
        time: hasClockedIn ? clockOutTime : clockInTime,
        type: hasClockedIn ? "clock_out" : "clock_in",
      };

      await dispatch(submitAttendanceAction(payload));
      toast.success("Attendance added successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error adding attendance. Please try again.");
      console.error("Error adding attendance:", error);
    }
  };

  return (
   <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mt-6">
  <form onSubmit={handleSubmit} className="space-y-5">
    {/* User Name Dropdown */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        User Name
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Click to select user name"
          value={userName}
          onClick={() => setShowDropdown((prev) => !prev)}
          readOnly
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        />
        {showDropdown && (
          <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md w-full max-h-48 overflow-y-auto mt-1">
            {employees.map((employee) => (
              <li
                key={employee.id}
                onClick={() => handleUserSelection(employee)}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
              >
                {employee.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Date Field */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Clock In / Out or Completed Message */}
    {hasClockedIn && hasClockedOut ? (
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-center">
        ✅ Attendance already completed for today
      </div>
    ) : (
      <>
        {!hasClockedIn ? (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Clock In Time
            </label>
            <input
              type="time"
              value={clockInTime}
              onChange={(e) => setClockInTime(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Clock Out Time
            </label>
            <input
              type="time"
              value={clockOutTime}
              onChange={(e) => setClockOutTime(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition-all duration-200"
        >
          {hasClockedIn ? "Add Check Out Time" : "Add Check In Time"}
        </button>
      </>
    )}
  </form>
</div>

  );
};

export default AddAttendance;
