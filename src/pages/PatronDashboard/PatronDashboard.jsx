import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatronDashboard.scss";
import { Footer9 } from "../../components/Footer/Footer9";

const PatronDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("patron")) {
      console.warn("No patron session found. Redirecting to login...");
      navigate("/patron-login");
    }
  }, [navigate]);

  // Temporary Testing Data (we will replace with proper logic later)
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Study Room A",
      capacity: 4,
      equipment: "Projector, Whiteboard",
      location: "Floor 2",
      description: "A quiet study space with a projector and whiteboard.",
      tags: ["Study-Only"],
      image: "/images/study-room.jpg",
    },
    {
      id: 2,
      name: "Conference Room B",
      capacity: 10,
      equipment: "TV, Microphone",
      location: "Floor 1",
      description: "A spacious conference room with a TV and microphones.",
      tags: ["Group Discussion"],
      image: "/images/conference-room.jpg",
    },
    {
      id: 3,
      name: "Quiet Room C",
      capacity: 2,
      equipment: "Noise Cancelling",
      location: "Floor 3",
      description: "A small private room with noise-cancelling features.",
      tags: ["Silent Room"],
      image: "/images/quiet-room.jpg",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null); // Track selected room for modal
  const [isReserving, setIsReserving] = useState(false); // Track reservation form modal

  // Filter States
  const [selectedFilters, setSelectedFilters] = useState({
    date: "",
    size: "",
    equipment: "",
    location: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    date: "",
    size: "",
    equipment: "",
    location: "",
  });

  // Handle Filter Change
  const handleFilterChange = (e) => {
    setSelectedFilters({ ...selectedFilters, [e.target.name]: e.target.value });
  };

  // Apply Filters
  const applyFilters = () => {
    setAppliedFilters({ ...selectedFilters });
  };

  // Clear Filters
  const clearFilters = () => {
    setSelectedFilters({
      date: "",
      size: "",
      equipment: "",
      location: "",
    });
    setAppliedFilters({
      date: "",
      size: "",
      equipment: "",
      location: "",
    });
  };

  // Open Reservation Form
  const openReservationForm = () => {
    setIsReserving(true);
  };

  // Close Modals (Room Details & Reservation)
  const closeModals = () => {
    setSelectedRoom(null);
    setIsReserving(false);
  };

  // Filtered Room List (based on search + filters)
  const filteredRooms = rooms.filter((room) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm) ||
      room.capacity.toString().includes(searchTerm) ||
      room.equipment.toLowerCase().includes(searchTerm) ||
      room.location.toLowerCase().includes(searchTerm);

    const matchesFilters =
      (!appliedFilters.size ||
        (appliedFilters.size === "small" && room.capacity <= 4) ||
        (appliedFilters.size === "medium" &&
          room.capacity > 4 &&
          room.capacity <= 10) ||
        (appliedFilters.size === "large" && room.capacity > 10)) &&
      (!appliedFilters.equipment ||
        room.equipment
          .toLowerCase()
          .includes(appliedFilters.equipment.toLowerCase())) &&
      (!appliedFilters.location ||
        room.location
          .toLowerCase()
          .includes(appliedFilters.location.toLowerCase()));

    return matchesSearch && matchesFilters;
  });

  return (
    <>
    <div className="patron-dashboard-container">
      {/* Left Panel (Filters) */}
      <div className="filter-sidebar">
        <h3>Filters</h3>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={selectedFilters.date}
          onChange={handleFilterChange}
        />

        <label>Room Size:</label>
        <select
          name="size"
          value={selectedFilters.size}
          onChange={handleFilterChange}
        >
          <option value="">Any</option>
          <option value="small">Small (1-4 people)</option>
          <option value="medium">Medium (5-10 people)</option>
          <option value="large">Large (10+ people)</option>
        </select>

        <label>Equipment:</label>
        <input
          type="text"
          name="equipment"
          placeholder="Projector, TV..."
          value={selectedFilters.equipment}
          onChange={handleFilterChange}
        />

        <label>Location:</label>
        <select
          name="location"
          value={selectedFilters.location}
          onChange={handleFilterChange}
        >
          <option value="">Any</option>
          <option value="Floor 1">Floor 1</option>
          <option value="Floor 2">Floor 2</option>
          <option value="Floor 3">Floor 3</option>
        </select>

        {/* Apply Filters Button */}
        <button className="apply-filters-btn" onClick={applyFilters}>
          Apply Filters
        </button>

        {/* Clear Filters Button */}
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name, capacity, or equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Room Grid */}
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
                  <b>Equipment:</b> {room.equipment}
                </p>
                <p>
                  <b>Location:</b> {room.location}
                </p>
                <button className="reserve-btn">View Details</button>
              </div>
            ))
          ) : (
            <p className="no-results">No rooms match your search or filters.</p>
          )}
        </div>
      </div>

      {/* Room Details Modal */}
      {selectedRoom && !isReserving && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModals}>
              ✖
            </button>
            <h2>{selectedRoom.name}</h2>
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="room-image"
            />
            <p>
              <b>Capacity:</b> {selectedRoom.capacity} people
            </p>
            <p>
              <b>Equipment:</b> {selectedRoom.equipment}
            </p>
            <p>
              <b>Location:</b> {selectedRoom.location}
            </p>
            <p>
              <b>Description:</b> {selectedRoom.description}
            </p>
            <button className="reserve-btn" onClick={openReservationForm}>
              Reserve Now
            </button>
          </div>
        </div>
      )}

      {/* Reservation Form Modal */}
      {isReserving && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModals}>
              ✖
            </button>
            <h2>Reserve {selectedRoom?.name}</h2>
            <form 
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/reservation-confirmed");
            }}>
              <label>Name:</label>
              <input type="text" required />
              <label>Email:</label>
              <input type="email" required />
              <button type="submit" className="reserve-btn">
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer */}  
      
    </div>
    <Footer9 />
    </>
  );
};

export default PatronDashboard;
