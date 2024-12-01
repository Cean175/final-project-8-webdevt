import React, { useState } from "react";
import "./component.css";

const roomsData = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "A luxurious room with a king-size bed and stunning views.",
    price: "₱11000/night",
    image: "family-suite.jpg",
  },
  {
    id: 2,
    name: "Standard Room",
    description: "A comfortable room with modern amenities and a queen bed.",
    price: "₱5000/night",
    image: "430789848.jpg",
  },
  {
    id: 3,
    name: "Family Room",
    description: "Spacious room with two double beds, perfect for families.",
    price: "₱7500/night",
    image: "masthead-desktop.avif",
  },
  {
    id: 4,
    name: "Single Room",
    description: "Cozy room with a single bed for solo travelers.",
    price: "₱3000/night",
    image: "single.webp",
  },
];

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
  });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [dateError, setDateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });

    if (name === "roomType") {
      const room = roomsData.find((room) => room.id.toString() === value);
      setSelectedRoom(room || null);
    }
  };

  const generateConfirmationId = () => {
    return "CONF-" + Math.floor(Math.random() * 1000000);
  };

  const validateDates = () => {
    const currentDate = new Date();
    const checkInDate = new Date(bookingDetails.checkIn);
    const checkOutDate = new Date(bookingDetails.checkOut);

    if (bookingDetails.checkIn && bookingDetails.checkOut) {
      if (checkInDate < currentDate || checkOutDate < currentDate) {
        setDateError("Check-in and check-out dates must be in the future.");
        setTimeout(() => setDateError(""), 3000);
        return false;
      }

      if (checkOutDate <= checkInDate) {
        setDateError("Check-out date must be after check-in date.");
        setTimeout(() => setDateError(""), 3000);
        return false;
      }

      if (checkInDate.getFullYear() === currentDate.getFullYear()) {
        if (checkInDate.getMonth() < currentDate.getMonth()) {
          setDateError("Check-in date cannot be from past months.");
          setTimeout(() => setDateError(""), 3000);
          return false;
        }
      }

      setDateError("");
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDates() && selectedRoom) {
      const confirmationId = generateConfirmationId();
      setConfirmationDetails({
        ...bookingDetails,
        roomName: selectedRoom.name,
        price: selectedRoom.price,
        confirmationId: confirmationId,
      });
    }
  };

  const handleCancelReservation = () => {
    setBookingDetails({
      name: "",
      email: "",
      roomType: "",
      checkIn: "",
      checkOut: "",
    });
    setSelectedRoom(null);
    setConfirmationDetails(null);
    setDateError("");
  };

  return (
    <div className="booking-container">
      <div className={`form-container ${selectedRoom ? "form-side" : "form-center"}`}>
        <h1>Book a Room</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={bookingDetails.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={bookingDetails.email}
            onChange={handleChange}
          />
          <select name="roomType" value={bookingDetails.roomType} onChange={handleChange}>
            <option value="">Select Room Type</option>
            {roomsData.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          <label className="date-label">Check-In</label>
          <input
            type="date"
            name="checkIn"
            placeholder="Check-In"
            value={bookingDetails.checkIn}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} 
          />
         
         <label className="date-label">Check-Out</label>
          <input
            type="date"
            name="checkOut"
            placeholder="Check-Out"
            value={bookingDetails.checkOut}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} 
          />


          {dateError && <p className="error-message">{dateError}</p>}
          <button type="submit" disabled={dateError}>Book Now</button>
        </form>
      </div>

      {selectedRoom && !confirmationDetails && (
        <div className="image-container">
          <div
            className="room-image"
            style={{
              backgroundImage: `url(${selectedRoom.image})`,
            }}
          ></div>
          <h3>{selectedRoom.name}</h3>
          <p>{selectedRoom.description}</p>
          <p>{selectedRoom.price}</p>
        </div>
      )}

      {confirmationDetails && (
        <div className="confirmation-container">
          <h2>Booking Confirmation</h2>
          <p><strong>Confirmation ID:</strong> {confirmationDetails.confirmationId}</p>
          <p><strong>Name:</strong> {confirmationDetails.name}</p>
          <p><strong>Email:</strong> {confirmationDetails.email}</p>
          <p><strong>Room Type:</strong> {confirmationDetails.roomName}</p>
          <p><strong>Price:</strong> {confirmationDetails.price}</p>
          <p><strong>Check-In Date:</strong> {confirmationDetails.checkIn}</p>
          <p><strong>Check-Out Date:</strong> {confirmationDetails.checkOut}</p>
          <button onClick={handleCancelReservation}>Cancel Reservation</button>
        </div>
      )}
    </div>
  );
};

export default Booking;
