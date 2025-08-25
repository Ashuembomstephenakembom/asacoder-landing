// Hero component for ASACODER landing page
// This is the first section visitors see - the main headline and call-to-action
import { FaGithub, FaLinkedin, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        {/* Main content */}
        <div className="hero-content">
          {/* Greeting and name */}
          <div className="hero-greeting">
            <span>Hello, I&apos;m</span>
          </div>
          
          {/* Main headline */}
          <h1 className="hero-title">
            <span className="hero-name">ASACODER</span>
            <span className="hero-tagline">Professional Web Developer & Digital Solutions Expert</span>
          </h1>
          
          {/* Description */}
          <p className="hero-description">
            Expert React.js and Node.js developer specializing in modern web applications, forex trading mentorship, digital marketing services, and ICT training. Transform your ideas into powerful digital solutions.
          </p>
          
          {/* Call-to-action buttons */}
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Hire Me
            </button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Get in Touch
            </button>
          </div>
          
          {/* Social links */}
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
        
        {/* ASACODER Logo */}
        <div className="hero-visual">
          <div className="logo-container">
            <div className="asacoder-logo">
              <div className="logo-icon">
                <span className="logo-text">A</span>
              </div>
              <div className="logo-text-container">
                <h2 className="logo-title">ASACODER</h2>
                <p className="logo-subtitle">Digital Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </section>
  )
}

export default Hero
