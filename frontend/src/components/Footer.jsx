import { Link } from 'react-router-dom'
import { 
  MessageCircle,
  Send,
  Linkedin,
  Github,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';
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

            {/* Services Section - internal links to home sections */}
            <div className="footer-section">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li><Link to="/#services" className="footer-link">Web Development</Link></li>
                <li><Link to="/#services" className="footer-link">Forex Training</Link></li>
                <li><Link to="/#services" className="footer-link">Digital Marketing</Link></li>
                <li><Link to="/#services" className="footer-link">ICT Training</Link></li>
                <li><Link to="/#contact" className="footer-link">Consultation</Link></li>
              </ul>
            </div>

            {/* Quick Links - internal linking across site */}
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/#about" className="footer-link">About Me</Link></li>
                <li><Link to="/#services" className="footer-link">Services</Link></li>
                <li><Link to="/#projects" className="footer-link">Projects</Link></li>
                <li><Link to="/#process" className="footer-link">Process</Link></li>
                <li><Link to="/#contact" className="footer-link">Contact</Link></li>
                <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="footer-link">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact Section - plain links, no div wrapper */}
            <div className="footer-section">
              <h4 className="footer-title">Get In Touch</h4>
              <ul className="footer-links">
                <li>
                  <a href="https://wa.me/237653180273" target="_blank" rel="noopener noreferrer">+237 653 180 273</a>
                </li>
                <li>
                  <a href="mailto:stephen@asaofficial.org">stephen@asaofficial.org</a>
                </li>
                <li>
                  <a href="https://maps.google.com/?q=Douala,Cameroon" target="_blank" rel="noopener noreferrer">Cameroon, Douala</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social links */}
          <div className="footer-social-section">
            <h4 className="social-title">Follow Me</h4>
            <div className="hero-social">
              <a href="https://wa.me/237653180273" target="_blank" rel="noopener noreferrer" className="social-link social-link-whatsapp" aria-label="WhatsApp">
                <MessageCircle />
              </a>
              <a href="https://t.me/ASACODER" target="_blank" rel="noopener noreferrer" className="social-link social-link-telegram" aria-label="Telegram">
                <Send />
              </a>
              <a href="https://www.facebook.com/akembom.stephen/?viewas=100000686899395" target="_blank" rel="noopener noreferrer" className="social-link social-link-facebook" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="https://x.com/stephen_akembom?s=21" target="_blank" rel="noopener noreferrer" className="social-link social-link-twitter" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="https://www.instagram.com/stephen_akembom?igsh=MWswNXY2ZGxwcHU4cA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link social-link-instagram" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://www.linkedin.com/in/ashuembom-stephen-akembom-b84302260/" target="_blank" rel="noopener noreferrer" className="social-link social-link-linkedin" aria-label="LinkedIn">
                <Linkedin />
              </a>
              <a href="https://github.com/Ashuembomstephenakembom" target="_blank" rel="noopener noreferrer" className="social-link social-link-github" aria-label="GitHub">
                <Github />
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
            <Link to="/terms-of-service" className="bottom-link" style={{ cursor: 'pointer', zIndex: 10 }}>Terms of Service</Link>
            <span className="separator">|</span>
            <Link to="/privacy-policy" className="bottom-link" style={{ cursor: 'pointer', zIndex: 10 }}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
