import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ setIsLoggedIn }) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // Initialize useNavigate
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdown(!dropdown);

  const handleLogout = () => {
    // Perform any logout actions you need here (like clearing session, tokens, etc.)
    alert('Logging out...');

    // Clear the logged-in state and localStorage
    setIsLoggedIn(false); // Reset the logged-in state
    localStorage.setItem('loggedIn', 'false'); // Update localStorage

    // Navigate to the login page
    navigate('/');
  };

  return (
    <>
      <header>
        <nav className="flexSB">
          <ul
            className={click ? 'mobile-nav' : 'flexSB'}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/booking">Booking</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            {/* Dropdown for Account */}
            <li className={`dropdown ${dropdown ? 'open' : ''}`} onClick={toggleDropdown}>
              <button className="dropdown-btn">Account</button>
              {dropdown && (
                <ul className="dropdown-menu">
                  <li>
                    {/* Update Logout button to use the handleLogout function */}
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <div className="start"></div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"> </i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
