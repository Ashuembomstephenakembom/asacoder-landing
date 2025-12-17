// Navbar component for ASACODER landing page
// This component provides navigation and is sticky at the top
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.jpg'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle navigation click (scroll or external link)
  const handleNavClick = (id) => {
    if (id === 'store') {
      window.open('https://selar.com/m/traderlibrary', '_blank')
      setIsMenuOpen(false)
      return
    }

    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      setIsMenuOpen(false)
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const section = document.getElementById(id)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return
    }

    // If we're on the home page, just scroll to section
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Navigation links
  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'store', label: 'Store / eBooks' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">
            <img src={logo} alt="ASACODER Logo" className="brand-icon" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              <button
                className="nav-link"
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav">
            {navLinks.map((link) => (
              <li key={link.id} className="mobile-nav-item">
                <button
                  className="mobile-nav-link"
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
