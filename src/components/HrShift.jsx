import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GetOfficeShiftsAction } from "../../redux/actions/EmployeeDetailsAction";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ArrowLeftCircle } from 'lucide-react';

function HrShift() {
  const [shifts, setShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newShiftName, setNewShiftName] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentShiftId, setCurrentShiftId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { TotalOfficeShifts } = useSelector(
  //   ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  // );
  const dispatch = useDispatch();

  function convertTo12Hour(time24) {
    let [hours, minutes] = time24.split(":");
    let period = "AM";
    if (hours > 12) {
      hours = hours - 12;
      period = "PM";
    } else if (hours == 12) {
      period = "PM";
    } else if (hours == 0) {
      hours = 12;
    }
    return `${hours}:${minutes} ${period}`;
  }

  function convertTo24Hour(time12) {
    let [time, period] = time12.split(" ");
    let [hours, minutes] = time.split(":");

    if (period === "PM" && hours < 12) {
      hours = parseInt(hours) + 12;
    } else if (period === "AM" && hours == 12) {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  }


  const fetchShifts = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(GetOfficeShiftsAction());
      const formattedShifts = response.map((shift) => ({
        ...shift,
        start_time: convertTo12Hour(shift.start_time),
        end_time: convertTo12Hour(shift.end_time),
      }));
      setShifts(formattedShifts);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchShifts();
  }, []);

  const onDelete = async (shiftId) => {
    if (
      window.confirm("Are you sure you want to delete this shift permanently?")
    ) {
      deleteShift(shiftId);
      fetchShifts();
    }
  };

  const deleteShift = async (shiftId) => {
    try {
      await api.delete(`${import.meta.env.VITE_API_SHIFTS}/${shiftId}`);
      setShifts(shifts.filter((shift) => shift.id !== shiftId));
      toast.success("Shift deleted successfully");
    } catch (error) {
      console.error("Error deleting shift:", error);
    }
  };

  const onUpdate = (shift) => {
    setNewShiftName(shift.shift_name);
    setNewStartTime(shift.start_time);
    setNewEndTime(shift.end_time);
    setCurrentShiftId(shift.id);
    setIsUpdating(true);
    setShowModal(true);
  };

  const handleAddShift = async () => {
    try {
      // Convert new start and end times to 24-hour format for sending to API
      const newShift = {
        shift_name: newShiftName,
        start_time: convertTo24Hour(newStartTime),
        end_time: convertTo24Hour(newEndTime),
      };

      if (isUpdating) {
        await api.put(
          `${import.meta.env.VITE_API_SHIFTS}/${currentShiftId}`,
          newShift
        );
      } else {
        await api.post(`${import.meta.env.VITE_API_SHIFTS}`, newShift);
      }

      fetchShifts();
      setShowModal(false);
      setNewShiftName("");
      setNewStartTime("");
      setNewEndTime("");
      setIsUpdating(false);
      setCurrentShiftId(null);
      toast.success("Shift updated successfully");
    } catch (error) {
      toast.error("Error adding/updating shift:", error);
      console.error("Error adding/updating shift:", error);
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
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Add Shifts</h3>
        <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add Shift
      </button>
      </div>

      

      {/* DataGrid Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3">
        <DataGrid
          dataSource={shifts}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
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
          <Column dataField="shift_name" caption="Shift Name" />
          <Column dataField="start_time" caption="In Time" />
          <Column dataField="end_time" caption="Out Time" />
          <Column dataField="total_time" caption="Total Time" />
          <Column dataField="created_at" caption="Created At" />
          <Column dataField="updated_at" caption="Updated At" />
          <Column dataField="shift_status" caption="Shift Status" />

          {/* Actions */}
          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onUpdate(data)}
                  className="flex items-center gap-1 text-yellow-500 hover:text-yellow-600"
                  title="Edit"
                >
                  <FaEdit size={18} />
                  <span className="hidden md:inline">Edit</span>
                </button>
                <button
                  onClick={() => onDelete(data.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash size={18} />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </div>
            )}
          />
        </DataGrid>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {isUpdating ? "Update Shift" : "Add New Shift"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Shift Name</label>
                <input
                  type="text"
                  placeholder="Enter shift name"
                  value={newShiftName}
                  onChange={(e) => setNewShiftName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Office In Time</label>
                <input
                  type="text"
                  placeholder="09:00 AM"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Office Out Time</label>
                <input
                  type="text"
                  placeholder="05:00 PM"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleAddShift}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isUpdating ? "Update Shift" : "Add Shift"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HrShift;
