import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MarkAttendance from "./MarkAttendance";
import {
  GetEmployeeLeaveDetailActionById
} from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch } from "react-redux";

function EmployeeDashboard() {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const firstName = localStorage.getItem("firstname") || "";

  useEffect(() => {
    dispatch(GetEmployeeLeaveDetailActionById())
    const user_name = localStorage.getItem("user_name");

    if (user_name) {
      setUserName(user_name);
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
        <p className="text-gray-600 mt-2">
          Have a great day ahead 😊
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <MarkAttendance userName={userName} />
      </div>
    </div>

  );
}

export default EmployeeDashboard;
