import React, { useState } from 'react';

const Booking = () => {
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        roomType: '',
        checkIn: '',
        checkOut: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails({
            ...bookingDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bookingDetails);
        // Handle booking submission logic
    };

    return (
        <div>
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
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="suite">Suite</option>
                </select>
                <input
                    type="date"
                    name="checkIn"
                    value={bookingDetails.checkIn}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="checkOut"
                    value={bookingDetails.checkOut}
                    onChange={handleChange}
                />
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};

export default Booking;
