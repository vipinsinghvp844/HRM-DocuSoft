import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for drag & drop
import axios from "axios";
import { Form, Modal } from "react-bootstrap";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [HoliDayData, setHoliDayData] = useState({
    holiday_name: "holidayName",

  })

  // fetch holidays from backend
  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_HOLIDAYS}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });

      // map API holidays -> calendar events
      const formattedEvents = response.data.map((holiday) => ({
        title: holiday.holiday_name,
        date: holiday.holiday_date,
        extendedProps: {
          type: holiday.holiday_type,
          description: holiday.description,
        },
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const modalClose = () => {
    setOpenModal(false);
    // setSelectedEmployeeId(null);
  };

  // when user clicks a date
  const handleDateClick = async (info) => {
    setOpenModal(true);
    // const title = prompt("Holiday/Event Title:");
    // const description = prompt("Holiday/Description");
    // const HolidayType = prompt("Holiday/Type");
  };

  const handleSubmit = async () => {
    e.preventDefault();
    if (title) {
      const newHoliday = {
        holiday_name: title,
        holiday_date: info.dateStr,
        holiday_type: HolidayType,
        description: description,
        repeat_annually: false,
      };

      try {
        await axios.post(`${import.meta.env.VITE_API_HOLIDAYS}`, newHoliday, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });
        fetchHolidays(); // refresh after adding
      } catch (error) {
        console.error("Error adding holiday:", error);
      }
    }
  };

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={false}
          events={events}
          dateClick={handleDateClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={(info) => {
            alert(
              `Holiday: ${info.event.title}\nType: ${info.event.extendedProps.type}\nDescription: ${info.event.extendedProps.description}`
            );
          }}
        />
      </div>
      <Modal show={openModal} onHide={modalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>Holiday Title</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={"title"}
                onChange={"handleInputChange"}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CalendarComponent;
