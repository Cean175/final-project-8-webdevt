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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookingDetails);
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
          <input
            type="date"
            name="checkIn"
            placeholder="Check-In"
            value={bookingDetails.checkIn}
            onChange={handleChange}
          />
          <input
            type="date"
            name="checkOut"
            placeholder="Check-Out"
            value={bookingDetails.checkOut}
            onChange={handleChange}
          />
          <button type="submit">Book Now</button>
        </form>
      </div>

      {selectedRoom && (
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
    </div>
  );
};

export default Booking;
