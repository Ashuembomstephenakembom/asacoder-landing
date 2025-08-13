// Navbar component for ASACODER landing page
// This component provides navigation and is sticky at the top
import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaCode } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  // Navigation links
  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <div className="brand-logo">
            <FaCode className="brand-icon" />
            <span className="brand-text">ASACODER</span>
          </div>
          <span className="brand-tagline">Digital Solutions</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              <button
                className="nav-link"
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav">
            {navLinks.map((link) => (
              <li key={link.id} className="mobile-nav-item">
                <button
                  className="mobile-nav-link"
                  onClick={() => scrollToSection(link.id)}
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
