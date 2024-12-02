// import React from "react";
// import Calendar from "./Calendar"; 
// import "../styles/CalendarModal.scss";

// function CalendarModal({ friend, onClose }) {
//     const handleJoinCalendars = () => {
//         const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
//         const currentUserId = "alex"; // Simulate the logged-in user
//         const userCalendar = allCalendars[currentUserId]?.events || [];
//         const friendCalendar = allCalendars[friend.id]?.events || [];

//         // Debugging: Log relevant data
//         console.log("All Calendars:", allCalendars);
//         console.log("User Calendar (alex):", userCalendar);
//         console.log(`${friend.name}'s Calendar:`, friendCalendar);

//         if (!friendCalendar.length) {
//             alert(`${friend.name} has no events in their calendar.`);
//             return;
//         }

//         const mergedCalendar = [
//             ...userCalendar,
//             ...friendCalendar.map((event) => ({
//                 ...event,
//                 id: `friend-${event.id}`,
//             })),
//         ];

//         console.log("Merged Calendar:", mergedCalendar); // Log merged data for verification

//         localStorage.setItem("merged-calendar", JSON.stringify(mergedCalendar));
//         window.location.href = "/calendar";
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h2>{friend.name}'s Calendar</h2>
//                     <button className="close-button" onClick={onClose}>
//                         &times;
//                     </button>
//                 </div>
//                 <div className="calendar-container">
//                     <Calendar userId={friend.id} />
//                 </div>
//                 <div className="modal-footer">
//                     <button
//                         className="join-calendars-button"
//                         onClick={handleJoinCalendars}
//                     >
//                         Join Calendars
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CalendarModal;

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