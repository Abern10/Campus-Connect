import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./styles/global.scss";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk Frontend API Key. Set REACT_APP_CLERK_FRONTEND_API in your .env file."
  );
}

// Helper to generate random events for demo friends
function generateRandomEvents(startDate, daysCount = 30) {
  const events = [];
  for (let i = 0; i < daysCount; i++) {
    const randomHour = Math.floor(Math.random() * 12) + 8; // Between 8 AM and 8 PM
    const randomMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45 minutes
    const duration = Math.floor(Math.random() * 4) + 1; // 1 to 4 * 15 minutes

    const start = new Date(startDate);
    start.setDate(start.getDate() + i);
    start.setHours(randomHour, randomMinute);

    const end = new Date(start);
    end.setMinutes(start.getMinutes() + duration * 15);

    events.push({
      id: `${i}-${Math.random().toString(36).substring(7)}`,
      title: `Event ${i + 1}`,
      start: start.toISOString(),
      end: end.toISOString(),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
    });
  }
  return events;
}

// Initialize hardcoded demo friends
function initializeDemoFriends() {
  const demoFriends = [
    { id: "friend1", name: "Alice Demo", imageUrl: "https://via.placeholder.com/40" },
    { id: "friend2", name: "Bob Demo", imageUrl: "https://via.placeholder.com/40" },
    { id: "friend3", name: "Charlie Demo", imageUrl: "https://via.placeholder.com/40" },
  ];

  const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
  const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
  const startDate = new Date();

  // Add demo friends only if they are not already added
  demoFriends.forEach((demoFriend) => {
    const isFriendExists = storedFriends.some((friend) => friend.id === demoFriend.id);
    if (!isFriendExists) {
      storedFriends.push(demoFriend);

      // Initialize events for the demo friend
      if (!allCalendars[demoFriend.id]) {
        allCalendars[demoFriend.id] = { events: generateRandomEvents(startDate) };
      }
    }
  });

  // Save updated friends and calendars to localStorage
  localStorage.setItem("friends", JSON.stringify(storedFriends));
  localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
}

// Initialize app data only once
initializeDemoFriends();

// Render the app
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => window.location.replace(to)}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);