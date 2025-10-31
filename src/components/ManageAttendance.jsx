import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddAttendance from "./AddAttendance";
import { useSelector } from "react-redux";
import LoaderSpiner from "./LoaderSpiner";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { ArrowLeftCircle, CalendarCheck, Eye } from "lucide-react";

const ManageAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState("false");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      try {
        const employeeUsers = TotalUsers.filter(
          (user) => user.role === "employee" || user.role === "hr"
        );
        setEmployees(employeeUsers);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAttendanceDetails = async (userId) => {
    try {
      navigate(`/employee-attendance/${userId}`, {
        state: {
          attendanceDetails: employees,
        },
      });
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    }
  };
  const handlePersonalDetails = async (userId) => {
    try {
      navigate(`/personal-detail/${userId}`, {
        state: {
          personalDetails: employees,
        },
      });
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
  };


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

        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">
          Manage Attendance
        </h3>

        <button
          onClick={handleShow}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Add Attendance
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
        <DataGrid
          dataSource={employees}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="w-full"
          height="100vh"
          columnAutoWidth={true}
          wordWrapEnabled={true}
          columnHidingEnabled={true}
        >
          <SearchPanel visible={true} placeholder="Search..." />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Paging defaultPageSize={20} />

          <Column caption="#" width={50} cellRender={({ rowIndex }) => rowIndex + 1} />
          <Column dataField="id" caption="ID" />
          <Column dataField="first_name" caption="First Name" />
          <Column dataField="last_name" caption="Last Name" />
          <Column dataField="email" caption="E-Mail" dataType="email" />
          <Column dataField="mobile" caption="Mobile" />
          <Column dataField="role" caption="Role" />

          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handlePersonalDetails(data.id)}
                  className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                  title="View Personal Report"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleAttendanceDetails(data.id)}
                  className="p-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                  title="View Attendance Report"
                >
                  <CalendarCheck size={18} />
                </button>
              </div>
            )}
          />
        </DataGrid>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <LoaderSpiner />
          </div>
        )}
      </div>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 right-0 h-full w-3/4 sm:w-1/3 lg:w-1/4 bg-white shadow-lg z-50 transform transition-transform duration-300">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Add Attendance</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-64px)]">
              <AddAttendance />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAttendance;
