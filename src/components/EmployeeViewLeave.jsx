import React, { useState, useEffect, useRef } from "react";
import { Container, Spinner, Button, Modal, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { GetEmployeeLeaveDetailActionById } from "../../redux/actions/EmployeeDetailsAction";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import api from "./api";

const EmployeeViewLeave = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();
  const { TotalEmployeeInLeaveById } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  const gridRef = useRef(null);



  // Fetch leave data
  useEffect(() => {
    fetchLeaveData();
  }, [dispatch, TotalEmployeeInLeaveById]);

  const fetchLeaveData = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        setError("User not logged in. Please log in and try again.");
        setLoading(false);
        return;
      }
      setLoggedInUserId(user_id);
      const filtdata = TotalEmployeeInLeaveById.filter(
        (data) => String(data.user_id).trim() === String(user_id).trim()
      );
      setRequests(filtdata);
    } catch (error) {
      setError("Error fetching leave requests.");
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = (requestId) => {
    if (!loggedInUserId) {
      setError("User not logged in. Please log in and try again.");
      return;
    }
    const request = requests.find((req) => req.id === requestId);
    if (request?.status && request.status !== "Pending") {
      toast.error("HR has already taken action. Deletion not allowed.");
      return;
    }
    setShowConfirm(true);
    setDeleteRequestId(requestId);
  };

  const confirmDelete = async () => {
    const userId = localStorage.getItem("user_id");
    setDeleting(true);
    try {
      await api.delete(
        `${import.meta.env.VITE_API_LEAVE}/${userId}?id=${deleteRequestId}`,
        {
          data: { user_id: loggedInUserId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      await dispatch(GetEmployeeLeaveDetailActionById());
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== deleteRequestId)
      );
      toast.success("Request deleted successfully");
      setShowConfirm(false);
      setDeleteRequestId(null);
    } catch (error) {
      console.error("Error deleting leave request:", error);
      setError("Error deleting leave request. Please try again later.");
    } finally {
      setDeleting(false);
    }
  };

  // Reset Filters function
  const resetFilters = () => {
    if (gridRef.current) {
      gridRef.current.instance.clearFilter();
      gridRef.current.instance.clearSorting();
      gridRef.current.instance.clearGrouping();
      toast.info("Filters reset successfully");
    }
  };

  return (
    <Container fluid className="p-3">
      <Row className="align-items-center mb-3">
        <Col md={1}>
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => window.history.back()}
            style={{ cursor: "pointer", fontSize: "32px", color: "#343a40" }}
          ></i>
        </Col>
        <Col md={7}>
          <h3 className="mb-0">My Leave Requests</h3>
        </Col>
        <Col className="text-end ">
          {/* <Button variant="secondary" onClick={resetFilters} className="me-2">
            Reset Filters
          </Button> */}
          <Link to={"/apply-leave"}>
            <Button variant="primary">Apply Leave</Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <DataGrid
            ref={gridRef}
            dataSource={requests}
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
            <Paging defaultPageSize={5} />

            <Column
              dataField="apply_date"
              caption="Apply Date"
              dataType="date"
            />
            <Column dataField="paid_leave_count" caption="Paid Count" />
            <Column dataField="unpaid_leave_count" caption="Unpaid Count" />
            <Column
              dataField="start_date"
              caption="Start Date"
              dataType="date"
            />
            <Column dataField="end_date" caption="End Date" dataType="date" />
            <Column dataField="reason_for_leave" caption="Reason" />
            <Column dataField="total_leave_days" caption="Days" width={70} />
            <Column dataField="status" caption="Status" />
            <Column dataField="hr_note" caption="HR Note" />

            <Column
              caption="Actions"
              cellRender={({ data }) => (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(data.id)}
                  disabled={deleting}
                >
                  Delete
                </Button>
              )}
            />
          </DataGrid>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this leave request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeViewLeave;
