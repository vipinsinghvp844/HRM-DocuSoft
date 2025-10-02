import React, { useState, useEffect } from "react";
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
import { ArrowLeftCircle } from "lucide-react";
import { FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";

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
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Leave Requests</h3>

        <Link to="/add-employee-leaves">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Add Leaves
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3">
        <DataGrid
          dataSource={requests}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
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
              <div className="flex gap-3 justify-center">
                <div className="relative group">
                  <FaCheckCircle
                    size={22}
                    className={`cursor-pointer text-green-600 hover:text-green-700 ${new Date(data.start_date) < new Date(currentDate)
                        ? "opacity-40 pointer-events-none"
                        : ""
                      }`}
                    onClick={() => {
                      setSelectedRequest(data);
                      setModalType("Accept");
                    }}
                  />
                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    Accept
                  </span>
                </div>

                <div className="relative group">
                  <FaTimesCircle
                    size={22}
                    className={`cursor-pointer text-red-600 hover:text-red-700 ${new Date(data.start_date) < new Date(currentDate)
                        ? "opacity-40 pointer-events-none"
                        : ""
                      }`}
                    onClick={() => {
                      setSelectedRequest(data);
                      setModalType("Reject");
                    }}
                  />
                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    Reject
                  </span>
                </div>

                <div className="relative group">
                  <FaTrash
                    size={20}
                    className={`cursor-pointer text-gray-700 hover:text-gray-900 ${new Date(data.start_date) < new Date(currentDate)
                        ? "opacity-40 pointer-events-none"
                        : ""
                      }`}
                    onClick={() => {
                      setDeleteRequest(data);
                      setShowDeleteModal(true);
                    }}
                  />
                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    Delete
                  </span>
                </div>
              </div>
            )}
          />
        </DataGrid>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <LoaderSpiner />
          </div>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h2 className="text-lg font-semibold">{modalType} Note</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedRequest(null)}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium mb-2">Note</label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 border-t px-4 py-2">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                onClick={() => handleAction(modalType)}
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h2 className="text-lg font-semibold">Confirm Delete</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDeleteModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              Are you sure you want to delete this leave request?
            </div>
            <div className="flex justify-end gap-2 border-t px-4 py-2">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleDeleteRequest}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
