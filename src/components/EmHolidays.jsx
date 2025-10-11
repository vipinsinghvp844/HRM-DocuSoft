import React, { useState, useEffect } from 'react';
import {ListGroup } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import CalendarComponent from './CalendarComponent ';
import api from './api';
import { ArrowLeftCircle } from 'lucide-react';
import { FormControl, MenuItem, Select } from '@mui/material';


const EmHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    type: '',
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_HOLIDAYS}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      });
      setHolidays(response.data);
      setFilteredHolidays(response.data); 
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filteredList = holidays;

    if (filters.date) {
      filteredList = filteredList.filter((holiday) => holiday.holiday_date === filters.date);
    }
    if (filters.type) {
      filteredList = filteredList.filter((holiday) => holiday.holiday_type === filters.type);
    }

    setFilteredHolidays(filteredList);
  };

  const resetFilters = () => {
    setFilters({
      date: '',
      type: '',
    });
    setFilteredHolidays(holidays);
  };

  const renderHolidayListItem = (holiday) => {
    const today = new Date().toISOString().split('T')[0];
    const isToday = holiday.holiday_date === today;

    return (
      <ListGroup.Item key={holiday.id} className={isToday ? 'highlight-today' : ''}>
        {holiday.holiday_name} - {holiday.holiday_date} ({holiday.holiday_type})
      </ListGroup.Item>
    );
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const isHoliday = holidays.some((holiday) => holiday.holiday_date === formattedDate);

    return isHoliday ? <div className="highlight-holiday"></div> : null;
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
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Holidays</h3>
      </div>

      <div className="bg-white shadow rounded-lg mb-6 p-3">
        <h4 className="text-lg font-semibold border-b pb-2 mb-4">Filter Holidays</h4>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex flex-col">
              <label className="font-medium mb-2 text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out hover:border-blue-400 text-gray-700 bg-white w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Type</label>
              <FormControl fullWidth size="small">
                <Select
              
                 name="type"
                value={filters.type}
                onChange={handleFilterChange}
                 className="min-w-[120px]"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#60a5fa',
                },
              },
              '& .MuiSelect-select': {
                padding: '8px 14px',
              }
            }}
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="Public Holiday">Public Holiday</MenuItem>
                <MenuItem value="Company Holiday">Company Holiday</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              </FormControl>
              
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={applyFilters}
                className="bg-blue-500 btn-blue text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="btn-outline-danger btn"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h4 className="text-lg font-semibold border-b pb-2 mb-4">Holiday List</h4>
          <ul className="divide-y">
            {filteredHolidays.length > 0 ? (
              filteredHolidays.map((holiday) => renderHolidayListItem(holiday))
            ) : (
              <li className="p-2 text-center text-gray-500">No holidays available.</li>
            )}
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <div>
            <CalendarComponent />
          </div>
        </div>
      </div>
    </div>

  );
};

export default EmHolidays;
