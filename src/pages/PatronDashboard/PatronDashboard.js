import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase.js";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import "./PatronDashboard.scss";
import PatronHeader from "../../components/PatronHeader/PatronHeader.js";

const PatronDashboard = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isReserving, setIsReserving] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    type: "",
    equipment: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("patron")) {
      console.warn("No patron session found. Redirecting to login...");
      navigate("/patron-login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(db, "rooms");
        const roomSnapshot = await getDocs(roomsCollection);
        const roomList = roomSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomList);

        const uniqueLocations = [
          ...new Set(roomList.map((room) => room.location)),
        ].sort();
        setLocations(uniqueLocations);

        const allEquipment = [
          ...new Set(roomList.flatMap((room) => room.equipment)),
        ];
        setEquipmentOptions(allEquipment);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      equipment: checked
        ? [...prev.equipment, value]
        : prev.equipment.filter((eq) => eq !== value),
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      location: "",
      type: "",
      equipment: [],
    });
  };

  const openReservationModal = (room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const closeReservationModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleReserve = async () => {
    // Check if the selected date is at least 7 days from today
    const today = new Date();
    const minBookingDate = new Date(today);
    minBookingDate.setDate(today.getDate() + 7); // 7 days from today

    const selectedDateObj = new Date(selectedDate);
    if (selectedDateObj < minBookingDate) {
      alert("You can only book a room 7 days or more in advance.");
      return;
    }

    try {
      const bookingRef = collection(db, "rooms", selectedRoom.id, "bookings");
      const existingBookingsQuery = query(
        bookingRef,
        where("date", "==", selectedDate),
        where("time", "==", selectedTime)
      );
      const existingBookingsSnapshot = await getDocs(existingBookingsQuery);
      if (!existingBookingsSnapshot.empty) {
        alert(
          "The selected time slot is already booked. Please choose another."
        );
        return;
      }

      await addDoc(bookingRef, {
        roomName: selectedRoom.name,
        location: selectedRoom.location,
        date: selectedDate,
        time: selectedTime,
        userEmail: localStorage.getItem("patron"),
      });

      alert("Room reserved successfully!");
      closeReservationModal();
    } catch (error) {
      console.error("Error reserving room:", error);
      alert("Failed to reserve room. Please try again later.");
    }
  };

  const filteredRooms = rooms.filter((room) => {
    return (
      (!selectedFilters.location ||
        room.location === selectedFilters.location) &&
      (!selectedFilters.type || room.type === selectedFilters.type) &&
      (!selectedFilters.equipment.length ||
        selectedFilters.equipment.every((eq) => room.equipment.includes(eq)))
    );
  });

  return (
    <>
      <PatronHeader />
      <div className="patron-dashboard-container">
        <div className="filter-sidebar">
          <h3>Filters</h3>

          <label>Location:</label>
          <select
            name="location"
            value={selectedFilters.location}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <label>Room Type:</label>
          <select
            name="type"
            value={selectedFilters.type}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="Study Room">Study Room</option>
            <option value="Meeting Room">Meeting Room</option>
          </select>

          <label>Equipment:</label>
          <div className="equipment-filter">
            {equipmentOptions.map((eq, index) => (
              <div key={index} className="equipment-option">
                <input
                  type="checkbox"
                  value={eq}
                  checked={selectedFilters.equipment.includes(eq)}
                  onChange={handleEquipmentChange}
                />
                <label>{eq}</label>
              </div>
            ))}
          </div>
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="main-content">
          <h2>Patron Dashboard</h2>
          <div className="room-grid">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="room-card"
                  onClick={() => setSelectedRoom(room)}
                >
                  <h3>{room.name}</h3>
                  <p>
                    <b>Capacity:</b> {room.capacity} people
                  </p>
                  <p>
                    <b>Equipment:</b> {room.equipment.join(", ")}
                  </p>
                  <p>
                    <b>Location:</b> {room.location}
                  </p>
                  <button
                    type="button"
                    className="reserve-btn"
                    onClick={() => openReservationModal(room)}
                  >
                    Reserve Room
                  </button>
                </div>
              ))
            ) : (
              <p className="no-results">
                No rooms match your search or filters.
              </p>
            )}
          </div>
        </div>

        {/* Room Reservation Modal */}
        {modalOpen && (
          <div className="modal-overlay" onClick={closeReservationModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeReservationModal}>
                &times;
              </button>
              <h3>{selectedRoom.name}</h3>
              <p>{selectedRoom.location}</p>
              <p>{selectedRoom.capacity} people</p>
              <p>Available Equipment: {selectedRoom.equipment.join(", ")}</p>
              <form>
                <label>Select Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={
                    new Date(new Date().setDate(new Date().getDate() + 7))
                      .toISOString()
                      .split("T")[0]
                  } // 7 days from today
                  required
                />
                <label>Select Time:</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  {[...Array(8)].map((_, i) => {
                    const hour = 9 + i;
                    return (
                      <option key={hour} value={`${hour}:00`}>
                        {`${hour}:00 - ${hour + 1}:00`}
                      </option>
                    );
                  })}
                </select>
                <button
                  type="button"
                  className="reserve-btn"
                  onClick={handleReserve}
                >
                  Reserve Now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PatronDashboard;
