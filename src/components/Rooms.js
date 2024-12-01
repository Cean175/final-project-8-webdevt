import React from "react";

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

const RoomsList = ({ onRoomSelect }) => {
  return (
    <div className="rooms-container">
      {roomsData.map((room) => (
        <div key={room.id} className="room-box" onClick={() => onRoomSelect(room)}>
          <img src={room.image} alt={room.name} className="room-image" />
          <h3 className="room-name">{room.name}</h3>
          <p className="room-description">{room.description}</p>
          <p className="room-price">{room.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RoomsList;
