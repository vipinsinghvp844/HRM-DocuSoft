import React, { useState, useEffect } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { EditAttDeatilByAdminHr, GetAttendanceDataActionByDate, GetTotalUserAction } from "../../redux/actions/EmployeeDetailsAction";
import { toast } from "react-toastify";
import api from "./api";

const EditEmployeeAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [prevAttendance, setPrevAttendance] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [attLoading, setAttLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await dispatch(GetTotalUserAction());
        const employeeUsers = response.filter(
          (user) => user.role === "employee" || user.role === "hr"
        );
        setEmployees(employeeUsers);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    fetchEmployees();
  }, [dispatch]);

  const formatAttendanceData = (data) => {
    let attendanceData = {
      clock_in: "",
      clock_in_record_id: "",
      break_in: "",
      break_in_record_id: "",
      break_out: "",
      break_out_record_id: "",
      clock_out: "",
      clock_out_record_id: "",
    };

    data.forEach((entry) => {
      switch (entry.type) {
        case "clock_in":
          attendanceData.clock_in = entry.time;
          attendanceData.clock_in_record_id = entry.id;
          break;
        case "break_in":
          attendanceData.break_in = entry.time;
          attendanceData.break_in_record_id = entry.id;
          break;
        case "break_out":
          attendanceData.break_out = entry.time;
          attendanceData.break_out_record_id = entry.id;
          break;
        case "clock_out":
          attendanceData.clock_out = entry.time;
          attendanceData.clock_out_record_id = entry.id;
          break;
        default:
          break;
      }
    });

    return attendanceData;
  };

  const fetchUserAttendance = async (userId, date) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_ATTENDANCE}`,
        {
          params: { user_id: userId, date },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      setAttendance(formatAttendanceData(response.data));
      setPrevAttendance(formatAttendanceData(response.data));
    } catch (error) {
      console.error("Error fetching attendance", error);
    }
  };

  const handleUserSelection = async (employee) => {
    setUserName(employee.username);
    setUserId(employee.id);
    setShowDropdown(false);
    if (date) {
      setAttLoading(true);
      await fetchUserAttendance(employee.id, date);
      setAttLoading(false);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const updateRequests = [];
  const updatedTypes = [];

  if (
    attendance.clock_in_record_id &&
    attendance.clock_in !== prevAttendance.clock_in
  ) {
    updateRequests.push({
      user_id: userId,
      record_id: attendance.clock_in_record_id,
      time: attendance.clock_in,
      type: "clock_in",
    });
    updatedTypes.push("Check_in");
  }

  if (
    attendance.break_in_record_id &&
    attendance.break_in !== prevAttendance.break_in
  ) {
    updateRequests.push({
      user_id: userId,
      record_id: attendance.break_in_record_id,
      time: attendance.break_in,
      type: "break_in",
    });
    updatedTypes.push("Break_in");
  }

  if (
    attendance.break_out_record_id &&
    attendance.break_out !== prevAttendance.break_out
  ) {
    updateRequests.push({
      user_id: userId,
      record_id: attendance.break_out_record_id,
      time: attendance.break_out,
      type: "break_out",
    });
    updatedTypes.push("Break_out");
  }

  if (
    attendance.clock_out_record_id &&
    attendance.clock_out !== prevAttendance.clock_out 
  ) {
    updateRequests.push({
      user_id: userId,
      record_id: attendance.clock_out_record_id,
      time: attendance.clock_out,
      type: "clock_out",
    });
    updatedTypes.push("Check_out");
  }

  if (updateRequests.length === 0) {
    toast.info("No changes detected!");
    return;
  }

  try {
    setIsLoading(true);

    await Promise.all(
      updateRequests.map((payload) =>
        dispatch(
          EditAttDeatilByAdminHr(payload, async (data) => {
            await dispatch(GetAttendanceDataActionByDate());
          })
        )
      )
    );

    toast.success(
      `${updatedTypes.join(", ")} Attendance updated successfully!`
    );
  } catch (error) {
    console.error("Error updating attendance", error);
    toast.error("Failed to update attendance!");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mt-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">User Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Click to select user name"
              value={userName}
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            />
            
            {showDropdown && (
              <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md w-full max-h-48 overflow-y-auto mt-1">
                {employees.map((employee) => (
                  <li
                    key={employee.id}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                    onClick={() => handleUserSelection(employee)}
                  >
                    {employee.username}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (userId) fetchUserAttendance(userId, e.target.value);
            }}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={attLoading}
          />
          {attLoading && (
            <div className="absolute inset-y-0 right-3 top-7 flex items-center">
              <Spinner animation="border" size="sm" />
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Clock In</label>
          <input
            type="time"
            value={attendance.clock_in || ""}
            onChange={(e) =>
              setAttendance({ ...attendance, clock_in: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Break In</label>
          <input
            type="time"
            value={attendance.break_in || ""}
            onChange={(e) =>
              setAttendance({ ...attendance, break_in: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Break Out</label>
          <input
            type="time"
            value={attendance.break_out || ""}
            onChange={(e) =>
              setAttendance({ ...attendance, break_out: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Clock Out</label>
          <input
            type="time"
            value={attendance.clock_out || ""}
            onChange={(e) =>
              setAttendance({ ...attendance, clock_out: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Updating...
            </>
          ) : (
            "Update Attendance"
          )}
        </Button>
      </form>
    </div>
  );
};
export default EditEmployeeAttendance;
