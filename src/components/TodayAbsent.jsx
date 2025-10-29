import React, { useState, useEffect } from "react";
import { FaUserTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEmployeeLeaveDetailAction,
  GetTotalUserAction,
} from "../../redux/actions/EmployeeDetailsAction";

function TodayAbsent() {
  const [absentCount, setAbsentCount] = useState(0);
  const [absentUsers, setAbsentUsers] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];

  const { TotalAttendance } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAbsentUsers();
    // eslint-disable-next-line
  }, [TotalAttendance]);

  const fetchAbsentUsers = async () => {
    try {
      const usersData = await dispatch(GetTotalUserAction());
      const nonAdminUsers = usersData.filter(
        (user) => user.role !== "admin" && user.user_state !== "inactive"
      );

      const totalLeaveUsers = await dispatch(GetEmployeeLeaveDetailAction());
      const onLeaveUsers = totalLeaveUsers
        ?.filter((leave) => {
          const startDate = new Date(leave.start_date)
            .toISOString()
            .split("T")[0];
          const endDate = new Date(leave.end_date).toISOString().split("T")[0];
          return (
            leave.status === "Accept" &&
            startDate <= currentDate &&
            endDate >= currentDate
          );
        })
        .map((leave) => leave.user_id.toString());

      const presentUsers = TotalAttendance.filter(
        (attendance) => attendance.date === currentDate
      ).map((attendance) => attendance.user_id.toString());

      const nonAdminUserIds = nonAdminUsers.map((user) => user.id.toString());

      const presentOrOnLeaveUserIds = new Set([
        ...presentUsers,
        ...onLeaveUsers,
      ]);

      const absentUserIds = nonAdminUserIds.filter(
        (userId) => !presentOrOnLeaveUserIds.has(userId)
      );

      const absentUserNames = nonAdminUsers
        .filter((user) => absentUserIds.includes(user.id.toString()))
        .map((user) => user.username);

      setAbsentCount(absentUserNames.length);
      setAbsentUsers(absentUserNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="relative group">
      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer">
        <h3 className="text-gray-700 font-medium">Today Absent</h3>
        <div className="flex flex-col items-center">
          <FaUserTimes size={50} className="text-red-500" />
          <p className="mt-2 text-3xl font-bold text-red-500">
            {absentCount}
          </p>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-56 p-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
        {absentUsers.length > 0
          ? absentUsers.join(", ")
          : "No absent users"}
      </div>
    </div>
  );
}

export default TodayAbsent;
