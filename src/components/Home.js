import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Hotel</h1>
          <p>Experience luxury and comfort with our top-notch services and amenities.</p>
          <div className="hero-buttons">
          <Link to="/booking">
              <button className="book-now">Book Now</button>
            </Link>
            <Link to="/rooms">
              <button className="view-offers">View Offers</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
