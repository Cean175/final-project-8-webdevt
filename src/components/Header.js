import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = ({ setIsLoggedIn }) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdown(!dropdown);

  const handleLogout = () => {
    alert('Logging out...');
    setIsLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    navigate('/');
  };

  return (
    <header className="header">
      {/* Hotel Name outside the Navbar */}
      <div className="hotel-name">
        <h1>Hotel</h1>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            {/* Empty link, could be used for a logo */}
          </Link>
          <ul className={`nav-menu ${click ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={() => setClick(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/rooms" className="nav-links" onClick={() => setClick(false)}>
                Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/booking" className="nav-links" onClick={() => setClick(false)}>
                Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-links" onClick={() => setClick(false)}>
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-links account-btn" onClick={toggleDropdown}>
                Account
              </button>
              {dropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <div className="menu-icon" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
