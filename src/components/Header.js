import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

            
            <li className={`dropdown ${dropdown ? 'open' : ''}`} onClick={toggleDropdown}>
              <button className="dropdown-btn">Account</button>
              {dropdown && (
                <ul className="dropdown-menu">
                  <li>
                    
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
