import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import api from './api';
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ArrowLeftCircle } from 'lucide-react';

const LeavePolicies = () => {
  const [leavePolicies, setLeavePolicies] = useState([]);
  const [form, setForm] = useState({
    leave_type: '',
    leave_days: '',
    leave_year: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeavePolicies();
  }, []);

  const fetchLeavePolicies = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`${import.meta.env.VITE_API_LEAVE_POLICIES}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      });
      // Convert leave_year to a date format if necessary
      const formattedPolicies = response?.data?.map((policy) => ({
        ...policy,
        leave_year: policy.leave_year ? format(parseISO(policy.leave_year), 'yyyy-MM-dd') : '',
      }));
      setLeavePolicies(formattedPolicies);
    } catch (error) {
      console.error('Error fetching leave policies:', error);
    } finally { 
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`${import.meta.env.VITE_API_LEAVE_POLICIES}/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          },
        });
      } else {
        await api.post(`${import.meta.env.VITE_API_LEAVE_POLICIES}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          },
        });
      }
      setForm({
        leave_type: '',
        leave_days: '',
        leave_year: '',
      });
      setEditMode(false);
      setEditId(null);
      toast.success("Leave Policy Add Succesfully");
      fetchLeavePolicies();
    } catch (error) {
      console.error('Error saving leave policy:', error);
    }
  };

  const handleEdit = (policy) => {
    setForm({
      leave_type: policy.leave_type,
      leave_days: policy.leave_days,
      leave_year: format(parseISO(policy.leave_year), 'yyyy-MM-dd'),
    });
    setEditMode(true);
    setEditId(policy.id);
    toast.update("Leave policy updated")
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${import.meta.env.VITE_API_LEAVE_POLICIES}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      });
      fetchLeavePolicies();
      toast.delete("Leave Policy Deleted Successfully")
    } catch (error) {
      console.error('Error deleting leave policy:', error);
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
          Add Leave Policy
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-2">
            Leave Type:
          </label>
          <input
            type="text"
            name="leave_type"
            value={form.leave_type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Leave Days:
          </label>
          <input
            type="number"
            name="leave_days"
            value={form.leave_days}
            onChange={handleChange}
            min="1"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Leave Year:
          </label>
          <input
            type="date"
            name="leave_year"
            value={form.leave_year}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {editMode ? "Update" : "Add"} Leave Policy
        </button>
      </form>

      <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">
        Existing Leave Policies
      </h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3">
        <DataGrid
          dataSource={leavePolicies}
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
          <Column dataField="leave_type" caption="Leave Type" />
          <Column dataField="leave_days" caption="Total Leave Days" />
          <Column dataField="leave_year" caption="Leave Year" />

          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleEdit(data)}
                  className="text-yellow-500 hover:text-yellow-600"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(data.id)}
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
    </div>
  );
};

export default LeavePolicies;
