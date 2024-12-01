import React, { useState } from "react";

const roomsData = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "A luxurious room with a king-size bed and stunning views.",
    price: "₱11000/night",
    image: "family-suite.jpg",
    amenities: ["King-size bed", "Ocean view", "Private balcony"],
  },
  {
    id: 2,
    name: "Standard Room",
    description: "A comfortable room with modern amenities and a queen bed.",
    price: "₱5000/night",
    image: "430789848.jpg",
    amenities: ["Queen bed", "WiFi", "Air conditioning"],
  },
  {
    id: 3,
    name: "Family Room",
    description: "Spacious room with two double beds, perfect for families.",
    price: "₱7500/night",
    image: "masthead-desktop.avif",
    amenities: ["Two double beds", "Child-friendly", "Free breakfast"],
  },
  {
    id: 4,
    name: "Single Room",
    description: "Cozy room with a single bed for solo travelers.",
    price: "₱3000/night",
    image: "single.webp",
    amenities: ["Single bed", "Free WiFi", "Private bathroom"],
  },
];

const RoomsList = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleCancel = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="rooms-list-container">
      <div className="rooms-container">
        {roomsData.map((room) => (
          <div
            key={room.id}
            className="room-box"
            onClick={() => handleRoomSelect(room)}
          >
            <img src={room.image} alt={room.name} className="room-image" />
            <h3 className="room-name">{room.name}</h3>
            <p className="room-description">{room.description}</p>
            <p className="room-price">{room.price}</p>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="room-details-box">
          <div className="room-details">
            <h2>{selectedRoom.name} Details</h2>

            <div className="amenities-box">
              <div className="amenities-content">
                <h3>Amenities</h3>
                <ul>
                  {selectedRoom.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
              <button className="exit-btn" onClick={handleCancel}>
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsList;
