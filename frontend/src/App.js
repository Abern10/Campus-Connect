import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import CalendarPage from "./pages/CalendarPage";
import AboutUsPage from "./pages/AboutUsPage";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is signed in and on the home page
    if (isLoaded && userId && location.pathname === "/") {
      navigate("/calendar"); // Redirect to calendar only if on home page
    }
  }, [isLoaded, userId, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
    </Routes>
  );
}

export default App;