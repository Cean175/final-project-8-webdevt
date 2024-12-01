import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

 
  const handleCancel = (confirmationId) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.confirmationId !== confirmationId
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    alert('Reservation has been canceled.');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>Reservations</h3>
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Payment Method</th>
            <th>Contact Message</th>
            <th>Action</th>
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
              <td>{booking.contactMessage || 'No message'}</td>
              <td>
                <button onClick={() => handleCancel(booking.confirmationId)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
