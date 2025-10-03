import React, { useEffect, useState } from 'react';
import LoaderSpiner from "./LoaderSpiner";
import api from './api';
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { ArrowLeftCircle } from 'lucide-react';

function OurShift() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const padZero = (num) => num.toString().padStart(2, "0");

  const convertTo12Hour = (time24) => {
    let [hours, minutes] = time24.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${padZero(hours)}:${padZero(minutes)} ${period}`;
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${import.meta.env.VITE_API_SHIFTS}`);
      setShifts(response?.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Office Shifts</h3>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
        <DataGrid
          dataSource={loading ? [] : shifts}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="shadow-sm rounded table-grid-2 table-grid w-100"
          height="auto"
          columnAutoWidth={true}
          wordWrapEnabled={true}
          columnHidingEnabled={true}
        >
          <SearchPanel visible={true} placeholder="Search shifts..." />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Paging defaultPageSize={10} />

          <Column dataField="shift_name" caption="Shift Name" />
          <Column dataField="start_time" caption="Office In Time" cellRender={({ value }) => convertTo12Hour(value)} />
          <Column dataField="end_time" caption="Office Out Time" cellRender={({ value }) => convertTo12Hour(value)} />
          <Column dataField="total_time" caption="Total Office Time" />
          <Column dataField="updated_at" caption="Updated At" dataType="date" />

        </DataGrid>

        {loading && (
          <div className="flex justify-center items-center h-48">
            <LoaderSpiner />
          </div>
        )}

        {!loading && shifts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No Attendance Record for this month</p>
        )}
      </div>
    </div>

  );
}

export default OurShift;
