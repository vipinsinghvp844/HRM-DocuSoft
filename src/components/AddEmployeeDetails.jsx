import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "./api";
import { ArrowLeftCircle } from "lucide-react";

const AddEmployeeDetails = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name_of_bank: "",
    account_number: "",
    name_in_bank: "",
    gender: "",
    marital_status: "",
    department: "",
    duty_type: "",
    position: "",
    basic_salary: "",
    ifsc_code: "",
    branch: "",
    graduation_year: "",
    graduation_subject: "",
    pg_year: "",
    pg_subject: "",
    professional_course_year: "",
    professional_course_subject: "",
    employment_type: "",
    previous_employer_name: "",
    date_of_joining: "",
    date_of_leaving: "",
  });
  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeUsers = TotalUsers.filter(
  (user) =>
    (user.role === "employee" || user.role === "hr") &&
    user.user_state !== "inactive"
);
        setEmployees(employeeUsers);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleUserSelection = (employee) => {
    setUserName(employee.username);
    setUserId(employee.id);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        user_id: userId,
        ...formData,
      };

      const response = await api.post(
        `${import.meta.env.VITE_API_PERSONAL_INFO}`,
        payload
      );
      // setMessage("Details added successfully!");
      toast.success("Details added successfully!");
      setUserName("");
      setUserId("");
      setFormData({
        // status: "Active",
        gender: "",
        marital_status: "",
        department: "",
        duty_type: "",
        position: "",
        basic_salary: "",
        name_of_bank: "",
        account_number: "",
        name_in_bank: "",
        ifsc_code: "",
        branch: "",
        graduation_year: "",
        graduation_subject: "",
        pg_year: "",
        pg_subject: "",
        professional_course_year: "",
        professional_course_subject: "",
        employment_type: "",
        previous_employer_name: "",
        date_of_joining: "",
        date_of_leaving: "",
      });
    } catch (error) {
      toast.error("Error adding details. Please try again.");
      console.error("Error adding details:", error);
    }
  };

  return (
    <>
    <div className="pt-4 px-2">
      {/* Header */}
      <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Add Employee Details</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Name */}
        <div>
          <label className="block text-sm font-medium mb-2">User Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Click to select user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onClick={() => setShowDropdown(!showDropdown)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            {showDropdown && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-md">
                {employees.map((employee) => (
                  <li
                    key={employee.id}
                    onClick={() => handleUserSelection(employee)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {employee.username}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Marital Status</label>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>

        {/* Example for more rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Support">Support</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Duty Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Duty Type</label>
            <select
              name="duty_type"
              value={formData.duty_type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Duty Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Other">Other</option>
            </select>
          </div>
           <div>
            <label className="block text-sm font-medium mb-2">Designation</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Degignation</option>
              <option value="Developer">Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bank Name</label>
            <input
            type="text"
              name="name_in_bank"
              value={formData.name_in_bank}
              onChange={handleInputChange}
              placeholder="Your Name In Bank"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Account Number</label>
            <input
            type="number"
              name="account_number"
              value={formData.account_number}
              onChange={handleInputChange}
              placeholder="Type your account number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">IFSC</label>
            <input
            type="text"
              name="ifsc_code"
              value={formData.ifsc_code}
              onChange={handleInputChange}
              placeholder="Type your Bank IFSC code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
           <div>
            <label className="block text-sm font-medium mb-2">Branch</label>
            <input
            type="text"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              placeholder="Type your Bank Branch"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
           <div>
            <label className="block text-sm font-medium mb-2">Basic Salary</label>
            <input
            type="number"
              name="basic_salary"
              value={formData.basic_salary}
              onChange={handleInputChange}
              placeholder="Type your Basic Salary"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Graduation Year</label>
            <input
            type="number"
              name="graduation_year"
              value={formData.graduation_year}
              onChange={handleInputChange}
              placeholder="Type your Graduation Year"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Graduation Subject</label>
            <input
            type="text"
              name="graduation_subject"
              value={formData.graduation_subject}
              onChange={handleInputChange}
              placeholder="Type your Graduation Subject"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Post Graduation Year</label>
            <input
            type="number"
              name="pg_year"
              value={formData.pg_year}
              onChange={handleInputChange}
              placeholder="Type your Post Graduation Year"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Post Graduation Subject</label>
            <input
            type="text"
              name="pg_subject"
              value={formData.pg_subject}
              onChange={handleInputChange}
              placeholder="Type your Post Graduation Subject"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Professional Course Year</label>
            <input
            type="number"
              name="professional_course_year"
              value={formData.professional_course_year}
              onChange={handleInputChange}
              placeholder="Type your Professional Course Year"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Professional Course Subject</label>
            <input
            type="text"
              name="professional_course_subject"
              value={formData.professional_course_subject}
              onChange={handleInputChange}
              placeholder="Type your Professional Course Subject"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Employeement Type</label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Employeement Type</option>
              <option value="Intern">Intern</option>
              <option value="Permanent">Permanent</option>
              <option value="Remote">Remote</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Previous Employer Name</label>
            <input
            type="text"
              name="previous_employer_name"
              value={formData.previous_employer_name}
              onChange={handleInputChange}
              placeholder="Type your Previous Employer Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
           <div>
            <label className="block text-sm font-medium mb-2">Date of Joining</label>
            <input
            type="date"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleInputChange}
              placeholder="Type your Date of Joining"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
           <div>
            <label className="block text-sm font-medium mb-2">Date of Leaving</label>
            <input
            type="date"
              name="date_of_leaving"
              value={formData.date_of_leaving}
              onChange={handleInputChange}
              placeholder="Type your Date of Leaving"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
              
          </div>
        </div>
        <button
          type="submit"
           className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AddEmployeeDetails;
