import React, { useState, useEffect } from "react";
import { AddHolidayAction, DeleteHolidayAction, GetHolidayAction, UpdateHolidayAction } from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import api from "./api";
import { ArrowLeftCircle } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";


const ManageHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({
    holiday_name: "",
    holiday_date: "",
    description: "",
    holiday_type: "Public Holiday",
    repeat_annually: false,
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const userRole = localStorage.getItem("role");
  const dispatch = useDispatch();
  const { TotalHolidays } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHoliday((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await dispatch(AddHolidayAction(newHoliday, async()=>{
        await dispatch(GetHolidayAction());
      }));
      setNewHoliday({
        holiday_name: "",
        holiday_date: "",
        description: "",
        holiday_type: "Public Holiday",
        repeat_annually: false,
      });
    } catch (error) {
      console.error("Error adding holiday:", error);
    }finally {
      setIsLoading(false);
    }
  };

  const handleUpdateHoliday = async (id, updatedHoliday) => {
    setIsLoading(true);
    try {
      const response = await dispatch(UpdateHolidayAction(id, updatedHoliday, async()=>{
        await dispatch(GetHolidayAction());
      }));
    } catch (error) {
      console.error("Error updating holiday:", error);
    }finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHoliday = async (id) => {
    setIsLoading(true);
    try {
      const response = await dispatch(DeleteHolidayAction(id, async()=>{
        await dispatch(GetHolidayAction());
      }));
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }finally {
      setIsLoading(false);
    }
  };

  const openModal = (holiday) => {
    setSelectedHoliday(holiday);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedHoliday(null);
    setShowModal(false);
  };

  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedHoliday((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveModalChanges = () => {
    if (selectedHoliday) {
      handleUpdateHoliday(selectedHoliday.id, selectedHoliday);
    }
    closeModal();
  };

  return (
    <div className="pt-4 px-2">
      {/* Header */}
      <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftCircle size={32} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Back</span>
        </button>
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Add Holidays</h3>
      </div>

      {/* Form */}
      <form
        onSubmit={handleAddHoliday}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Holiday Name</label>
            <input
              type="text"
              name="holiday_name"
              value={newHoliday.holiday_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Holiday Date</label>
            <input
              type="date"
              name="holiday_date"
              value={newHoliday.holiday_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={newHoliday.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Holiday Type</label>
            <select
              name="holiday_type"
              value={newHoliday.holiday_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Public Holiday">Public Holiday</option>
              <option value="Company Holiday">Company Holiday</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <label className="block text-sm font-medium mb-2">Repeat Annually</label>
            <input
              type="checkbox"
              name="repeat_annually"
              checked={newHoliday.repeat_annually}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Holiday
        </button>
      </form>
      {/* Holidays DataGrid */}
       <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3">
        <DataGrid
          dataSource={TotalHolidays}
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
          <Column dataField="holiday_date" caption="Holiday Date" />
          <Column dataField="holiday_name" caption="Holiday Name" />
          <Column dataField="holiday_type" caption="Holiday Type" />
          <Column dataField="repeat_annually" caption="Repeat Annually"/>

          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => openModal(data)}
                  className="text-yellow-500 hover:text-yellow-600"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteHoliday(data.id)}
                  className="text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash size={18} />
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
              <h3 className="text-lg font-semibold">Update Holiday</h3>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                ✕
              </button>
            </div>
            {selectedHoliday && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Holiday Name</label>
                  <input
                    type="text"
                    name="holiday_name"
                    value={selectedHoliday.holiday_name}
                    onChange={handleModalChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Holiday Date</label>
                  <input
                    type="date"
                    name="holiday_date"
                    value={selectedHoliday.holiday_date}
                    onChange={handleModalChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={selectedHoliday.description}
                    onChange={handleModalChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Holiday Type</label>
                  <select
                    name="holiday_type"
                    value={selectedHoliday.holiday_type}
                    onChange={handleModalChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Public Holiday">Public Holiday</option>
                    <option value="Company Holiday">Company Holiday</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium">Repeat Annually</label>
                  <input
                    type="checkbox"
                    name="repeat_annually"
                    checked={selectedHoliday.repeat_annually}
                    onChange={handleModalChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={saveModalChanges}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>

  );
};

export default ManageHolidays;
