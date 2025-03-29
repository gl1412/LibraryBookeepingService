import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./PatronProfile.scss";
import PatronHeader from "../../../components/PatronHeader/PatronHeader.js";

const PatronProfile = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userEmail = localStorage.getItem("patron");
        if (!userEmail) return;

        // Step 1: Get all rooms
        const roomsSnapshot = await getDocs(collection(db, "rooms"));
        const rooms = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Include room details (like location)
        }));

        // Step 2: Fetch bookings for the user from each room's subcollection
        const today = new Date().toISOString().split("T")[0];

        const bookingPromises = rooms.map(async (room) => {
          const bookingsQuery = query(
            collection(db, `rooms/${room.id}/bookings`),
            where("userEmail", "==", userEmail)
          );
          const snapshot = await getDocs(bookingsQuery);
          return snapshot.docs.map((doc) => ({
            id: doc.id,
            roomId: room.id,
            roomName: room.name, // Get room name
            location: room.location, // Get room location
            ...doc.data(),
          }));
        });

        const allBookings = (await Promise.all(bookingPromises)).flat();

        // Step 3: Separate upcoming and past bookings
        setUpcomingBookings(
          allBookings.filter((booking) => booking.date >= today)
        );
        setPastBookings(allBookings.filter((booking) => booking.date < today));
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <PatronHeader />
      <div className="patron-profile-container">
        <h2>My Bookings</h2>
        {loading ? (
          <p>Loading your bookings...</p>
        ) : (
          <>
            <div className="bookings-section">
              <h3>Upcoming Bookings</h3>
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <div key={booking.id} className="booking-item">
                    <h3>{booking.roomName}</h3>
                    <p>
                      <strong>Location:</strong> {booking.location}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                  </div>
                ))
              ) : (
                <p>No upcoming bookings.</p>
              )}
            </div>

            <div className="bookings-section">
              <h3>Past Bookings</h3>
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <div key={booking.id} className="booking-item">
                    <h3>{booking.roomName}</h3>
                    <p>
                      <strong>Location:</strong> {booking.location}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                  </div>
                ))
              ) : (
                <p>No past bookings.</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PatronProfile;
