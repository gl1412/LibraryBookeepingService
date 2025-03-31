import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import emailjs from "emailjs-com";
import "./PatronProfile.scss";
import PatronHeader from "../../../components/PatronHeader/PatronHeader.js";

const PatronProfile = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const email = localStorage.getItem("patron");
        if (!email) return;

        // Get all rooms and bookings for the patron
        const roomsSnapshot = await getDocs(collection(db, "rooms"));
        const rooms = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const today = new Date().toISOString().split("T")[0];

        const bookingPromises = rooms.map(async (room) => {
          const bookingsQuery = query(
            collection(db, `rooms/${room.id}/bookings`),
            where("email", "==", email)
          );
          const snapshot = await getDocs(bookingsQuery);
          return snapshot.docs.map((doc) => ({
            id: doc.id,
            roomId: room.id,
            roomName: room.name,
            location: room.location,
            status: doc.data().status, // Include booking status
            ...doc.data(),
          }));
        });

        const allBookings = (await Promise.all(bookingPromises)).flat();

        // Separate bookings into upcoming and past based on date
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

  const handleCancelBooking = async (bookingId, roomId, bookingData) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      // Delete booking from Firestore
      const bookingRef = doc(db, `rooms/${roomId}/bookings/${bookingId}`);
      await deleteDoc(bookingRef);

      // Send email to the user who cancelled
      const emailParams = {
        user_email: bookingData.email,
        room_name: bookingData.roomName,
        room_location: bookingData.location,
        booking_date: bookingData.date,
        booking_time: bookingData.time,
        status: "Cancelled",
      };

      await emailjs.send(
        "service_p7qb2fi",
        "template_whfon5g",
        emailParams,
        "q6N2whZUsNxvfV7sr"
      );

      // Fetch reminders for this room (matching roomId, date, and time)
      const remindersQuery = query(
        collection(db, "reminders"),
        where("roomId", "==", roomId),
        where("date", "==", bookingData.date),
        where("time", "==", bookingData.time)
      );
      const remindersSnapshot = await getDocs(remindersQuery);

      if (!remindersSnapshot.empty) {
        // Send email notifications to each user who set a reminder
        remindersSnapshot.forEach(async (reminderDoc) => {
          const reminder = reminderDoc.data();
          const notifyEmailParams = {
            user_email: reminder.email,
            room_name: bookingData.roomName,
            room_location: bookingData.location,
            booking_date: bookingData.date,
            booking_time: bookingData.time,
          };

          // Send notification email to each user
          await emailjs.send(
            "service_p7qb2fi",
            "template_fwti4vi",
            notifyEmailParams,
            "q6N2whZUsNxvfV7sr"
          );

          // After notification, delete this reminder from the notifications collection
          const reminderRef = doc(db, "reminders", reminderDoc.id);
          await deleteDoc(reminderRef); // Remove the reminder record
        });
      }

      // Remove the cancelled booking from state
      setUpcomingBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );

      alert("Booking cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel the booking. Please try again.");
    }
  };

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
                    <p>
                      <strong>Status:</strong> {booking.status}
                    </p>
                    <button
                      className="cancel-btn"
                      onClick={() =>
                        handleCancelBooking(booking.id, booking.roomId, booking)
                      }
                    >
                      Cancel Booking
                    </button>
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
