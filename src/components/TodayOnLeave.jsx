import React, { useState, useEffect } from "react";
import { FaUserTimes } from "react-icons/fa";
import api from "./api";

function TodayOnLeave() {
  const [onLeaveCount, setOnLeaveCount] = useState(0);
  const [leaveUserNames, setLeaveUserNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    fetchOnLeaveCount();
  }, []);

  const fetchOnLeaveCount = async () => {
    try {
      const leaveResponse = await api.get(
        `${import.meta.env.VITE_API_LEAVE}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      const leaveData = leaveResponse.data || [];

      // Filter leaves that are accepted and active for the current date
      const onLeaveUsers = leaveData.filter((leave) => {
        const startDate = new Date(leave.start_date)
          .toISOString()
          .split("T")[0];
        const endDate = new Date(leave.end_date).toISOString().split("T")[0];
        return (
          leave.status === "Accept" &&
          startDate <= currentDate &&
          endDate >= currentDate
        );
      });

      setOnLeaveCount(onLeaveUsers.length);
      setLeaveUserNames(onLeaveUsers.map((user) => user.user_name));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching leave data:", error);
      setError("Error fetching leave data. Please try again later.");
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="bg-white shadow-md rounded-xl p-6 text-center">
  //       <p className="text-gray-500">Loading...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="bg-white shadow-md rounded-xl p-6 text-center">
  //       <p className="text-red-500">{error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="relative group">
      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer">
        <h3 className="text-gray-700 font-medium">Today Leave</h3>
        <div className="flex flex-col items-center">
          <FaUserTimes size={50} className="text-purple-500" />
          <p className="mt-2 text-3xl font-bold text-purple-500">
            {onLeaveCount}
          </p>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-56 p-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
        {leaveUserNames.length > 0
          ? leaveUserNames.join(", ")
          : "No leave users"}
      </div>
    </div>
  );
}

export default TodayOnLeave;
