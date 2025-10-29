import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { Form, Modal, Button, Card, Spinner } from "react-bootstrap";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import dayjs from "dayjs";
import api from "./api";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [editModal, setEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [HoliDayData, setHoliDayData] = useState({
    holiday_name: "",
    holiday_date: "",
    description: "",
    holiday_type: "Public Holiday",
    repeat_annually: false,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const userRole = localStorage.getItem("role"); // "admin" | "hr" | "employee"

  // fetch holidays
  const fetchHolidays = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`${import.meta.env.VITE_API_HOLIDAYS}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });

     const formattedEvents = response?.data?.map((holiday) => ({
       id: holiday.id,
       title: holiday.holiday_name,
       start: holiday.holiday_date,
       end: holiday.holiday_end_date
         ? dayjs(holiday.holiday_end_date).add(1, "day").format("YYYY-MM-DD")
         : holiday.holiday_date,
       extendedProps: {
         type: holiday.holiday_type,
         description: holiday.description,
         repeat: holiday.repeat_annually,
       },
     }));


      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const modalClose = () => setOpenModal(false);
  const viewModalClose = () => {
    setViewModal(false);
    setSelectedEvent(null);
  };

  const editModalClose = () => {
    setEditModal(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHoliDayData({
      ...HoliDayData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateClick = (info) => {
    if (userRole === "admin" || userRole === "hr") {
      setHoliDayData((prev) => ({ ...prev, holiday_date: info.dateStr }));
      setOpenModal(true);
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setViewModal(true);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await api.post(`${import.meta.env.VITE_API_HOLIDAYS}`, HoliDayData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });
      fetchHolidays();
      setOpenModal(false);
      setHoliDayData({
        holiday_name: "",
        holiday_date: "",
        description: "",
        holiday_type: "Public Holiday",
        repeat_annually: false,
      });
    } catch (error) {
      console.error("Error adding holiday:", error);
    } finally {
      setIsLoading(false);
    }
  };
  //update holiday
  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await api.put(
        `${import.meta.env.VITE_API_HOLIDAYS}/${selectedEvent.id}`,
        HoliDayData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      fetchHolidays();
      editModalClose();
    } catch (error) {
      console.error("Error updating holiday:", error);
    } finally {
      setIsLoading(false);
    }
  };
  //delete holi day
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this holiday?"))
      return;
    setIsLoading(true);
    try {
      await api.delete(
        `${import.meta.env.VITE_API_HOLIDAYS}/${selectedEvent.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      fetchHolidays();
      viewModalClose();
    } catch (error) {
      console.error("Error deleting holiday:", error);
    } finally {
      setIsLoading(false);
    }
  };
  //  Event styling by type
  const eventClassNames = (arg) => {
    const type = arg.event.extendedProps.type;
    if (type === "Public Holiday") return "bg-danger text-white rounded px-1";
    if (type === "Company Holiday") return "bg-primary text-white rounded px-1";
    return "bg-success text-white rounded px-1";
  };

  //  Tooltip on hover
  const eventDidMount = (info) => {
    tippy(info.el, {
      content: `
        <strong>${info.event.title}</strong><br/>
        📅 ${info.event.startStr}<br/>
        🏷️ ${info.event.extendedProps.type}<br/>
        📝 ${info.event.extendedProps.description || "No description"}
      `,
      allowHTML: true,
      theme: "light-border",
    });
  };

  //  Filtered events
  const filteredEvents =
    filterType === "All"
      ? events
      : events.filter((e) => e.extendedProps.type === filterType);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">📅 Holiday Calendar</h4>
        <Form.Select
          style={{ width: "200px" }}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Holidays</option>
          <option value="Public Holiday">Public Holidays</option>
          <option value="Company Holiday">Company Holidays</option>
          <option value="Other">Other</option>
        </Form.Select>
      </div>

      <div className="calendar-container">
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
              fetchHolidays();
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
              fetchHolidays();
            } catch (error) {
              console.error("Error resizing holiday:", error);
              info.revert();
            }
          }}
        />
      </div>

      {/* Add Holiday Modal */}
      <Modal show={openModal} onHide={modalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Holiday Title</Form.Label>
              <Form.Control
                type="text"
                name="holiday_name"
                value={HoliDayData.holiday_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={HoliDayData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Holiday Type</Form.Label>
              <Form.Select
                name="holiday_type"
                value={HoliDayData.holiday_type}
                onChange={handleInputChange}
              >
                <option value="Public Holiday">Public Holiday</option>
                <option value="Company Holiday">Company Holiday</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Repeat Annually"
              name="repeat_annually"
              checked={HoliDayData.repeat_annually}
              onChange={handleInputChange}
            />
            <div className="mt-3 text-end">
              <Button variant="secondary" onClick={modalClose}>
                Cancel
              </Button>{" "}
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Adding...
                  </>
                ) : (
                  "Add Holiday"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Event Card Modal */}
      <Modal show={viewModal} onHide={viewModalClose} centered>
        <Modal.Body>
          {selectedEvent && (
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Body>
                <h4 className="mb-2">{selectedEvent.title}</h4>
                <p className="text-muted mb-1">📅 {selectedEvent.startStr}</p>
                <p className="mb-1">🏷️ {selectedEvent.extendedProps.type}</p>
                <p>
                  📝{" "}
                  {selectedEvent.extendedProps.description ||
                    "No description available"}
                </p>
                {selectedEvent.extendedProps.repeat && (
                  <p className="text-success">🔁 Repeats Annually</p>
                )}

                {["admin", "hr"].includes(userRole) && (
                  <div className="mt-3 d-flex justify-content-end gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setHoliDayData({
                          holiday_name: selectedEvent.title,
                          holiday_date: selectedEvent.startStr,
                          description:
                            selectedEvent.extendedProps.description || "",
                          holiday_type: selectedEvent.extendedProps.type,
                          repeat_annually:
                            selectedEvent.extendedProps.repeat || false,
                        });
                        setViewModal(false);
                        setEditModal(true);
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Editing...
                        </>
                      ) : (
                        "Edit Holiday"
                      )}
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleDelete}>
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Deleting...
                        </>
                      ) : (
                        "Delete Holiday"
                      )}
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit Holiday Modal */}
      <Modal show={editModal} onHide={editModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Holiday Title</Form.Label>
              <Form.Control
                type="text"
                name="holiday_name"
                value={HoliDayData.holiday_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={HoliDayData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Holiday Type</Form.Label>
              <Form.Select
                name="holiday_type"
                value={HoliDayData.holiday_type}
                onChange={handleInputChange}
              >
                <option value="Public Holiday">Public Holiday</option>
                <option value="Company Holiday">Company Holiday</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Repeat Annually"
              name="repeat_annually"
              checked={HoliDayData.repeat_annually}
              onChange={handleInputChange}
            />
            <div className="mt-3 text-end">
              <Button variant="secondary" onClick={editModalClose}>
                Cancel
              </Button>{" "}
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CalendarComponent;
