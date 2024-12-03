import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./AddEventModal";
import "../styles/Calendar.scss";

function Calendar({ userId, isEditable = true, onEventsChange }) {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const calendarRef = useRef(null);

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    if (allCalendars[userId]) {
      setEvents(allCalendars[userId].events);
    }
  }, [userId]);

  // Add a new event to the calendar
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

    // Notify parent component (if provided) of the new events
    if (onEventsChange) {
      onEventsChange(updatedEvents);
    }
  };

  // Change the calendar view (e.g., daily, weekly, monthly)
  const handleViewChange = (newView) => {
    setCurrentView(newView);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
  };

  return (
    <div className="calendar-wrapper">
      {isEditable && (
        <div className="calendar-header">
          <div className="left-section">
            <select
              className="view-switcher"
              value={currentView}
              onChange={(e) => handleViewChange(e.target.value)}
            >
              <option value="timeGridDay">Daily</option>
              <option value="timeGridWeek">Weekly</option>
              <option value="dayGridMonth">Monthly</option>
            </select>
          </div>
          <div className="right-section">
            <button onClick={() => setModalOpen(true)} className="add-event-button">
              Add Event
            </button>
          </div>
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
        initialView={currentView}
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

              // Notify parent component (if provided) of the updated events
              if (onEventsChange) {
                onEventsChange(updatedEvents);
              }
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