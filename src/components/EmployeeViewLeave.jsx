import React, { useState, useEffect, useRef } from "react";
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
import { ArrowLeftCircle } from "lucide-react";

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


  const calculateEndDate = (startDate, paid, unpaid) => {
    if (!startDate) return "";
    const totalDays = (parseInt(paid) || 0) + (parseInt(unpaid) || 0);
    if (totalDays <= 0) return startDate;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + totalDays - 1);
    return endDate.toISOString().split("T")[0];
  };



  const dispatch = useDispatch();
  const { TotalEmployeeInLeaveById } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  const gridRef = useRef(null);

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
          My Leave Requests
        </h3>

          <Link to={"/apply-leave"}>
            <button className="bg-blue-600 btn-blue text-white p-5 rounded-lg shadow hover:bg-blue-700 transition">
              Apply Leave
            </button>
          </Link>
      </div>

     
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
          <DataGrid
            ref={gridRef}
            dataSource={requests}
            keyExpr="id"
            showBorders={true}
            rowAlternationEnabled={true}
            className="shadow-sm rounded table table-grid table-grid-2 w-100"
            height="auto"
            columnAutoWidth={true}
            wordWrapEnabled={true}
            columnHidingEnabled={true}
          >
            <SearchPanel visible={true} placeholder="Search..." />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <Paging defaultPageSize={5} />

            <Column dataField="apply_date" caption="Apply Date" dataType="date" />
            <Column dataField="paid_leave_count" caption="Paid Count" />
            <Column dataField="unpaid_leave_count" caption="Unpaid Count" />
            <Column dataField="start_date" caption="Start Date" dataType="date" />
            <Column dataField="end_date" caption="End Date" dataType="date" />
            <Column dataField="reason_for_leave" caption="Reason" />
            <Column dataField="total_leave_days" caption="Total Days" width={70} />
            <Column dataField="status" caption="Status" />
            <Column dataField="hr_note" caption="HR Note" />

            <Column
              caption="Actions"
              width={120}
              cellRender={({ data }) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteClick(data.id)}
                    disabled={deleting}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition disabled:opacity-50"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(data.id)}
                    disabled={editing}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600 transition disabled:opacity-50"
                  >
                    Edit
                  </button>
                </div>
              )}
            />
          </DataGrid>
        </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {modalType === "delete" ? "Confirm Deletion" : "Edit Leave Request"}
              </h2>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>

            <div>
              {modalType === "delete" ? (
                <p>Are you sure you want to delete this leave request?</p>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label className="block font-medium">Paid Count</label>
                    <input
                      type="number"
                      value={formData?.paid_leave_count}
                      onChange={(e) => {
                        const newPaid = e.target.value;
                        const newEnd = calculateEndDate(
                          formData.start_date,
                          newPaid,
                          formData.unpaid_leave_count
                        );
                        setFormData({ ...formData, paid_leave_count: newPaid, end_date: newEnd });
                      }}
                      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Unpaid Count</label>
                    <input
                      type="number"
                      value={formData?.unpaid_leave_count}
                      onChange={(e) => {
                        const newUnpaid = e.target.value;
                        const newEnd = calculateEndDate(
                          formData.start_date,
                          formData.paid_leave_count,
                          newUnpaid
                        );
                        setFormData({ ...formData, unpaid_leave_count: newUnpaid, end_date: newEnd });
                      }}
                      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Start Date</label>
                    <input
                      type="date"
                      value={formData?.start_date}
                      onChange={(e) => {
                        const newStart = e.target.value;
                        const newEnd = calculateEndDate(
                          newStart,
                          formData.paid_leave_count,
                          formData.unpaid_leave_count
                        );
                        setFormData({ ...formData, start_date: newStart, end_date: newEnd });
                      }}
                      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">End Date</label>
                    <input
                      type="date"
                      value={formData?.end_date}
                      min={formData?.start_date}
                      readOnly
                      className="border rounded px-3 py-2 w-full bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Reason for Leave</label>
                    <textarea
                      rows={3}
                      value={formData.reason_for_leave}
                      onChange={(e) =>
                        setFormData({ ...formData, reason_for_leave: e.target.value })
                      }
                      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                  </div>
                </form>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              {modalType === "delete" ? (
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              ) : (
                <button
                  onClick={confirmEdit}
                  disabled={editing}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {editing ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default EmployeeViewLeave;
