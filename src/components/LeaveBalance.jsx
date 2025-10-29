import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpiner from "./LoaderSpiner";
import {
  GetLeavePolicyAction,
  GetEmployeeLeaveDetailAction,
} from "../../redux/actions/EmployeeDetailsAction";
import DataGrid, {
  Column,
  Paging,
  FilterRow,
  HeaderFilter,
  SearchPanel,
} from "devextreme-react/data-grid";
import { ArrowLeftCircle } from "lucide-react";

const LeaveBalance = () => {
  const dispatch = useDispatch();
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leavePolicies = useSelector(
    ({ EmployeeDetailReducers }) =>
      EmployeeDetailReducers.TotalLeavePolicy || []
  );
  const leaveRequests = useSelector(
    ({ EmployeeDetailReducers }) =>
      EmployeeDetailReducers.TotalEmployeeInLeave || []
  );

  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    setLoading(true);
    dispatch(GetLeavePolicyAction());
    dispatch(GetEmployeeLeaveDetailAction());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (leavePolicies.length > 0 && leaveRequests.length > 0) {
      calculateLeaveBalances();
    }
  }, [leavePolicies, leaveRequests]);

const calculateLeaveBalances = () => {
  try {
    const balances = leaveRequests
      .filter((request) => request.status === "Accept")
      .map((request) => {
        const policy = leavePolicies.find(
          (policy) =>
            policy.leave_type === "Paid Leave" && 
            policy.leave_year === currentYear
        );

        if (policy) {
          const totalLeave = parseInt(policy.leave_days, 10);

          // aggregate leaves for this user
          const userLeaves = leaveRequests.filter(
            (req) =>
              req.user_id === request.user_id &&
              req.status === "Accept"
          );

          const paidLeaveTaken = userLeaves.reduce(
            (sum, req) => sum + parseInt(req.paid_leave_count || 0, 10),
            0
          );

          const unpaidLeaveTaken = userLeaves.reduce(
            (sum, req) => sum + parseInt(req.unpaid_leave_count || 0, 10),
            0
          );

          return {
            user_id: request.user_id,
            user_name: request.user_name,
            year: policy.leave_year,
            total_leave: totalLeave,
            paid_leave_count: paidLeaveTaken,
            unpaid_leave_count: unpaidLeaveTaken,
            taken_leave: paidLeaveTaken + unpaidLeaveTaken,
            balance_leave: totalLeave - paidLeaveTaken,
          };
        }
        return null;
      })
      .filter(Boolean);

    // remove duplicates (unique user record)
    const uniqueBalances = balances.reduce((acc, current) => {
      const existing = acc.find((item) => item.user_id === current.user_id);
      return existing ? acc : [...acc, current];
    }, []);

    setLeaveBalances(uniqueBalances);
  } catch (error) {
    setError("Error calculating leave balances.");
    console.error(error);
  } finally {
    setLoading(false);
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
          Employee Leave Balance
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoaderSpiner />
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3">
          <DataGrid
            dataSource={leaveBalances}
            keyExpr="user_id"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            wordWrapEnabled={true}
            columnHidingEnabled={true}
            className="rounded"
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
            <Column dataField="user_id" caption="User ID" />
            <Column dataField="user_name" caption="User Name" />
            <Column dataField="year" caption="Year" />
            <Column dataField="total_leave" caption="Total Paid Leave" />
            <Column dataField="paid_leave_count" caption="Paid Count" />
            <Column dataField="unpaid_leave_count" caption="Unpaid Count" />
            <Column dataField="taken_leave" caption="Taken Leave" />
            <Column dataField="balance_leave" caption="Balance Leave" />
          </DataGrid>
        </div>
      )}
    </div>
  );
};

export default LeaveBalance;
