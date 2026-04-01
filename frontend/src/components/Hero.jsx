// Hero component for ASACODER landing page
// This is the first section visitors see - the main headline and call-to-action
import { Link } from 'react-router-dom'
import { Github, Linkedin, MessageCircle, Send } from 'lucide-react'
import heroPhoto from '../assets/Ashuembom stephen akembom .jpg'
import './Hero.css'

const Hero = () => {
  // Debug: Log the image path
  console.log('Hero photo path:', heroPhoto)
  
  const backgroundStyle = {
    backgroundImage: `url("${heroPhoto}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll'
  }

  return (
    <section id="hero" className="hero" style={backgroundStyle}>
      {/* Temporarily comment overlay to verify image */}
      <div className="hero-overlay" style={{ opacity: 0.2 }}></div>
      <div className="hero-container">
        {/* Main content */}
        <div className="hero-content">
          {/* Greeting and name */}
          <div className="hero-greeting">
            <span>Hello, I&apos;m</span>
          </div>
          
          {/* Main headline */}
          <h1 className="hero-title">
            <span className="hero-name">Stephthecoder</span>
            <span className="hero-tagline">Professional Web Developer & Digital Solutions Expert</span>
          </h1>
          
          {/* Description */}
          <p className="hero-description">
            Expert React.js and Node.js developer specializing in modern web applications, forex trading mentorship, digital marketing services, and ICT training. Explore my <Link to="/#services">services</Link>, review recent <Link to="/#projects">projects</Link>, and <Link to="/#contact">get in touch</Link> for your next build.
          </p>
          
          {/* Call-to-action buttons */}
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/#contact">
              Hire Me
            </Link>
            <Link className="btn btn-secondary" to="/#services">
              View Services
            </Link>
          </div>
          
          {/* Social links */}
          <div className="hero-social">
            <a href="https://wa.me/237653180273" target="_blank" rel="noopener noreferrer" className="social-link">
              <MessageCircle />
            </a>
            <a href="https://t.me/ASACODER" target="_blank" rel="noopener noreferrer" className="social-link">
              <Send />
            </a>
            <a href="https://www.linkedin.com/in/ashuembom-stephen-akembom-b84302260/" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin />
            </a>
            <a href="https://github.com/Ashuembomstephenakembom" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
