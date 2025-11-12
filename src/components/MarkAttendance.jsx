import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderSpiner from "./LoaderSpiner";
import {
  GetAttendanceDataActionByIdAndDate,
  submitAttendanceAction,
} from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch } from "react-redux";
import { Coffee, LogIn, LogOut } from "lucide-react";
import "../App.css";
import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";

/* Helper functions */
const padZero = (num) => num.toString().padStart(2, "0");

const formatDuration = (minutes) => {
  if (isNaN(minutes) || minutes < 0) return "--:--";
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  return `${padZero(hours)}:${padZero(mins)}`;
};

/* Small live clock component isolated to avoid re-render flicker */
const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const localTime = new Intl.DateTimeFormat("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(new Date());
      setTime(localTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTo12HourFormat = (time24) => {
    if (!time24) return "--:--";
    let [hours, minutes, seconds] = time24.split(":");
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${period}`;
  };

  return <span>{convertTo12HourFormat(time)}</span>;
};

/* ============================= Main Component ============================= */

const MarkAttendance = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [checkInDisabled, setCheckInDisabled] = useState(false);
  const [checkOutDisabled, setCheckOutDisabled] = useState(true);
  const [breakInDisabled, setBreakInDisabled] = useState(true);
  const [breakOutDisabled, setBreakOutDisabled] = useState(true);
  const [totalBreakDuration, setTotalBreakDuration] = useState("--:--");
  const [totalWorkDuration, setTotalWorkDuration] = useState("--:--");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [breakInTimes, setBreakInTimes] = useState([]);
  const [breakOutTimes, setBreakOutTimes] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useDispatch();

  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("user_name");

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();

  const convertTo12HourFormat = (time24) => {
    if (!time24) return "--:--";
    let [hours, minutes, seconds] = time24.split(":");
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${period}`;
  };

  /* Fetch attendance data */
  async function performDataAction() {
    try {
      const response = await dispatch(GetAttendanceDataActionByIdAndDate());
      const todayRecords = response;
      setIsLoading(false);

      const breakInArray = [];
      const breakOutArray = [];

      todayRecords.forEach((entry) => {
        if (entry.type === "clock_in") {
          setCheckInTime(convertTo12HourFormat(entry.time));
          setCheckInDisabled(true);
          setCheckOutDisabled(false);
          setBreakInDisabled(false);
        } else if (entry.type === "clock_out") {
          setCheckOutTime(convertTo12HourFormat(entry.time));
          setCheckOutDisabled(true);
          setCheckInDisabled(true);
          setBreakInDisabled(true);
          setBreakOutDisabled(true);
        } else if (entry.type === "break_in") {
          breakInArray.push(convertTo12HourFormat(entry.time));
          setBreakInDisabled(true);
          setBreakOutDisabled(false);
          setCheckOutDisabled(true);
        } else if (entry.type === "break_out") {
          breakOutArray.push(convertTo12HourFormat(entry.time));
          setBreakOutDisabled(true);
          setBreakInDisabled(false);
          setCheckOutDisabled(false);
        }
        if (entry.total_break > 0) {

          setTotalBreakDuration(formatDuration(entry.total_break));
        }
        if (entry.total_work > 0) {
          setTotalWorkDuration(formatDuration(entry.total_work));
        }
      });

      setBreakInTimes(breakInArray);
      setBreakOutTimes(breakOutArray);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      toast.error("Failed to fetch attendance records. Please refresh.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    performDataAction();
  }, []);

  /* Compute Break Data */
  const breaksData = useMemo(() => {
    function parseTimeToMinutes(timeStr) {
      if (!timeStr || timeStr === "--:--") return null;
      const [timee, period] = timeStr.trim().split(" ");
      const [hoursStr, minutesStr] = timee.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    }

    return breakInTimes.map((breakIn, index) => {
      const breakOut = breakOutTimes[index];
      const inMinutes = parseTimeToMinutes(breakIn);
      const outMinutes = parseTimeToMinutes(breakOut);
      let totalBreak = "--:--";
      if (inMinutes != null && outMinutes != null && outMinutes > inMinutes) {
        totalBreak = formatDuration(outMinutes - inMinutes);
      }

      return {
        break_in: breakIn,
        break_out: breakOut || "--:--",
        total_break: totalBreak,
      };
    });
  }, [breakInTimes, breakOutTimes]);

  /* Action handlers */
  const handleAction = (action) => {
    setModalAction(action);
    setModalVisible(true);
  };

  const confirmAction = async () => {
    setModalVisible(false);
    setDisableButton(false);
    setIsLoading(true);

    const localTime = new Intl.DateTimeFormat("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).format(new Date());

    const payload = {
      user_id: userId,
      user_name: userName,
      date: currentDate,
      time: localTime,
      type: modalAction,
    };

    try {
      const response = await dispatch(submitAttendanceAction(payload));
      const resData = response?.data || response;

      if (resData?.status === "success") {
        if (modalAction === "clock_in") {
          setCheckInTime(convertTo12HourFormat(localTime));
          setCheckInDisabled(true);
          setCheckOutDisabled(false);
          setBreakInDisabled(false);
          toast.success("Checked in successfully!");
        } else if (modalAction === "clock_out") {
          setCheckOutTime(convertTo12HourFormat(localTime));
          setCheckOutDisabled(true);
          setBreakInDisabled(true);
          setBreakOutDisabled(true);
          toast.success("Checked out successfully!");
        } else if (modalAction === "break_in") {
          setBreakInDisabled(true);
          setBreakOutDisabled(false);
          setCheckOutDisabled(true);
          toast.info("Break started successfully!");
        } else if (modalAction === "break_out") {
           setBreakOutDisabled(true);
          setBreakInDisabled(false);
          setCheckOutDisabled(false);
          toast.info("Break ended successfully!");
        }
        performDataAction();
      } else {
        toast.error(resData?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Frontend API Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ============================= RENDER ============================= */

  return (
    <>
      <div className="bg-gray-50 p-sm-2 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-start justify-center bg-white/60 z-10">
            <LoaderSpiner />
          </div>
        )}

        {/* Button Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => handleAction("clock_in")}
            disabled={isLoading || checkInDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-between transition-opacity ${isLoading || checkInDisabled || disableButton
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
              }`}
          >
            <div>
              <p className="text-xl font-semibold">
                {checkInTime || <LiveClock />}
              </p>
              <p className="text-sm opacity-90">Check In</p>
            </div>
            <LogIn size={28} />
          </button>

          <button
            onClick={() => handleAction("clock_out")}
            disabled={checkOutDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-between transition-opacity ${checkOutDisabled || disableButton
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
              }`}
          >
            <div>
              <p className="text-xl font-semibold">
                {checkOutTime || <LiveClock />}
              </p>
              <p className="text-sm opacity-90">Check Out</p>
            </div>
            <LogOut size={28} />
          </button>

          <button
            onClick={() => handleAction("break_in")}
            disabled={breakInDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-indigo-500 to-blue-400 flex items-center justify-between transition-opacity ${breakInDisabled || disableButton
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
              }`}
          >
            <div>
              <p className="text-xl font-semibold">
                <LiveClock />
              </p>
              <p className="text-sm opacity-90">Break In</p>
            </div>
            <Coffee size={28} />
          </button>

          <button
            onClick={() => handleAction("break_out")}
            disabled={breakOutDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-red-500 to-pink-400 flex items-center justify-between transition-opacity ${breakOutDisabled || disableButton
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
              }`}
          >
            <div>
              <p className="text-xl font-semibold">
                <LiveClock />
              </p>
              <p className="text-sm opacity-90">Break Out</p>
            </div>
            <Coffee size={28} />
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-3 relative">
          <DataGrid
            dataSource={
              checkInTime || checkOutTime
                ? [
                  {
                    clock_in: checkInTime,
                    clock_out: checkOutTime,
                    total_work: totalWorkDuration,
                    breaks: breaksData,
                  },
                ]
                : []
            }
            showBorders
            columnAutoWidth
            wordWrapEnabled
            height="auto"
          >
            <Column dataField="clock_in" caption="Check In" />
            <Column dataField="clock_out" caption="Check Out" />
            <Column dataField="total_work" caption="Total Work" />
            <MasterDetail
              enabled
              component={({ data }) => {
                const breaks = data.data.breaks || [];
                const totalBreakMinutes = breaks.reduce((sum, b) => {
                  if (!b.total_break.includes(":")) return sum;
                  const [h, m] = b.total_break.split(":").map(Number);
                  return sum + (h * 60 + m);
                }, 0);

                const totalFormatted = formatDuration(totalBreakMinutes);
                return (
                  <div className="p-2 bg-gray-50 rounded-md">
                    <DataGrid
                      dataSource={breaks}
                      columnAutoWidth
                      showBorders
                      wordWrapEnabled
                      noDataText="No breaks recorded"
                    >
                      <Column dataField="break_in" caption="Break In" />
                      <Column dataField="break_out" caption="Break Out" />
                      <Column dataField="total_break" caption="Break Duration" />
                    </DataGrid>

                    <div className="flex justify-end mt-2 pr-4">
                      <div className="text-sm font-semibold text-gray-700">
                        Total Break:{" "}
                        <span className="text-red-600">{totalFormatted}</span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </DataGrid>
        </div>

        {/* Modal */}
        <Modal show={modalVisible} onHide={() => setModalVisible(false)} centered>
          <div className="text-center p-4">
            <i
              className="bi bi-patch-question"
              style={{ fontSize: "80px", color: "red", marginBottom: "20px" }}
            ></i>
            <Modal.Body>
              Are you sure you want to proceed with{" "}
              {modalAction ? modalAction.replace("_", " ") : ""}?
            </Modal.Body>
            <Button
              className="mb-4 me-3"
              variant="secondary"
              onClick={() => setModalVisible(false)}
            >
              Cancel
            </Button>
            <Button className="mb-4" variant="primary" onClick={confirmAction}>
              Confirm
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MarkAttendance;
