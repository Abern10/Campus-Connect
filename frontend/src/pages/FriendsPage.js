import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AddFriendModal from "../components/AddFriendModal";
import ToggleSwitch from "../components/ToggleSwitch";
import CalendarModal from "../components/CalendarModal"; // New Component
import "../styles/FriendsPage.scss";

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true); // Track view state
  const [selectedFriend, setSelectedFriend] = useState(null); // Track selected friend for the modal

  useEffect(() => {
    const storedFriends = localStorage.getItem("friends");
    if (storedFriends) {
      setFriends(JSON.parse(storedFriends)); // Parse and set the friends list
    }
  }, []);

  const openFriendCalendar = (friend) => {
    setSelectedFriend(friend);
  };

  const closeFriendCalendar = () => {
    setSelectedFriend(null);
  };

  const addFriend = (friend) => {
    const updatedFriends = [...friends, friend];
    setFriends(updatedFriends);
    localStorage.setItem("friends", JSON.stringify(updatedFriends));

    // Check if friend exists in `all-calendars`, add them if not
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    if (!allCalendars[friend.id]) {
      allCalendars[friend.id] = {
        events: [], // Initialize with an empty event list
      };
      localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    }

    // Close the modal and show an alert
    setIsModalOpen(false);
    alert(`${friend.name} is now your friend!`);
  };

  return (
    <div className="friends-page">
      <NavBar />
      <main className="content">
        <div className="header">
          <h1>Your Friends</h1>
          <div className="action-container">
            <ToggleSwitch
              id="viewToggle"
              checked={isGridView}
              onChange={(checked) => setIsGridView(checked)}
              optionLabels={["Grid", "List"]}
            />
            <button
              className="add-friend-button"
              onClick={() => setIsModalOpen(true)}
            >
              Add Friend
            </button>
          </div>
        </div>
        <div
          className={`friends-grid ${isGridView ? "grid-view" : "list-view"}`}
        >
          {friends.map((friend) => (
            <div
              className="friend-card"
              key={friend.id}
              onClick={() => openFriendCalendar(friend)}
            >
              <div className="avatar">
                {friend.imageUrl ? (
                  <img src={friend.imageUrl} alt={friend.name} />
                ) : (
                  <div className="placeholder-avatar">
                    {friend.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <p className="friend-name">{friend.name}</p>
            </div>
          ))}
        </div>
      </main>
      {selectedFriend && (
        <CalendarModal friend={selectedFriend} onClose={closeFriendCalendar} />
      )}
      {isModalOpen && (
        <AddFriendModal onClose={() => setIsModalOpen(false)} onAddFriend={addFriend} />
      )}
      <Footer />
    </div>
  );
}

export default FriendsPage;