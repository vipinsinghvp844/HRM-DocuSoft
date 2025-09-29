import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import AddAttendance from "./AddAttendance";
import "./ManageAttendance.css"; // Import the custom CSS file
import { useSelector } from "react-redux";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";

const ManageAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { TotalUsers } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeUsers = TotalUsers.filter(
          (user) => user.role === "employee" || user.role === "hr"
        );
        setEmployees(employeeUsers);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
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
    <Container className="manage-attendance-container">
      <Row className="mb-4 mt-2 d-flex align-items-center">
        <Col xs={2} md={1}>
          <i
            className="bi bi-arrow-left-circle back-icon"
            onClick={() => window.history.back()}
          ></i>
        </Col>
        <Col xs={8} md={9} className="text-center text-md-left">
          <h3 className="mt-2">Manage Attendance</h3>
        </Col>
        <Col xs={12} md={2} className="text-right text-md-left">
          <Button variant="primary" onClick={handleShow}>
            Add Attendance
          </Button>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Add Attendance</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <AddAttendance />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
      <div style={{ overflowX: "auto" }}>
        <DataGrid
          dataSource={employees}
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
          <Column dataField="id" caption="ID" />
          <Column dataField="first_name" caption="User Name" />
          <Column dataField="last_name" caption="Last Name" />
          <Column dataField="email" caption="E-Mail" dataType="email" />
          <Column dataField="mobile" caption="Mobile" />
          <Column dataField="role" caption="Role" />
          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <>
                <Button
                  variant="info"
                  className="action-button"
                  onClick={() => handlePersonalDetails(data.id)}
                  title="View Personal Report"
                >
                  <FaEye />
                </Button>
                <Button
                  variant="info"
                  className="action-button"
                  onClick={() => handleAttendanceDetails(data.id)}
                  title="View Attendance Report"
                >
                  <i className="bi bi-calendar-check"></i>
                </Button>
              </>
            )}
          />
        </DataGrid>
      </div>
    </Container>
  );
};

export default ManageAttendance;
