import React from 'react';
import { 
  FaWhatsapp, 
  FaTelegram, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Main Footer Content */}
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-section">
              <div className="footer-brand">
                <h3 className="footer-logo">ASACODER</h3>
                <p className="footer-tagline">
                  Professional Web Development, Forex Training & Digital Marketing Solutions
                </p>
                <p className="footer-description">
                  Transforming ideas into digital reality with cutting-edge web solutions, 
                  expert forex guidance, and strategic digital marketing.
                </p>
              </div>
            </div>

            {/* Services Section */}
            <div className="footer-section">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Web Development</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Forex Training</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Digital Marketing</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>ICT Training</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Consultation</a></li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#about">About Me</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#process">Process</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="https://asacoder.xyz/privacy-policy">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="footer-section">
              <h4 className="footer-title">Get In Touch</h4>
              <div className="footer-contact">
                <a href="https://wa.me/237653180273" className="contact-item" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="contact-icon whatsapp-icon" />
                  <span className="contact-text">+237 653 180 273</span>
                </a>
                <a href="mailto:contact@asacoder.xyz" className="contact-item">
                  <FaEnvelope className="contact-icon email-icon" />
                  <span className="contact-text">stephen@asaofficial.org</span>
                </a>
                <a href="https://maps.google.com/?q=Douala,Cameroon" className="contact-item" target="_blank" rel="noopener noreferrer">
                  <FaMapMarkerAlt className="contact-icon location-icon" />
                  <span className="contact-text">Cameroon, Douala</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="footer-social-section">
            <h4 className="social-title">Follow Me</h4>
            <div className="hero-social">
              <a href="https://wa.me/237653180273" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaWhatsapp />
              </a>
              <a href="https://t.me/ASACODER" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTelegram />
              </a>
              <a href="https://www.linkedin.com/in/ashuembom-stephen-akembom-b84302260/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://github.com/Ashuembomstephenakembom" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Footer Bottom Bar - Full Width */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <div className="footer-bottom-content">
            <span className="copyright">
              © {currentYear} <strong>ASACODER</strong> All rights reserved.
            </span>
            <span className="separator">|</span>
            <a href="https://asacoder.xyz/terms-of-service" className="bottom-link">Terms of Service</a>
            <span className="separator">|</span>
            <a href="https://asacoder.xyz/privacy-policy" className="bottom-link">Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
