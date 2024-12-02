import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../styles/Sidebar.scss";

function Sidebar({ events, onCreateGroup }) {
  const [todayEvents, setTodayEvents] = useState([]);

  useEffect(() => {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0];

    const filteredEvents = events.filter((event) =>
      event.start.startsWith(todayDateString)
    );

    setTodayEvents(filteredEvents);
  }, [events]);

  return (
    <div className="sidebar">
      {/* Mini Calendar */}
      <div className="mini-calendar">
        <h4>{new Date().toLocaleString("default", { month: "long" })}</h4>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false} // Hide the header
          height="300px"
          events={events}
          eventContent={(eventInfo) => (
            <span
              title={eventInfo.event.title}
              style={{
                backgroundColor: eventInfo.event.backgroundColor,
                color: "#fff",
                borderRadius: "4px",
                padding: "0 2px",
                fontSize: "10px",
              }}
            >
              {eventInfo.timeText}
            </span>
          )}
        />
      </div>

      {/* Today's Events */}
      <div className="today-events">
        <h4>Today's Events</h4>
        {todayEvents.length > 0 ? (
          <ul>
            {todayEvents.map((event) => (
              <li key={event.id}>
                <span>
                  {new Date(event.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>{" "}
                - {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events today.</p>
        )}
      </div>

      {/* Create Group Button */}
      <button className="create-group-button" onClick={onCreateGroup}>
        Create Group
      </button>
    </div>
  );
}

export default Sidebar;