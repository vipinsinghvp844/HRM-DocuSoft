import React, { useState, useEffect } from "react";
import {  Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  AddNewEmployeeAction,
  GetTotalUserAction,
} from "../../redux/actions/EmployeeDetailsAction";
import { ArrowLeftCircle } from "lucide-react";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  address: "",
  mobile: "",
  dob: "",
  role: "",
  userState: "active",
};

const AddNewEmployee = () => {
  const [formData, setFormData] = useState(initialState);
  const [userRoleOptions, setUserRoleOptions] = useState([]);
  const currentUserRole = localStorage.getItem("role");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserRole === "admin") {
      setUserRoleOptions(["employee", "hr", "admin"]);
    } else if (currentUserRole === "hr") {
      setUserRoleOptions(["employee"]);
    }
  }, [currentUserRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        AddNewEmployeeAction(formData, async () => {
          await dispatch(GetTotalUserAction());
        })
      );

      if (response?.status === 200) {
        toast.success("User added successfully!");
        setFormData(initialState); // reset form
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Something went wrong");
    }
  };

  // Utility for text inputs
  const renderInput = (label, name, type = "text", extraProps = {}) => (
    <Form.Group className="mb-3" controlId={`form${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        required
        {...extraProps}
      />
    </Form.Group>
  );

  return (
    <div className="pt-4 px-2">
      <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>

        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Add New Employee</h3>
      </div>

      <form onSubmit={handleAddUser} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("First Name", "firstName")}
          {renderInput("Last Name", "lastName")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Username", "username")}
          {renderInput("Email", "email", "email")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Address", "address")}

          <div>
            <label className="block text-sm font-medium mb-2">User Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select role...</option>
              {userRoleOptions.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Mobile Number", "mobile", "tel")}
          {renderInput("Date of Birth", "dob", "date")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">User State</label>
            <select
              name="userState"
              value={formData.userState}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {renderInput("Password", "password", "password")}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddNewEmployee;
