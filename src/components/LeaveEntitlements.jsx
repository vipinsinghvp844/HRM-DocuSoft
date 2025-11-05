import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "./api";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { ArrowLeftCircle } from "lucide-react";

const LeaveEntitlements = () => {
  const [leavePolicies, setLeavePolicies] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const userId = localStorage.getItem("user_id"); 

  useEffect(() => {
    setLoading(true);
    fetchLeavePolicies();
    fetchLeaveRequests();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (leavePolicies.length > 0 && leaveRequests.length > 0) {
      calculateLeaveBalances();
    }
  }, [leavePolicies, leaveRequests]);

  const fetchLeavePolicies = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_LEAVE_POLICIES}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      setLeavePolicies(response.data);
    } catch (error) {
      console.error("Error fetching leave policies:", error);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_LEAVE}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });

      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const calculateLeaveBalances = () => {
    setLoading(true);

    if (!userId) {
      toast.error("No user ID found.");
      setError("Error calculating leave balances.");
      return;
    }

    const balances = leavePolicies.map((policy) => {
      const totalLeave = parseInt(policy.leave_days);

      const paidLeaveCount = leaveRequests
        .filter((request) => {
          const year = new Date(request.start_date).getFullYear().toString();
          return (
            request.user_id === userId &&
            parseInt(request.paid_leave_count) > 0 &&
            request.status === "Accept" &&
            year === policy.leave_year
          );
        })
        .reduce((sum, req) => sum + parseInt(req.paid_leave_count), 0);

      const unpaidLeaveCount = leaveRequests
        .filter((request) => {
          const year = new Date(request.start_date).getFullYear().toString();
          return (
            request.user_id === userId &&
            parseInt(request.unpaid_leave_count) > 0 &&
            request.status === "Accept" &&
            year === policy.leave_year
          );
        })
        .reduce((sum, req) => sum + parseInt(req.unpaid_leave_count), 0);

      const takenLeave = paidLeaveCount + unpaidLeaveCount;

      const balanceLeave = totalLeave - paidLeaveCount;

      return {
        id: `${userId}-${policy.leave_type}`,
        user_id: userId,
        year: policy.leave_year,
        total_leave: totalLeave,
        paid_leave_count: paidLeaveCount,
        unpaid_leave_count: unpaidLeaveCount,
        taken_leave: takenLeave,
        balance_leave: balanceLeave,
      };
    });

    setLeaveBalances(balances);
    setLoading(false);
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
        <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">Leave Balance</h3>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
        <DataGrid
          dataSource={leaveBalances}
          keyExpr="id"
          showBorders={true}
          rowAlternationEnabled={true}
          className="shadow-sm rounded"
          columnAutoWidth={true}
          wordWrapEnabled={true}
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
          <Column dataField="year" caption="Year" />
          <Column dataField="total_leave" caption="Total Paid Leave" />
          <Column dataField="paid_leave_count" caption="Paid Count" />
          <Column dataField="unpaid_leave_count" caption="Unpaid Count" />
          <Column dataField="taken_leave" caption="Taken Leave" />
          <Column dataField="balance_leave" caption="Balance Leave" />
        </DataGrid>
      </div>
    </div>


  );
};

export default LeaveEntitlements;
