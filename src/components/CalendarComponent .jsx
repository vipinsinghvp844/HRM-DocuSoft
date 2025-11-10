import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import dayjs from "dayjs";
import api from "./api";
import Spinner from "./LoaderSpiner";
import { useDispatch, useSelector } from "react-redux";
import { GetHolidayAction } from "../../redux/actions/EmployeeDetailsAction";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [HoliDayData, setHoliDayData] = useState({
    holiday_name: "",
    holiday_date: "",
    description: "",
    holiday_type: "Public Holiday",
    repeat_annually: false,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const userRole = localStorage.getItem("role");
  const dispatch = useDispatch();
  const { TotalHolidays } = useSelector(
    ({ EmployeeDetailReducers }) => EmployeeDetailReducers
  );

  useEffect(() => {
    if (TotalHolidays && TotalHolidays.length > 0) {
      const formatted = TotalHolidays.map((holiday) => ({
        id: holiday.id,
        title: holiday.holiday_name,
        start: holiday.holiday_date,
        end:
          holiday.holiday_end_date && holiday.holiday_end_date !== "0000-00-00"
            ? dayjs(holiday.holiday_end_date).add(1, "day").format("YYYY-MM-DD")
            : holiday.holiday_date,
        extendedProps: {
          type: holiday.holiday_type,
          description: holiday.description,
          repeat: holiday.repeat_annually,
        },
      }));
      setEvents(formatted);
    } else {
      setEvents([]);
    }
  }, [TotalHolidays]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHoliDayData({
      ...HoliDayData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateClick = (info) => {
    if (["admin", "hr"].includes(userRole)) {
      setHoliDayData((prev) => ({ ...prev, holiday_date: info.dateStr }));
      setOpenModal(true);
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setViewModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post(`${import.meta.env.VITE_API_HOLIDAYS}`, HoliDayData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authtoken")}` },
      });
      await dispatch(GetHolidayAction());
      setOpenModal(false);
      setHoliDayData({
        holiday_name: "",
        holiday_date: "",
        description: "",
        holiday_type: "Public Holiday",
        repeat_annually: false,
      });
    } catch (err) {
      console.error("Error adding holiday:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(
        `${import.meta.env.VITE_API_HOLIDAYS}/${selectedEvent.id}`,
        HoliDayData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authtoken")}` },
        }
      );
      await dispatch(GetHolidayAction());
      setEditModal(false);
    } catch (err) {
      console.error("Error updating holiday:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) return;
    setIsLoading(true);
    try {
      await api.delete(`${import.meta.env.VITE_API_HOLIDAYS}/${selectedEvent.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authtoken")}` },
      });
      await dispatch(GetHolidayAction());
      setViewModal(false);
    } catch (err) {
      console.error("Error deleting holiday:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const eventClassNames = (arg) => {
    const type = arg.event.extendedProps.type;
    if (type === "Public Holiday") return "bg-red-500 text-white rounded-md";
    if (type === "Company Holiday") return "bg-blue-500 text-white rounded-md";
    return "bg-green-500 text-white rounded-md";
  };

  const eventDidMount = (info) => {
    const startDate = dayjs(info.event.start).format("DD MMM YYYY");
    const endDate = info.event.end
      ? dayjs(info.event.end).subtract(1, "day").format("DD MMM YYYY")
      : null;

    const dateRange = endDate && endDate !== startDate
      ? `${startDate} → ${endDate}`
      : startDate;

    tippy(info.el, {
      content: `
      <div style="text-align: left;">
        <strong>${info.event.title}</strong><br/>
        📅 <b>${dateRange}</b><br/>
        🏷️ ${info.event.extendedProps.type}<br/>
        📝 ${info.event.extendedProps.description || "No description"}
      </div>
    `,
      allowHTML: true,
      theme: "light-border",
    });
  };


  const filteredEvents =
    filterType === "All"
      ? events
      : events.filter((e) => e.extendedProps.type === filterType);

  return (
    <div className="min-h-screen bg-gray-50 p-1 sm:p-1">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          📅 Holiday Calendar
        </h2>
        <select
          className="w-full sm:w-60 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Holidays</option>
          <option value="Public Holiday">Public Holidays</option>
          <option value="Company Holiday">Company Holidays</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-1 sm:p-1 relative">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Spinner />
          </div>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={["admin", "hr"].includes(userRole)}
            eventResizableFromStart={true}
            events={filteredEvents}
            dateClick={handleDateClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            dayCellDidMount={(info) => {
              const day = info.date.getDay();
              if (day === 0) {
                info.el.style.backgroundColor = "#ffeaea";
                info.el.style.color = "#b30000";
                info.el.style.borderRadius = "6px";
              }
            }}
            eventClick={handleEventClick}
            eventClassNames={eventClassNames}
            eventDidMount={eventDidMount}
            eventDrop={async (info) => {
              try {
                await api.put(
                  `${import.meta.env.VITE_API_HOLIDAYS}/${info.event.id}`,
                  {
                    holiday_name: info.event.title,
                    holiday_date: info.event.startStr,
                    description: info.event.extendedProps.description,
                    holiday_type: info.event.extendedProps.type,
                    repeat_annually: info.event.extendedProps.repeat,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "authtoken"
                      )}`,
                    },
                  }
                );
                await dispatch(GetHolidayAction());
              } catch (error) {
                console.error("Error updating holiday date:", error);
                info.revert(); // revert back if API fails
              }
            }}
            //multi day event
            eventResize={async (info) => {
              try {
                const adjustedEnd = info.event.end
                  ? dayjs(info.event.end).subtract(1, "day").format("YYYY-MM-DD")
                  : info.event.startStr;
                await api.put(
                  `${import.meta.env.VITE_API_HOLIDAYS}/${info.event.id}`,
                  {
                    holiday_name: info.event.title,
                    holiday_date: info.event.startStr,
                    holiday_end_date: adjustedEnd, // NEW field for multi-day
                    description: info.event.extendedProps.description,
                    holiday_type: info.event.extendedProps.type,
                    repeat_annually: info.event.extendedProps.repeat,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "authtoken"
                      )}`,
                    },
                  }
                );
                await dispatch(GetHolidayAction());
              } catch (error) {
                console.error("Error resizing holiday:", error);
                info.revert();
              }
            }}
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      {(openModal || editModal) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">
              {openModal ? "Add Holiday" : "Edit Holiday"}
            </h3>
            <form
              onSubmit={openModal ? handleSubmit : handleUpdate}
              className="space-y-3"
            >
              <input
                type="text"
                name="holiday_name"
                placeholder="Holiday Title"
                value={HoliDayData.holiday_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={HoliDayData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="holiday_type"
                value={HoliDayData.holiday_type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Public Holiday">Public Holiday</option>
                <option value="Company Holiday">Company Holiday</option>
                <option value="Other">Other</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="repeat_annually"
                  checked={HoliDayData.repeat_annually}
                  onChange={handleInputChange}
                />
                <span>Repeat Annually</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(false);
                    setEditModal(false);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isLoading
                    ? openModal
                      ? "Adding..."
                      : "Updating..."
                    : openModal
                      ? "Add Holiday"
                      : "Update Holiday"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-3">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-1">📅 {selectedEvent.startStr}</p>
            <p className="text-gray-600 mb-1">🏷️ {selectedEvent.extendedProps.type}</p>
            <p className="text-gray-600 mb-2">
              📝 {selectedEvent.extendedProps.description || "No description"}
            </p>
            {selectedEvent.extendedProps.repeat === "1" && (
              <p className="text-green-600 mb-3">🔁 Repeats Annually</p>
            )}

            {["admin", "hr"].includes(userRole) && (
              <div className="flex justify-end gap-2 pt-3">
                <button
                  onClick={() => {
                    setHoliDayData({
                      holiday_name: selectedEvent.title,
                      holiday_date: selectedEvent.startStr,
                      description: selectedEvent.extendedProps.description || "",
                      holiday_type: selectedEvent.extendedProps.type,
                      repeat_annually: selectedEvent.extendedProps.repeat || false,
                    });
                    setViewModal(false);
                    setEditModal(true);
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setViewModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
