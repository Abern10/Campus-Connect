// src/components/CalendarModal.js

import React from "react";
import Calendar from "./Calendar"; 
import "../styles/CalendarModal.scss";

function CalendarModal({ friend, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{friend.name}'s Calendar</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="calendar-container">
                    <Calendar userId={friend.id} isEditable={false} />
                </div>
                <div className="modal-footer">
                    <button className="close-modal-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalendarModal;