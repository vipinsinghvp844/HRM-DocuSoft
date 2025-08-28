import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Alert, Card } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetTotalUserAction } from "../../redux/actions/EmployeeDetailsAction";

const TotalUsers = ({ setBirthdayMessages }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );
  // console.log(TotalUsers, "======store");

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_CUSTOM_USERS}`)
  //     .then((response) => {
  //       const users = response.data;

  //       // Filter out users with the role of "admin"
  //       const nonAdminUsers = users.filter((user) => user.role !== "admin");
  //       setTotalUsers(nonAdminUsers.length);

  //       // Check for birthdays
  //       const today = new Date();
  //       const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;
  //       const birthdayMessages = [];

  //       nonAdminUsers.forEach((user) => {
  //         const dob = new Date(user.dob);
  //         const userMonthDay = `${dob.getMonth() + 1}-${dob.getDate()}`;
  //         if (userMonthDay === todayMonthDay) {
  //           birthdayMessages.push(`Today is ${user.first_name}'s Birthday!`);
  //         }
  //       });

  //       setBirthdayMessages(birthdayMessages);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users:", error);
  //       setError(error.message);
  //     })
  //     .finally(() => {});
  // }, [setBirthdayMessages]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   await dispatch(GetTotalUserAction());
  // };

  useEffect(() => {
    const nonAdminUsers = TotalUsers.filter((user) => user.role !== "admin");
    setTotalUsers(nonAdminUsers.length);

    // Check for birthdays
    const today = new Date();
    const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;
    const birthdayMessages = [];

    nonAdminUsers.forEach((user) => {
      const dob = new Date(user.dob);
      const userMonthDay = `${dob.getMonth() + 1}-${dob.getDate()}`;
      if (userMonthDay === todayMonthDay) {
        birthdayMessages.push(`Today is ${user.first_name}'s Birthday!`);
      }
    });

    setBirthdayMessages(birthdayMessages);
  }, [TotalUsers]);
  return (
    <Card className="text-center shadow-sm border-0 rounded p-0">
      <Card.Body>
        <Card.Title>Total Users</Card.Title>
        <div className="d-flex flex-column align-items-center">
          <FaUsers size={50} color="#10b981" />
          <h3 className="mt-2" style={{ color: "#10b981", fontSize: "2rem" }}>
            {totalUsers}
          </h3>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TotalUsers;
