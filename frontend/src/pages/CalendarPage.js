import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import "../styles/CalendarPage.scss";

function CalendarPage() {
  const userId = "alex"; // Replace with dynamic user ID from authentication or state
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = () => {
      const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
      const userEvents = allCalendars[userId]?.events || [];

      // Merge friend's events, keeping their colors intact
      const friendsEvents = Object.entries(allCalendars)
        .filter(([key]) => key !== userId) // Exclude the current user
        .flatMap(([key, calendar]) => calendar.events);

      setEvents([...userEvents, ...friendsEvents]);
    };

    loadEvents();
  }, [userId]);

  const handleEventsChange = (updatedEvents) => {
    setEvents(updatedEvents);

    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    allCalendars[userId] = { events: updatedEvents };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
  };

  return (
    <div className="calendar-page">
      <NavBar />
      <div className="calendar-content">
        <Sidebar events={events} />
        <div className="calendar-wrapper">
          <h1>My Calendar</h1>
          <Calendar
            userId={userId}
            isEditable={true}
            currentView="timeGridWeek"
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