import React, { useState, useEffect, useRef } from "react";
import { Container, Spinner, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const [editing, setEditing] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [formData, setFormData] = useState({
    paid_leave_count: "",
    unpaid_leave_count: "",
    start_date: "",
    end_date: "",
    reason_for_leave: "",
  });

  //util function to calculate end date based on start date and leave counts

  const calculateEndDate = (startDate, paid, unpaid) => {
    if (!startDate) return "";
    const totalDays = (parseInt(paid) || 0) + (parseInt(unpaid) || 0);
    if (totalDays <= 0) return startDate;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + totalDays - 1);
    return endDate.toISOString().split("T")[0]; // format YYYY-MM-DD
  };



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
  // const handleAction = (requestId) => {
  //   if (!loggedInUserId) {
  //     setError("User not logged in. Please log in and try again.");
  //     return;
  //   }
  //   const request = requests.find((req) => req.id === requestId);
  //   if (request?.status && request.status !== "Pending") {
  //     toast.error("HR has already taken action. Actions not allowed.");
  //     return;
  //   }
  //   setShowConfirm(true);
  //   setDeleteRequestId(requestId);
  // };

  // const confirmDelete = async () => {
  //   const userId = localStorage.getItem("user_id");
  //   setDeleting(true);
  //   try {
  //     await api.delete(
  //       `${import.meta.env.VITE_API_LEAVE}/${userId}?id=${deleteRequestId}`,
  //       {
  //         data: { user_id: loggedInUserId },
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
  //         },
  //       }
  //     );
  //     await dispatch(GetEmployeeLeaveDetailActionById());
  //     setRequests((prevRequests) =>
  //       prevRequests.filter((request) => request.id !== deleteRequestId)
  //     );
  //     toast.success("Request deleted successfully");
  //     setShowConfirm(false);
  //     setDeleteRequestId(null);
  //   } catch (error) {
  //     console.error("Error deleting leave request:", error);
  //     setError("Error deleting leave request. Please try again later.");
  //   } finally {
  //     setDeleting(false);
  //   }
  // };

  const handleDeleteClick = (requestId) => {
    if (!loggedInUserId) {
      setError("User not logged in. Please log in and try again.");
      return;
    }
    const request = requests.find((req) => req.id === requestId);
    if (request?.status && request.status !== "Pending") {
      toast.error("HR has already taken action. Delete not allowed.");
      return;
    }
    setModalType("delete");
    setDeleteRequestId(requestId);
    setShowConfirm(true);
  };

  // Open modal for edit
  const handleEditClick = (requestId) => {
    const request = requests.find((req) => req.id === requestId);
    if (request?.status && request.status !== "Pending") {
      toast.error("HR has already taken action. Edit not allowed.");
      return;
    }
    setSelectedRequest(request);
    setFormData({
      paid_leave_count: request.paid_leave_count,
      unpaid_leave_count: request.unpaid_leave_count,
      start_date: request.start_date,
      end_date: request.end_date,
      reason_for_leave: request.reason_for_leave,
    });
    setModalType("edit");
    setShowConfirm(true);
  };

  // Confirm Delete
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

  // Confirm Edit
  const confirmEdit = async () => {
    const userId = localStorage.getItem("user_id");
    setEditing(true);
    try {
      await api.put(
        `${import.meta.env.VITE_API_USER_EDIT_LEAVE}/${userId}?id=${selectedRequest.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      await dispatch(GetEmployeeLeaveDetailActionById());
      toast.success("Request updated successfully");
      setShowConfirm(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error updating leave request:", error);
      setError("Error updating leave request. Please try again later.");
    } finally {
      setEditing(false);
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
              width={120}
              cellRender={({ data }) => (
                <>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteClick(data.id)}
                    disabled={deleting}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleEditClick(data.id)}
                    disabled={editing}
                  >
                    Edit
                  </Button>
                </>
              )}
            />

          </DataGrid>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "delete" ? "Confirm Deletion" : "Edit Leave Request"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Are you sure you want to delete this leave request?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Paid Count</Form.Label>
                <Form.Control
                  type="number"
                  value={formData?.paid_leave_count}
                  onChange={(e) => {
                    const newPaid = e.target.value;
                    const newEnd = calculateEndDate(formData.start_date, newPaid, formData.unpaid_leave_count);
                    setFormData({ ...formData, paid_leave_count: newPaid, end_date: newEnd });
                  }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unpaid Count</Form.Label>
                <Form.Control
                  type="number"
                  value={formData?.unpaid_leave_count}
                  onChange={(e) => {
                    const newUnpaid = e.target.value;
                    const newEnd = calculateEndDate(formData.start_date, formData.paid_leave_count, newUnpaid);
                    setFormData({ ...formData, unpaid_leave_count: newUnpaid, end_date: newEnd });
                  }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData?.start_date}
                  onChange={(e) => {
                    const newStart = e.target.value;
                    const newEnd = calculateEndDate(newStart, formData.paid_leave_count, formData.unpaid_leave_count);
                    setFormData({ ...formData, start_date: newStart, end_date: newEnd });
                  }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date"
                  value={formData?.end_date}
                  min={formData?.start_date}
                  readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reason for Leave</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.reason_for_leave}
                  onChange={(e) => setFormData({ ...formData, reason_for_leave: e.target.value })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          {modalType === "delete" ? (
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={confirmEdit}
              disabled={editing}
            >
              {editing ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeViewLeave;
