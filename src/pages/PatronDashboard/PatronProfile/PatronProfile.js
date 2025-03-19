import React from "react";
import "./PatronProfile.scss";
import PatronHeader from "../../../components/PatronHeader/PatronHeader.js";

const PatronProfile = () => {
  // Placeholder data (replace with actual logic to fetch bookings)
  const bookings = [
    { id: 1, roomName: "Study Room A", date: "2025-03-20", status: "Upcoming" },
    {
      id: 2,
      roomName: "Conference Room B",
      date: "2025-03-15",
      status: "Past",
    },
  ];

  return (
    <>
      <PatronHeader />
      <div className="patron-profile-container">
        <h2>My Bookings</h2>
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <h3>{booking.roomName}</h3>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PatronProfile;
