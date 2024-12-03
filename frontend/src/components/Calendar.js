import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/Calendar.scss";

function Calendar({ userId, isEditable = true, currentView = "timeGridWeek", events: propEvents }) {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  // Load events for the given user
  useEffect(() => {
    if (propEvents && propEvents.length > 0) {
      setEvents(propEvents);
    } else {
      const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
      if (allCalendars[userId]) {
        setEvents(allCalendars[userId].events);
      }
    }
  }, [userId, propEvents]);

  const handleEventClick = (info) => {
    if (isEditable && window.confirm(`Delete event '${info.event.title}'?`)) {
      const updatedEvents = events.filter((event) => event.id !== info.event.id);
      setEvents(updatedEvents);

      const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
      if (allCalendars[userId]) {
        allCalendars[userId].events = updatedEvents;
        localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
      }
    }
  };

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        events={events}
        editable={isEditable}
        selectable={isEditable}
        droppable={isEditable}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }} // Toolbar for switching views
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default Calendar;