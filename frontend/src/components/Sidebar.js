import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../styles/Sidebar.scss";

function Sidebar({ events, onCreateGroup }) {
  const [todayEvents, setTodayEvents] = useState([]);

  useEffect(() => {
    const updateTodayEvents = () => {
      const today = new Date();
      const todayDateString = today.toISOString().split("T")[0];

      // Include all events that overlap with today (start or span into today)
      const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.start).toISOString().split("T")[0];
        return eventDate === todayDateString;
      });

      // Sort events by start time
      const sortedEvents = filteredEvents.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );

      setTodayEvents(sortedEvents);
    };

    updateTodayEvents();
  }, [events]);

  const handleMouseEnter = (info) => {
    const tooltip = document.createElement("div");
    tooltip.innerText = `${info.event.title} \n ${new Date(
      info.event.start
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    tooltip.style.position = "absolute";
    tooltip.style.background = "white";
    tooltip.style.padding = "5px";
    tooltip.style.border = "1px solid #ccc";
    tooltip.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
    tooltip.style.zIndex = "1000";
    tooltip.className = "mini-calendar-tooltip";
    document.body.appendChild(tooltip);

    const moveTooltip = (event) => {
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    };

    const removeTooltip = () => {
      if (tooltip.parentNode) {
        document.body.removeChild(tooltip);
      }
      info.el.removeEventListener("mousemove", moveTooltip);
      info.el.removeEventListener("mouseleave", removeTooltip);
    };

    info.el.addEventListener("mousemove", moveTooltip);
    info.el.addEventListener("mouseleave", removeTooltip);
  };

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
          events={events.map((event) => ({
            ...event,
            backgroundColor: event.backgroundColor, // Use event color
          }))}
          eventMouseEnter={handleMouseEnter}
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
    </div>
  );
}

export default Sidebar;