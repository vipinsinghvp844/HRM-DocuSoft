import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderSpiner from "./LoaderSpiner";
import {
  GetAttendanceDataActionByIdAndDate,
  submitAttendanceAction,
} from "../../redux/actions/EmployeeDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import { Coffee, LogIn, LogOut } from "lucide-react";
import "../App.css";

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);

  return `${padZero(hours)}:${padZero(mins)}`;
};

const padZero = (num) => num.toString().padStart(2, "0");

const MarkAttendance = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [breakInTime, setBreakInTime] = useState(null);
  const [breakOutTime, setBreakOutTime] = useState(null);
  const [checkInDisabled, setCheckInDisabled] = useState(false);
  const [checkOutDisabled, setCheckOutDisabled] = useState(true);
  const [breakInDisabled, setBreakInDisabled] = useState(true);
  const [breakOutDisabled, setBreakOutDisabled] = useState(true);
  const [totalBreakDuration, setTotalBreakDuration] = useState(0);
  const [totalWorkDuration, setTotalWorkDuration] = useState(0);
  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("user_name");
  const userRole = localStorage.getItem("role");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [breakInTimes, setBreakInTimes] = useState([]);
  const [breakOutTimes, setBreakOutTimes] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [time, setTime] = useState("");
  const intervalRef = useRef(null);
  const [timeDisabled, setTimeDisabled] = useState(false);

  useEffect(() => {
    setTimeDisabled(true);
    intervalRef.current = setInterval(() => {
      const localTime = new Intl.DateTimeFormat("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(new Date());

      setTime(localTime);
    }, 1000);
    setTimeDisabled(false);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();

  function convertTo12HourFormat(time24) {
    if (!time24) return "--:--";
    let [hours, minutes, seconds] = time24.split(":");
    hours = parseInt(hours, 10);

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes}:${seconds} ${period} `;
  }

  async function performDataAction() {
    try {
      const response = await dispatch(GetAttendanceDataActionByIdAndDate());
      // console.log(response, "Attendance Data");

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

  const handleAction = (action) => {
    setModalAction(action);
    setModalVisible(true);
  };

  const confirmAction = async () => {
    setModalVisible(false);
    setDisableButton(false);
    setIsLoading(true);

    const payload = {
      user_id: userId,
      user_name: userName,
      date: currentDate,
      time: time,
      type: modalAction,
    };

    try {
      const response = await dispatch(submitAttendanceAction(payload));
      const resData = response?.data || response;
      if (resData?.status === "success") {
        if (modalAction === "clock_in") {
          setCheckInTime(time);
          setCheckInDisabled(true);
          setCheckOutDisabled(false);
          setBreakInDisabled(false);
          toast.success("Checked in successfully!");
        } else if (modalAction === "clock_out") {
          setCheckOutTime(time);
          setCheckOutDisabled(true);
          setBreakInDisabled(true);
          setBreakOutDisabled(true);
          toast.success("Checked out successfully!");
        } else if (modalAction === "break_in") {
          setBreakInTime(time);
          setBreakInDisabled(true);
          setBreakOutDisabled(false);
          setCheckOutDisabled(true);
          toast.info("Break started successfully!");
        } else if (modalAction === "break_out") {
          setBreakOutTime(time);
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
      const errorMessage =
        error?.data?.message ||
        error?.data?.data?.message ||
        error?.statusText ||
        "An error occurred. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <div className="min-h-screen bg-gray-50 p-sm-2 relative">

      {isLoading && (
        <div className="absolute inset-0 flex items-start justify-center bg-white/60 z-10">
          <LoaderSpiner />
        </div>
      )}


        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => handleAction("clock_in")}
            disabled={isLoading || checkInDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-between transition-opacity ${isLoading || checkInDisabled || disableButton ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
          >
            <div>
              <p className="text-xl font-semibold">
                {checkInTime || convertTo12HourFormat(time)}
              </p>
              <p className="text-sm opacity-90">Check In</p>
            </div>
            <LogIn size={28} />
          </button>


          <button
            onClick={() => handleAction("clock_out")}
            disabled={checkOutDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-between transition-opacity ${checkOutDisabled || disableButton ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}>
            <div>
              <p className="text-xl font-semibold">{checkOutTime || convertTo12HourFormat(time)}</p>
              <p className="text-sm opacity-90">Check Out</p>
            </div>
            <LogOut size={28} />
          </button>

          <button
            onClick={() => handleAction("break_in")}
            disabled={breakInDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-indigo-500 to-blue-400 flex items-center justify-between transition-opacity ${breakInDisabled || disableButton ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
          >
            <div>
              <p className="text-xl font-semibold">{convertTo12HourFormat(time)}</p>
              <p className="text-sm opacity-90">Break In</p>
            </div>
            <Coffee size={28} />
          </button>

          <button
            onClick={() => handleAction("break_out")}
            disabled={breakOutDisabled || disableButton}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r from-red-500 to-pink-400 flex items-center justify-between transition-opacity ${breakOutDisabled || disableButton ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
          >
            <div>
              <p className="text-xl font-semibold">{convertTo12HourFormat(time)}</p>
              <p className="text-sm opacity-90">Break Out</p>
            </div>
            <Coffee size={28} />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Total Break</p>
              <p className="text-lg font-bold">{totalBreakDuration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Work</p>
              <p className="text-lg font-bold">{totalWorkDuration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check In</p>
              <p className="text-lg font-bold">{checkInTime || "--:--:--"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check Out</p>
              <p className="text-lg font-bold">{checkOutTime || "--:--:--"}</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="py-3 px-4 text-center">Check In</th>
                <th className="py-3 px-4 text-center">Check Out</th>
                <th className="py-3 px-4 text-center">Work Duration</th>
                <th className="py-3 px-4 text-center">Break In</th>
                <th className="py-3 px-4 text-center">Break Out</th>
                <th className="py-3 px-4 text-center">Total Break</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-t">
                <td className="py-3 px-4 text-center">{checkInTime || "--:--:--"}</td>
                <td className="py-3 px-4 text-center">{checkOutTime || "--:--:--"}</td>
                <td className="py-3 px-4 text-center">{totalWorkDuration}</td>

                <td colSpan={2} className="py-3 px-4 text-center colspan-2">{breakInTimes.length > 0
                  ? breakInTimes.map((breakIn, index) => (
                    <p key={index}>
                      {breakIn} - {breakOutTimes[index] || "--:--:--"}
                    </p>
                  ))
                  : "--:--:--"}</td>
                <td className="py-3 px-4 text-center">{totalBreakDuration}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="modaldiv">
          <Modal
            show={modalVisible}
            onHide={() => setModalVisible(false)}
            className="btnmodal"
            centered
          >
            <div className="text-center hellooo">
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
      </div>
    </>
  );
};

export default MarkAttendance;
