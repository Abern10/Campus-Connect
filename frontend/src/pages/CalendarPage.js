import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import "../styles/CalendarPage.scss";

function CalendarPage() {
  const userId = "alex"; // Hardcoded for testing
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    if (allCalendars[userId]) {
      setEvents(allCalendars[userId].events);
    }
  }, [userId]);

  const handleEventsChange = (updatedEvents) => {
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-page">
      <NavBar />
      <div className="calendar-content">
        <Sidebar
          events={events}
          onEventsChange={handleEventsChange}
        />
        <div className="calendar-wrapper">
          <h1>My Calendar</h1>
          <Calendar
            userId={userId}
            events={events}
            onEventsChange={handleEventsChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CalendarPage;