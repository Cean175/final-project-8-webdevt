import React, { useState } from "react";
import "./component.css";

const roomsData = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "A luxurious room with a king-size bed and stunning views.",
    price: 11000,
    image: "family-suite.jpg",
  },
  {
    id: 2,
    name: "Standard Room",
    description: "A comfortable room with modern amenities and a queen bed.",
    price: 5000,
    image: "430789848.jpg",
  },
  {
    id: 3,
    name: "Family Room",
    description: "Spacious room with two double beds, perfect for families.",
    price: 7500,
    image: "masthead-desktop.avif",
  },
  {
    id: 4,
    name: "Single Room",
    description: "Cozy room with a single bed for solo travelers.",
    price: 3000,
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
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [amountEntered, setAmountEntered] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardType: "",
    cardNumber: "",
    cvc: "",
    expirationDate: "",
  });
  const [paymentFee, setPaymentFee] = useState(0);

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

    if (name in cardDetails) {
      setCardDetails({
        ...cardDetails,
        [name]: value,
      });
    }

    if (name === "amountEntered") {
      setAmountEntered(value);
    }
  };

  const generateConfirmationId = () => {
    return "CONF-" + Math.floor(Math.random() * 1000000);
  };

  const generateReservationId = () => {
    return "RES-" + Math.floor(Math.random() * 1000000);
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

      setDateError("");
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDates() && selectedRoom) {
      const confirmationId = generateConfirmationId();
      const newBooking = {
        ...bookingDetails,
        roomName: selectedRoom.name,
        price: selectedRoom.price,
        confirmationId: confirmationId,
      };

      // Save the booking data to localStorage
      const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      storedBookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(storedBookings));

      setConfirmationDetails(newBooking);
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
    setPaymentMethod(null);
    setPaymentConfirmed(false);
    setCardDetails({
      cardType: "",
      cardNumber: "",
      cvc: "",
      expirationDate: "",
    });
    setAmountEntered("");
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
    if (method === "Card") {
      setPaymentFee(selectedRoom.price * 0.02); 
    }
  };

  const confirmPayment = () => {
    if (paymentMethod === "Card" && parseFloat(amountEntered) === selectedRoom.price + paymentFee) {
      setPaymentConfirmed(true);
    } else if (paymentMethod === "Hotel" && parseFloat(amountEntered) === selectedRoom.price) {
      setPaymentConfirmed(true);
    } else {
      alert("The entered amount is incorrect.");
    }
  };

  const handleBack = () => {
    setPaymentMethod(null);
    setAmountEntered("");
    setPaymentFee(0);
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
            value={bookingDetails.checkIn}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
          <label className="date-label">Check-Out</label>
          <input
            type="date"
            name="checkOut"
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

      {confirmationDetails && !paymentConfirmed && (
        <div className="payment-container">
          <h2>Payment Options</h2>
          <p><strong>Confirmation ID:</strong> {confirmationDetails.confirmationId}</p>
          <p><strong>Name:</strong> {confirmationDetails.name}</p>
          <p><strong>Room Type:</strong> {confirmationDetails.roomName}</p>
          <p><strong>Price:</strong> ₱{confirmationDetails.price}</p>
          <button onClick={() => handlePayment("Hotel")}>Pay at Hotel</button>
          <button onClick={() => handlePayment("Card")}>Pay by Card</button>
        </div>
      )}

      {paymentMethod && !paymentConfirmed && (
        <div className="payment-details">
          <h3>Enter Payment Amount</h3>
          <input
            type="number"
            name="amountEntered"
            placeholder="Amount"
            value={amountEntered}
            onChange={handleChange}
          />
          <p><strong>Transaction Fee:</strong> ₱{paymentFee}</p>
          <button onClick={confirmPayment}>Confirm Payment</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}

      {paymentConfirmed && (
        <div className="receipt-container">
          <h2>Receipt</h2>
          <p><strong>{paymentMethod === "Hotel" ? "Reservation ID" : "Confirmation ID"}:</strong> {paymentMethod === "Hotel" ? generateReservationId() : confirmationDetails.confirmationId}</p>
          <p><strong>Name:</strong> {confirmationDetails.name}</p>
          <p><strong>Room Type:</strong> {confirmationDetails.roomName}</p>
          <p><strong>Price:</strong> ₱{confirmationDetails.price}</p>
          <button onClick={handleCancelReservation}>Cancel Reservation</button>
        </div>
      )}
    </div>
  );
};

export default Booking;