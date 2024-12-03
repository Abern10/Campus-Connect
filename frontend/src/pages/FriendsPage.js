import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AddFriendModal from "../components/AddFriendModal";
import CalendarModal from "../components/CalendarModal";
import ToggleSwitch from "../components/ToggleSwitch";
import "../styles/FriendsPage.scss";

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Load friends from localStorage on component mount
  useEffect(() => {
    const storedFriends = localStorage.getItem("friends");
    if (storedFriends) {
      setFriends(JSON.parse(storedFriends));
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

    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    if (!allCalendars[friend.id]) {
      allCalendars[friend.id] = { events: [] };
      localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    }

    setIsModalOpen(false);
    alert(`${friend.name} is now your friend!`);
  };

  const handleJoinCalendars = (friendId, color) => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    const userCalendar = allCalendars["currentUserId"]?.events || [];
    const friendCalendar = allCalendars[friendId]?.events || [];

    const updatedCalendar = [
      ...userCalendar,
      ...friendCalendar.map((event) => ({
        ...event,
        id: `${friendId}-${event.id}`, // Ensure unique IDs
        title: `${event.title} (From ${friends.find((f) => f.id === friendId)?.name})`, // Add friend's name
        backgroundColor: color, // Use the selected color
      })),
    ];

    allCalendars["currentUserId"] = { events: updatedCalendar };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    alert("Calendars successfully joined!");
  };

  const handleRightClick = (event, friend) => {
    event.preventDefault();
    if (window.confirm(`Delete ${friend.name} from your friends?`)) {
      const updatedFriends = friends.filter((f) => f.id !== friend.id);
      setFriends(updatedFriends);
      localStorage.setItem("friends", JSON.stringify(updatedFriends));

      // Remove calendar data for the friend
      const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
      delete allCalendars[friend.id];
      localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    }
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
              onContextMenu={(e) => handleRightClick(e, friend)}
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
        <CalendarModal
          friend={selectedFriend}
          onClose={closeFriendCalendar}
          onJoinCalendars={handleJoinCalendars} // Pass the join calendars handler
        />
      )}
      {isModalOpen && (
        <AddFriendModal
          onClose={() => setIsModalOpen(false)}
          onAddFriend={addFriend}
        />
      )}
      <Footer />
    </div>
  );
}

export default FriendsPage;