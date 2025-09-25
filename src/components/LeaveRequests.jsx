import React, { useState, useEffect } from "react";
// import "../App.css";
import {
  Button,
  Table,
  Modal,
  Form,
  Spinner,
  Row,
  Col,
  Collapse,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetEmployeeLeaveDetailAction } from "../../redux/actions/EmployeeDetailsAction";
import LoaderSpiner from "./LoaderSpiner";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import api from "./api"

const LeaveRequests = ({ setPendingCount }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const senderId = queryParams.get("sender_id");
  const startDateLeave = queryParams.get("start_date");
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [note, setNote] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const currentDate = new Date().toISOString().split("T")[0];
  const { TotalEmployeeInLeave } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("user_name");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState(null);

  const onRowPrepared = (e) => {
    if (e.rowType === "data") {
      if (
        senderId?.trim() === e.data.user_id?.trim() &&
        startDateLeave?.trim() === e.data.start_date?.trim()
      ) {
        e.rowElement.classList.add("highlighted-row"); // custom CSS class
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response = await dispatch(GetEmployeeLeaveDetailAction());
      setRequests(
        response.map((request) => ({
          ...request,
          totalLeaveDays: calculateTotalLeaveDays(
            request.start_date,
            request.end_date
          ),
        }))
      );
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAndProcessRequests = async () => {
      try {
        let fetchedRequests = [];

        if (role === "hr") {
          fetchedRequests = TotalEmployeeInLeave.filter(
            (item) => item.user_name !== userName
          );
        } else {
          fetchedRequests = TotalEmployeeInLeave;
        }

        const updatedRequests = fetchedRequests.map((request) => {
          const validRequest = {
            id: request.id || "",
            apply_date: request.apply_date || "N/A",
            user_name: request.user_name || "Unknown",
            user_id: request.user_id || "N/A",
            paid_leave_count: request.paid_leave_count || "N/A",
            unpaid_leave_count: request.unpaid_leave_count || "N/A",
            start_date: request.start_date || null,
            end_date: request.end_date || null,
            reason_for_leave: request.reason_for_leave || "No reason provided",
            status: request.status || "Pending",
            hr_note: request.hr_note || "",
            total_leave_days: calculateTotalLeaveDays(
              request.start_date,
              request.end_date
            ),
          };

          if (
            validRequest.status === "Pending" &&
            validRequest.end_date &&
            new Date(validRequest.end_date) < new Date()
          ) {
            validRequest.status = "Reject";
            validRequest.hr_note = "Auto-rejected as the leave date has passed";

            api
              .put(
                `${import.meta.env.VITE_API_LEAVE}/${validRequest.id}`,
                validRequest,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "authtoken"
                    )}`,
                  },
                }
              )
              .catch((error) =>
                console.error("Error auto-rejecting leave request:", error)
              );
          }

          return validRequest;
        });

        setRequests(updatedRequests);

        // Calculate pending leave requests
        const pendingCount = updatedRequests.filter(
          (request) => request.status === "Pending"
        ).length;
        setPendingCount(pendingCount);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchAndProcessRequests();
  }, [TotalEmployeeInLeave, userName, role, setPendingCount]);

  const calculateTotalLeaveDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0; // Handle missing dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0; // Handle invalid dates
    const diff = Math.abs(end - start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleAction = (action) => {
    setLoading(true);
    const updatedRequest = {
      ...selectedRequest,
      status: action,
      hr_note: note,
      total_leave_days: calculateTotalLeaveDays(
        selectedRequest.start_date,
        selectedRequest.end_date
      ),
    };

    api
      .put(
        `${import.meta.env.VITE_API_LEAVE}/${selectedRequest.id}`,
        updatedRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      )
      .then((response) => {
        const newRequests = requests.map((req) =>
          req.id === response.data.id ? response.data : req
        );
        setRequests(newRequests);
        toast.success("Leave request updated successfully");
        fetchRequests();
        setLoading(false);

        // Update pending count after the state is updated
        const newPendingCount = newRequests.filter(
          (request) => request.status === "Pending"
        ).length;
        setPendingCount(newPendingCount);

        setSelectedRequest(null);
        setNote("");
        setModalType("");
      })
      .catch((error) => {
        // console.error("Error updating leave request:", error);
        toast.error("Error updating leave request", error);
      });
  };

  const handleDeleteRequest = async () => {
    if (!deleteRequest) return;

    try {
      await api.delete(
        `${import.meta.env.VITE_API_LEAVE}/${deleteRequest.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      const updatedRequests = requests.filter(
        (req) => req.id !== deleteRequest.id
      );
      setRequests(updatedRequests);
      toast.success("Leave request deleted successfully");
    } catch (error) {
      console.error("Error deleting leave request:", error);
      toast.error("Failed to delete leave request");
    } finally {
      setShowDeleteModal(false);
      setDeleteRequest(null);
    }
  };
console.log(loading,"loading");

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
          <h3 className="mb-0">Leave Requests</h3>
        </Col>
        <Col className="text-end ">
          <Link to={"/add-employee-leaves"}>
            <Button>Add Leaves</Button>{" "}
          </Link>
        </Col>
      </Row>

      <div style={{position: "relative", overflowX: "auto" }}>
        <DataGrid
          // ref={gridRef}
          dataSource={requests}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="shadow-sm rounded"
          height="500px"
          columnAutoWidth={true}
          wordWrapEnabled={true}
          columnHidingEnabled={true}
          onRowPrepared={onRowPrepared}
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
          <Column dataField="user_name" caption="User Name" />
          <Column dataField="apply_date" caption="Apply Date" dataType="date" />
          <Column dataField="paid_leave_count" caption="Paid Count" />
          <Column dataField="unpaid_leave_count" caption="Unpaid Count" />
          <Column dataField="start_date" caption="Start Date" dataType="date" />
          <Column dataField="end_date" caption="End Date" dataType="date" />
          <Column dataField="reason_for_leave" caption="Reason" />
          <Column dataField="total_leave_days" caption="Days" />
          <Column dataField="status" caption="Status" />
          <Column dataField="hr_note" caption="HR Note" />

          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedRequest(data);
                    setModalType("Accept");
                  }}
                  disabled={new Date(data.start_date) < new Date(currentDate)}
                >
                  Accept
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedRequest(data);
                    setModalType("Reject");
                  }}
                  disabled={new Date(data.start_date) < new Date(currentDate)}
                >
                  Reject
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setDeleteRequest(data);
                    setShowDeleteModal(true);
                  }}
                  disabled={new Date(data.start_date) < new Date(currentDate)}
                >
                  Delete
                </Button>
              </>
            )}
          />
        </DataGrid>
         {loading && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(255,255,255,0.6)",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex:10,
              }}
            >
              <div role="status"> 
                <LoaderSpiner />  
              </div>
            </div>
          )}
      </div>

      <Modal
        show={!!selectedRequest}
        onHide={() => setSelectedRequest(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalType} Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="hrNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedRequest(null)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAction(modalType)}
            disabled={loading}
          >
            Save
            {loading && (
              <Spinner animation="border" size="sm" className="ms-2" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this leave request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteRequest}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LeaveRequests;
