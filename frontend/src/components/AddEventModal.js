import React, { useState } from "react";
import "../styles/AddEventModal.scss";

function AddEventModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(15); // Default duration
  const [color, setColor] = useState("#3b82f6"); // Default color

  const handleSave = () => {
    if (title && date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate.getTime() + duration * 60000);

      onSave({
        title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        color,
      });

      onClose();
    } else {
      alert("Please provide a title, date, and duration!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Event</h2>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            {[15, 30, 45, 60, 90, 120].map((min) => (
              <option key={min} value={min}>
                {min} minutes
              </option>
            ))}
          </select>
        </div>
        <div className="form-group color-group">
          <label>Event Color</label>
          <div className="color-picker">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEventModal;