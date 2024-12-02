import React from 'react';
import './contact.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div>

      <section className="location">
        <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123911.6096229778!2d121.08576800066254!3d13.944441591546939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd13576170055f%3A0xe6da25b39082662a!2sLipa%2C%20Batangas!5e0!3m2!1sen!2sph!4v1733114959953!5m2!1sen!2sph"
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
                <p>Lipa, Batangas</p>
              </span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} />
              <span>
                <h5>+63 012 3456 789</h5>
                <p>Contact us</p>
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
    </div>
  );
};

export default Contact;