import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./LibrarianDashboard.scss";
import lplLogo from "../../assets/lpl-icon-white.svg";
import LibrarianHeader from "../../components/LibrarianHeader/LibrarianHeader.js";
import Footer from "../../components/Footer/Footer.js";

const LibrarianDashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    console.log("LibrarianDashboard Mounted");
    console.log("LPL Logo Path:", lplLogo);

    if (!localStorage.getItem("librarian")) {
      console.warn("No librarian session found. Redirecting to login...");
      navigate("/librarian-login");
      return;
    }

    setReservations([
      { id: 1, patron: "Steven Smith", room: "A101", status: "Pending" },
      { id: 2, patron: "Judy Smith", room: "B202", status: "Approved" },
    ]);

    setRooms([
      { id: "A101", available: true },
      { id: "B202", available: false },
    ]);
  }, [navigate]);

  const handleApprove = (id) => alert(`Reservation ${id} approved.`);
  const handleDeny = (id) => alert(`Reservation ${id} denied.`);
  const toggleRoomAvailability = (id) =>
    alert(`Toggled availability for room ${id}.`);

  const generateReport = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Librarian Dashboard Report", 14, 15);

    // Reservations Table
    doc.setFontSize(14);
    doc.text("Reservations", 14, 25);
    autoTable(doc, {
      startY: 30,
      head: [["Patron", "Room", "Status"]],
      body: reservations.map((res) => [res.patron, res.room, res.status]),
    });

    // Rooms Table
    doc.text("Room Availability", 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Room", "Available"]],
      body: rooms.map((room) => [room.id, room.available ? "Yes" : "No"]),
    });

    // Save PDF
    doc.save("Librarian_Dashboard_Report.pdf");
  };

  return (
    <>
      <LibrarianHeader />
      <div className="dashboard-container">
        <h2>Librarian Dashboard</h2>
        <div className="dashboard-content">
          {/* Overview Panel */}
          <div className="overview">
            <h3>Overview</h3>
            <p>
              <strong>Total Reservations:</strong> {reservations.length}
            </p>
            <p>
              <strong>Pending Requests:</strong>{" "}
              {reservations.filter((r) => r.status === "Pending").length}
            </p>
          </div>

          {/* Reservation Management */}
          <div className="reservations">
            <h3>Reservation Management</h3>
            {reservations.map((res) => (
              <div key={res.id} className="reservation-card">
                <p>
                  <b>Patron:</b> {res.patron}
                </p>
                <p>
                  <b>Room:</b> {res.room}
                </p>
                <p>
                  <b>Status:</b> {res.status}
                </p>
                {res.status === "Pending" && (
                  <div>
                    <button onClick={() => handleApprove(res.id)}>
                      Approve
                    </button>
                    <button onClick={() => handleDeny(res.id)}>Deny</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Room Management */}
          <div className="rooms">
            <h3>Room Management</h3>
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <p>
                  <b>Room:</b> {room.id}
                </p>
                <p>
                  <b>Available:</b> {room.available ? "Yes" : "No"}
                </p>
                <button onClick={() => toggleRoomAvailability(room.id)}>
                  {room.available ? "Mark Unavailable" : "Mark Available"}
                </button>
              </div>
            ))}
          </div>

          {/* Generate Report Button */}
          <button className="generate-report-btn" onClick={generateReport}>
            Generate Report
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LibrarianDashboard;
