import React, { useState, useEffect } from "react";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [editBooking, setEditBooking] = useState(null);
  const [newBooking, setNewBooking] = useState({
    name: "",
    email: "",
    roomName: "",
    checkInDate: "",
    checkOutDate: "",
    paymentMethod: "",
  });

  useEffect(() => {
    // Fetch and load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const messages = storedBookings
      .filter((booking) => booking.contactMessage)
      .map((booking) => ({
        name: booking.name,
        email: booking.email,
        contactMessage: booking.contactMessage,
      }));

    setBookings(storedBookings);
    setContactMessages(messages);
  }, []);

  // Function to cancel a reservation
  const handleCancel = (confirmationId) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.confirmationId !== confirmationId
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    alert("Reservation has been canceled.");
  };

  // Function to create a new booking
  const handleCreateBooking = () => {
    if (!newBooking.name || !newBooking.roomName || !newBooking.checkInDate || !newBooking.checkOutDate) {
      alert("Please fill in all fields!");
      return;
    }

    const newConfirmationId = `CONF-${Date.now()}`; // Unique ID based on timestamp
    const newBookingObj = { ...newBooking, confirmationId: newConfirmationId };
    const updatedBookings = [...bookings, newBookingObj];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    alert("New reservation created!");
    setNewBooking({
      name: "",
      email: "",
      roomName: "",
      checkInDate: "",
      checkOutDate: "",
      paymentMethod: "",
    }); // Reset the form
  };

  // Function to handle editing a booking
  const handleEditBooking = (booking) => {
    setEditBooking(booking);
  };

  // Save the edited booking
  const handleSaveEditedBooking = () => {
    if (!editBooking.name || !editBooking.roomName || !editBooking.checkInDate || !editBooking.checkOutDate) {
      alert("Please fill in all fields!");
      return;
    }

    const updatedBookings = bookings.map((booking) =>
      booking.confirmationId === editBooking.confirmationId ? editBooking : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    alert("Reservation updated!");
    setEditBooking(null); // Clear edit mode
  };

  // Handle input changes for both new booking and editing booking
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editBooking) {
      setEditBooking({ ...editBooking, [name]: value });
    } else {
      setNewBooking({ ...newBooking, [name]: value });
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Create Reservation Form */}
      <div className="create-reservation-section">
        <h3>Create New Reservation</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            value={newBooking.name}
            onChange={handleInputChange}
            placeholder="Guest Name"
          />
          <input
            type="email"
            name="email"
            value={newBooking.email}
            onChange={handleInputChange}
            placeholder="Guest Email"
          />
          <input
            type="text"
            name="roomName"
            value={newBooking.roomName}
            onChange={handleInputChange}
            placeholder="Room Name"
          />
          <input
            type="date"
            name="checkInDate"
            value={newBooking.checkInDate}
            onChange={handleInputChange}
            placeholder="Check-in Date"
          />
          <input
            type="date"
            name="checkOutDate"
            value={newBooking.checkOutDate}
            onChange={handleInputChange}
            placeholder="Check-out Date"
          />
          <input
            type="text"
            name="paymentMethod"
            value={newBooking.paymentMethod}
            onChange={handleInputChange}
            placeholder="Payment Method"
          />
          <button type="button" onClick={handleCreateBooking}>Create Reservation</button>
        </form>
      </div>

      {/* Reservations List */}
      <div className="reservations-section">
        <h3>Reservations</h3>
        <table>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.confirmationId}>
                <td>{booking.confirmationId}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.roomName}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.paymentMethod}</td>
                <td>
                  <button
                    className="button-spacing"
                    onClick={() => handleEditBooking(booking)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancel(booking.confirmationId)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Reservation Modal */}
      {editBooking && (
        <div className="edit-booking-modal">
          <h3>Edit Reservation</h3>
          <input
            type="text"
            name="name"
            value={editBooking.name}
            onChange={handleInputChange}
            placeholder="Guest Name"
          />
          <input
            type="email"
            name="email"
            value={editBooking.email}
            onChange={handleInputChange}
            placeholder="Guest Email"
          />
          <input
            type="text"
            name="roomName"
            value={editBooking.roomName}
            onChange={handleInputChange}
            placeholder="Room Name"
          />
          <input
            type="date"
            name="checkInDate"
            value={editBooking.checkInDate}
            onChange={handleInputChange}
            placeholder="Check-in Date"
          />
          <input
            type="date"
            name="checkOutDate"
            value={editBooking.checkOutDate}
            onChange={handleInputChange}
            placeholder="Check-out Date"
          />
          <input
            type="text"
            name="paymentMethod"
            value={editBooking.paymentMethod}
            onChange={handleInputChange}
            placeholder="Payment Method"
          />
          <button type="button" onClick={handleSaveEditedBooking}>Save Changes</button>
          <button type="button" onClick={() => setEditBooking(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
