import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import "../styles/CalendarModal.scss";

function CalendarModal({ friend, onClose, onJoinCalendars }) {
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const [selectedColor, setSelectedColor] = useState("#81d4fa"); // Default color for events
  const navigate = useNavigate();

  const handleViewChange = (event) => {
    setCurrentView(event.target.value);
  };

  const handleJoinCalendars = () => {
    if (window.confirm(`Join ${friend.name}'s calendar with events in color ${selectedColor}?`)) {
      onJoinCalendars(friend.id, selectedColor); // Add events to user's calendar
      navigate("/calendar"); // Redirect to the main calendar page
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{friend.name}'s Calendar</h2>
        </div>

        <div className="calendar-view-switcher">
          <label htmlFor="view-select">View: </label>
          <select
            id="view-select"
            value={currentView}
            onChange={handleViewChange}
          >
            <option value="timeGridDay">Day</option>
            <option value="timeGridWeek">Week</option>
            <option value="dayGridMonth">Month</option>
          </select>
        </div>

        <div className="calendar-container">
          <Calendar
            userId={friend.id}
            isEditable={false}
            currentView={currentView}
          />
        </div>

        <div className="color-picker">
          <label htmlFor="event-color">Event Color: </label>
          <input
            type="color"
            id="event-color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button className="close-modal-button" onClick={onClose}>
            Close
          </button>
          <button className="join-calendars-button" onClick={handleJoinCalendars}>
            Join Calendars
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarModal;