import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetAttendanceDataAction } from "../../redux/actions/EmployeeDetailsAction";
import { toast } from "react-toastify";

function TodayPresent() {
  const [presentCount, setPresentCount] = useState(0);
  const [userNamePresent, setUserNamePresent] = useState([]);
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const { TotalAttendance } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  useEffect(() => {
    fetchAttendanceCount();
  }, []);

  const fetchAttendanceCount = async () => {
    try {
      await dispatch(GetAttendanceDataAction(currentDate));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const presentUsers = TotalAttendance.filter(
      (attendance) =>
        attendance.date === currentDate && attendance.type === "clock_in"
    );
    const presentUserNames = presentUsers.map(
      (attendance) => attendance.user_name
    );

    setPresentCount(presentUsers.length);
    setUserNamePresent(presentUserNames);
  }, [TotalAttendance]);

  return (
    <div className="relative group">
      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer">
        <h3 className="text-gray-700 font-medium">Today Present</h3>
        <div className="flex flex-col items-center">
          <FaUsers size={50} className="text-cyan-600" />
          <p className="mt-2 text-3xl font-bold text-cyan-600">
            {presentCount}
          </p>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-56 p-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
        {userNamePresent.length > 0
          ? userNamePresent.join(", ")
          : "No present users"}
      </div>
    </div>
  );
}

export default TodayPresent;
