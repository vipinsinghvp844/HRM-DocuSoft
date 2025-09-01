import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for drag & drop

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: "Team Meeting", date: "2025-09-01" },
    { title: "Holiday", date: "2025-09-05" },
  ]);

  // when user clicks a date
  const handleDateClick = (info) => {
    const newEvent = { title: "New Event", date: info.dateStr };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default CalendarComponent;
