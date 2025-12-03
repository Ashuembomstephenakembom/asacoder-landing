// Contact component for ASACODER landing page
// This section includes a contact form and contact information
import { useState } from 'react'
import { Mail, MapPin, Send, MessageCircle, Linkedin, SendHorizontal } from 'lucide-react'
import axios from 'axios'
import './Contact.css'

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Get backend URL with production support
  const getBackendUrl = () => {
    let backendUrl;
    
    // PRODUCTION: Use environment variable or fallback to your domain
    if (import.meta.env.VITE_API_URL) {
      backendUrl = import.meta.env.VITE_API_URL;
    } else {
      // DEVELOPMENT: Check if we're in development
      const hostname = window.location.hostname
      const port = window.location.port
      
      // Check if we're on localhost or development ports
      if (hostname === 'localhost' || 
          hostname === '127.0.0.1' || 
          port === '5173' || 
          port === '3000' ||
          hostname.startsWith('192.168.') ||  // Local network IP
          hostname.startsWith('10.') ||       // Local network IP
          hostname.startsWith('172.')) {      // Local network IP
        backendUrl = 'http://localhost:10000'
      } else {
        // PRODUCTION: Fallback to Render backend
        backendUrl = 'https://asacoder-backend.onrender.com'
      }
    }
    
    // Remove trailing slash to prevent double slashes
    return backendUrl.replace(/\/$/, '')
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const backendUrl = getBackendUrl()
      console.log('Attempting to connect to backend:', backendUrl)
      
      const response = await axios.post(`${backendUrl}/api/contact/submit`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000 // Increased timeout for mobile
      })
      
      if (response.data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        console.log('Form submitted successfully:', response.data)
      } else {
        setSubmitStatus('error')
        console.error('Backend returned error:', response.data)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Check if we're in development mode
      const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' || 
                           window.location.port === '5173' || 
                           window.location.port === '3000' ||
                           window.location.hostname.startsWith('192.168.') ||
                           window.location.hostname.startsWith('10.') ||
                           window.location.hostname.startsWith('172.')
      
      // In production, only show error for actual server issues
      if (isDevelopment) {
        // In development, show detailed error handling
        if (error.code === 'ECONNREFUSED') {
          setSubmitStatus('error')
          console.log('Backend server is not running. Please start the backend server.')
        } else if (error.code === 'ERR_NETWORK') {
          setSubmitStatus('error')
          console.log('Network error - check your internet connection')
        } else if (error.code === 'ECONNABORTED') {
          setSubmitStatus('error')
          console.log('Request timeout - server might be slow')
        } else if (error.response) {
          setSubmitStatus('error')
          console.log('Server error:', error.response.status, error.response.data)
        } else {
          setSubmitStatus('error')
          console.log('Unknown error occurred')
        }
      } else {
        // In production, only show error for server errors (5xx) or specific issues
        if (error.response && error.response.status >= 500) {
          setSubmitStatus('error')
          console.log('Server error:', error.response.status, error.response.data)
        } else if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
          // Don't show error for temporary network issues in production
          console.log('Temporary network issue, not showing error to user')
          setSubmitStatus(null)
        } else {
          // For other errors in production, show a simple error
          setSubmitStatus('error')
          console.log('Error occurred:', error.message)
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fallback function for mobile devices when backend is not accessible
  const handleMobileFallback = () => {
    const { name, email, message } = formData
    const subject = encodeURIComponent(`Contact from ${name} - ASACODER Website`)
    const body = encodeURIComponent(`
Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from ASACODER website contact form
    `)
    
    const mailtoLink = `mailto:stephen@asaofficial.org?subject=${subject}&body=${body}`
    window.open(mailtoLink, '_blank')
  }

  // Contact information - Updated to match ASACODER's contact methods
  const contactInfo = [
    {
      icon: <MessageCircle />,
      title: 'WhatsApp',
      value: '+237 653 180 273',
      link: 'https://wa.me/237653180273'
    },
         {
      icon: <Mail />,
       title: 'Email',
       value: 'stephen@asaofficial.org',
               link: 'mailto:stephen@asaofficial.org'
     },
    {
      icon: <Linkedin />,
      title: 'LinkedIn',
      value: 'ashuembom-stephen-akembom',
      link: 'https://www.linkedin.com/in/ashuembom-stephen-akembom-b84302260/'
    },
    {
      icon: <SendHorizontal />,
      title: 'Telegram',
      value: '@ASACODER',
      link: 'https://t.me/ASACODER'
    }
  ]

  return (
    <section id="contact" className="contact bg-light">
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 className="section-title">Let&apos;s Work Together</h2>
          <p className="section-subtitle">
            Ready to bring your idea to life or improve your skills? Reach out and let&apos;s make it happen.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact form */}
          <div className="contact-form-section">
            <h3>Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                  maxLength="10000"
                ></textarea>
                <div className="char-counter" style={{ 
                  fontSize: '0.8rem', 
                  color: formData.message.length > 9000 ? '#e74c3c' : '#666',
                  textAlign: 'right',
                  marginTop: '5px'
                }}>
                  {formData.message.length}/10,000 characters
                </div>
              </div>

              {/* Submit status messages */}
              {submitStatus === 'success' && (
                <div className="form-message success">
                  Thank you! Your message has been sent successfully. I&apos;ll get back to you soon.
                </div>
              )}

                             {submitStatus === 'error' && (
                 <div className="form-message error">
                   <p>Sorry, there was an error sending your message.</p>
                   <p>Please try again or contact me directly through the links below.</p>
                   {/* Only show fallback button in development */}
                   {(window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.port === '5173' || 
                     window.location.port === '3000' ||
                     window.location.hostname.startsWith('192.168.') ||
                     window.location.hostname.startsWith('10.') ||
                     window.location.hostname.startsWith('172.')) && (
                     <button 
                       onClick={handleMobileFallback}
                       className="btn btn-secondary fallback-btn"
                       style={{ marginTop: '1rem', fontSize: '0.9rem' }}
                     >
                       📧 Send via Email Instead
                     </button>
                   )}
                 </div>
               )}

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact information */}
          <div className="contact-info-section">
            <h3>Contact Information</h3>
            <p>
              Feel free to reach out through any of these channels. I&apos;m always excited to hear about 
              new projects and opportunities to collaborate.
            </p>

            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-item">
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} className="contact-link" target="_blank" rel="noopener noreferrer">
                        {info.value}
                      </a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Animated location map */}
            <div className="location-map">
              <h4>Service Region</h4>
              <div className="map-container">
                <div className="map-placeholder">
                  <MapPin className="map-icon" />
                  <p>Remote Services Available Worldwide</p>
                  <div className="service-regions">
                    <span 
                      className="region-tag" 
                      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ cursor: 'pointer' }}
                    >
                      Web Development
                    </span>
                    <span 
                      className="region-tag" 
                      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ cursor: 'pointer' }}
                    >
                      Forex Training
                    </span>
                    <span 
                      className="region-tag" 
                      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ cursor: 'pointer' }}
                    >
                      Digital Marketing
                    </span>
                    <span 
                      className="region-tag" 
                      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ cursor: 'pointer' }}
                    >
                      ICT Training
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="contact-additional">
              <h4>Response Time</h4>
              <p>I typically respond within 24 hours during business days.</p>
              
              <h4>Project Consultation</h4>
              <p>Free initial consultation to discuss your project requirements and timeline.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
