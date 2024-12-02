// src/components/Calendar.js
import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./AddEventModal";
import "../styles/Calendar.scss";

function Calendar({ userId, isEditable = true }) {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Load user events from localStorage
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    if (allCalendars[userId]) {
      setEvents(allCalendars[userId].events);
    }
  }, [userId]);

  const handleAddEvent = (newEvent) => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    const updatedEvents = [
      ...events,
      { ...newEvent, id: Date.now().toString(), backgroundColor: newEvent.color },
    ];

    if (!allCalendars[userId]) {
      allCalendars[userId] = { events: updatedEvents };
    } else {
      allCalendars[userId].events = updatedEvents;
    }

    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-wrapper">
      {isEditable && (
        <div className="calendar-header">
          <button onClick={() => setModalOpen(true)} className="add-event-button">
            Add Event
          </button>
        </div>
      )}

      {isModalOpen && (
        <AddEventModal
          onClose={() => setModalOpen(false)}
          onSave={handleAddEvent}
        />
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        editable={isEditable}
        selectable={isEditable}
        droppable={isEditable}
        headerToolbar={false}
        eventClick={(eventClickInfo) => {
          if (isEditable && window.confirm(`Delete event '${eventClickInfo.event.title}'?`)) {
            const updatedEvents = events.filter(
              (event) => event.id !== eventClickInfo.event.id
            );

            const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
            if (allCalendars[userId]) {
              allCalendars[userId].events = updatedEvents;
              localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
              setEvents(updatedEvents);
            }
          }
        }}
        eventContent={(eventInfo) => (
          <div style={{ backgroundColor: eventInfo.event.backgroundColor }}>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </div>
        )}
      />
    </div>
  );
}

export default Calendar;