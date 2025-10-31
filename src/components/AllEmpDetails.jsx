import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditEmployee from "./EditEmployee";
import ToggleButton from "./ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoaderSpiner from "./LoaderSpiner";
import { GetTotalUserAction } from "../../redux/actions/EmployeeDetailsAction";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import api from "./api";
import { ArrowLeftCircle } from "lucide-react";

const AllEmpDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const placeholderImage = `${import.meta.env.VITE_API_BASE_URL}/2024/07/placeholder-image-hrm.png`;
  const dispatch = useDispatch();

  const { AllProfilesImage } = useSelector(({ AllReducers }) => AllReducers);
  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );
  const employeeUsers = TotalUsers.filter(
    (user) => user.role === "employee" || user.role === "hr"
  );

  const getProfileImage = (userId) => {
    if (!AllProfilesImage) return placeholderImage;
    const profile = AllProfilesImage.find(
      (profile) => String(profile.user_id) === String(userId)
    );
    return profile?.profile_image && profile.profile_image.trim() !== ""
      ? profile.profile_image
      : placeholderImage;
  };

  const handleEditClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEmployeeId(null);
  };

  const toggleUserStatus = async (employeeId, currentState) => {
    const newState = currentState === "active" ? "inactive" : "active";
    const confirmToggle = window.confirm(
      `Are you sure you want to set the user state to ${newState}?`
    );

    if (confirmToggle) {
      try {
        await api.put(
          `${import.meta.env.VITE_API_CUSTOM_USERS}/${employeeId}`,
          { user_state: newState },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },
          }
        );
        await dispatch(GetTotalUserAction());
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.id === employeeId ? { ...emp, user_state: newState } : emp
          )
        );

        toast.success(`User state set to ${newState}.`);
      } catch (error) {
        console.error("Error updating user state:", error);
        setErrorMessage("Failed to update user state.");
      }
    }
  };

  // full detail with card profile

  const handleFullDetail = async (userId) => {
    try {
      navigate(`/show-full-profile/${userId}`, {
        state: {
          fullDetails: employees,
        },
      });
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    }
  };

  const userRole = localStorage.getItem("role");
  // console.log(userRole,"rol");

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
          All Employee Details
        </h3>

        {(userRole === "admin" || userRole === "hr") && (
          <Link to="/add-employee">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-700 transition">
              Add Employee
            </button>
          </Link>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
        <DataGrid
          dataSource={employeeUsers}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="shadow-sm rounded"
          height="100vh"
          columnAutoWidth={true}
          wordWrapEnabled={true}
          columnHidingEnabled={true}
        >
          <SearchPanel visible={true} placeholder="Search..." />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Paging defaultPageSize={20} />

          <Column
            caption="#"
            width={50}
            cellRender={({ rowIndex }) => rowIndex + 1}
          />

          <Column
            caption="Profile"
            cellRender={({ data }) => (
              <img
                src={getProfileImage(data.id)}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border"
                onClick={() => handleFullDetail(data.id)}
              />
            )}
          />

          <Column dataField="first_name" caption="First Name" />
          <Column dataField="dob" caption="DOB" />
          <Column dataField="address" caption="Address" />
          <Column dataField="email" caption="E-Mail" />
          <Column dataField="mobile" caption="Mobile" />
          <Column dataField="role" caption="Role" />

          <Column
            caption="UState"
            cellRender={({ data }) => (
              <ToggleButton
                checked={data.user_state === "active"}
                onToggle={() => toggleUserStatus(data.id, data.user_state)}
              />
            )}
          />

          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <button
                onClick={() => handleEditClick(data.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            )}
          />
        </DataGrid>
        {/* {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <LoaderSpiner />
          </div>
        )} */}
      </div>

      <EditEmployee
        employeeId={selectedEmployeeId}
        show={showEditModal}
        handleClose={handleCloseEditModal}
      />
    </div>
  );
};

export default AllEmpDetails;
