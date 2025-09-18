import React, { useState, useEffect } from "react";
import { Table, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditEmployee from "./EditEmployee";
import ToggleButton from "./ToggleButton";
import LoaderSpiner from "./LoaderSpiner";
import "./AllEmpDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUserProfileAction } from "../../redux/actions/dev-aditya-action";
import { toast } from "react-toastify";
import { GetTotalUserAction } from "../../redux/actions/EmployeeDetailsAction";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import api from "./api";

const AllEmpDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const placeholderImage = import.meta.env.VITE_PLACEHOLDER_IMAGE;
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
    <Container className="all-emp-details">
      <Row className="mb-4 d-flex">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{
              cursor: "pointer",
              fontSize: "32px",
              color: "#343a40",
            }}
          ></i>
        </Col>
        <Col md={9}>
          <h3 className="mt-2">All Employee Details</h3>
        </Col>
        <Col className="text-right">
          {(userRole === "admin" || userRole === "hr") && (
            <Link to={"/add-employee"}>
              <Button variant="warning" className="add-employee-button">
                Add Employee
              </Button>
            </Link>
          )}
        </Col>
      </Row>

      <div style={{ overflowX: "auto" }}>
        <DataGrid
          dataSource={employeeUsers}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="shadow-sm rounded"
          height="auto"
          columnAutoWidth={true}
          wordWrapEnabled={true}
          columnHidingEnabled={true}
        >
          <SearchPanel visible={true} placeholder="Search..." />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Paging defaultPageSize={10} />
          <Column
            caption="#"
            width={50}
            cellRender={({ rowIndex }) => rowIndex + 1}
          />
          <Column
            caption="Profile"
            cellRender={({ data }) => (
              <>
                <img
                  src={getProfileImage(data.id)}
                  alt="Profile"
                  className="popup-profile-image"
                  style={{ objectFit: "cover", cursor:"pointer" }}
                  // onClick={() => handleFullDetail(data.id)}

                />
              </>
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
              <>
                <ToggleButton
                  checked={data.user_state === "active"}
                  onToggle={() => toggleUserStatus(data.id, data.user_state)}
                />
              </>
            )}
          />
          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <>
                <Button
                  variant="warning"
                  onClick={() => handleEditClick(data.id)}
                  className="edit-button"
                >
                  Edit
                </Button>
              </>
            )}
          />
          {/* <Column
            caption="Actions"
            cellRender={({ data }) => (
              <>
                <Button
                  variant="warning"
                  onClick={() => handleFullDetail(data.id)}
                  className="full-detail-button"
                >
                  Full Details
                </Button>
              </>
            )}
          /> */}
        </DataGrid>
      </div>
      <EditEmployee
        employeeId={selectedEmployeeId}
        show={showEditModal}
        handleClose={handleCloseEditModal}
      />
    </Container>
  );
};

export default AllEmpDetails;
