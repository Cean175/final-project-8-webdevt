import React from 'react';
import './contact.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareXTwitter, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHotel, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div>
      <section className="subheader">
        <h1>Contact Us</h1>
      </section>

      <section className="location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15259.13871623326!2d121.32122723412638!3d14.061116876233223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd5c96860a894b%3A0xfa9e0f05004f4aca!2sSan%20Pablo%20City%2C%20Laguna!5e0!3m2!1sen!2sph!4v1667904962100!5m2!1sen!2sph"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="location"
        ></iframe>
      </section>

      <section className="contact-us">
        <div className="row">
          <div className="contact-col">
            <div>
              <FontAwesomeIcon icon={faHotel} />
              <span>
                <h5>ABC Street, DEF Building</h5>
                <p>San Pablo City, Laguna</p>
              </span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} />
              <span>
                <h5>+63 012 3456 789</h5>
                <p>Monday to Sunday, 10AM to 6PM</p>
              </span>
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>
                <h5>hotel@gmail.com</h5>
                <p>Email us your query</p>
              </span>
            </div>
          </div>
          <div className="contact-col">
            <form action="">
              <input type="text" placeholder="Enter your name" required />
              <input type="email" placeholder="Enter email address" required />
              <input type="text" placeholder="Enter your subject" required />
              <textarea rows="8" placeholder="Message" required></textarea>
              <button type="submit" className="hero-btn brown-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <section className="footer">
        <h4>Connect with us</h4>
        <p>Hotel</p>
        <div className="icons">
          <FontAwesomeIcon icon={faSquareFacebook} />
          <FontAwesomeIcon icon={faSquareXTwitter} />
          <FontAwesomeIcon icon={faSquareInstagram} />
        </div>
      </section>
    </div>
  );
};

export default Contact;