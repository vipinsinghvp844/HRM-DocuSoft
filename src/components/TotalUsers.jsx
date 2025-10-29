import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetTotalUserAction } from "../../redux/actions/EmployeeDetailsAction";

const TotalUsers = ({ setBirthdayMessages }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [birthdayList, setBirthdayList] = useState([]);
  const dispatch = useDispatch();

  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  useEffect(() => {
    const nonAdminUsers =
      TotalUsers?.filter(
        (user) => user.role !== "admin" && user.user_state !== "inactive"
      ) || [];

    setTotalUsers(nonAdminUsers.length);

    // 🎂 Birthday logic
    const today = new Date();
    const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;
    const birthdayMessages = [];
    const todayBirthdays = [];

    nonAdminUsers.forEach((user) => {
      if (!user?.dob) return;
      const dob = new Date(user.dob);
      const userMonthDay = `${dob.getMonth() + 1}-${dob.getDate()}`;
      if (userMonthDay === todayMonthDay) {
        birthdayMessages.push(`Today is ${user.first_name}'s Birthday! 🎉`);
        todayBirthdays.push(user.first_name);
      }
    });

    setBirthdayMessages(birthdayMessages);
    setBirthdayList(todayBirthdays);
  }, [TotalUsers, setBirthdayMessages]);

  return (
    <div className="relative group">
      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer">
        <h3 className="text-gray-700 font-medium">Total Users</h3>
        <div className="flex flex-col items-center">
          <FaUsers size={50} className="text-green-500" />
          <p className="mt-2 text-3xl font-bold text-green-500">
            {totalUsers}
          </p>
        </div>
      </div>

      {/* Tooltip for Birthdays */}
      {birthdayList.length > 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-60 p-2 bg-yellow-500 text-white text-sm rounded-lg shadow-lg z-50">
          🎂 Birthdays Today: {birthdayList.join(", ")}
        </div>
      )}
    </div>
  );
};

export default TotalUsers;
