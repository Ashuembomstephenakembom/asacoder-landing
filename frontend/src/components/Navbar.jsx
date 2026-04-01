// Navbar component for ASACODER landing page
// This component provides navigation and is sticky at the top
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.jpg'
import './Navbar.css'

const Navbar = () => {
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

  const handleSectionLinkClick = (event, id) => {
    setIsMenuOpen(false)

    if (location.pathname !== '/') {
      return
    }

    event.preventDefault()
    const section = document.getElementById(id)
    if (section) {
      window.history.replaceState(null, '', id === 'hero' ? '/' : `/#${id}`)
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Navigation links
  const navLinks = [
    { id: 'hero', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/#about' },
    { id: 'services', label: 'Services', to: '/#services' },
    { id: 'projects', label: 'Projects', to: '/#projects' },
    { id: 'store', label: 'Store / eBooks', href: 'https://selar.com/m/traderlibrary', external: true },
    { id: 'process', label: 'Process', to: '/#process' },
    { id: 'contact', label: 'Contact', to: '/#contact' }
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand" aria-label="ASACODER home">
          <div className="brand-logo">
            <img src={logo} alt="ASACODER Logo" className="brand-icon" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              {link.external ? (
                <a className="nav-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link
                  className="nav-link"
                  to={link.to}
                  onClick={(event) => handleSectionLinkClick(event, link.id)}
                >
                  {link.label}
                </Link>
              )}
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
                {link.external ? (
                  <a className="mobile-nav-link" href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </a>
                ) : (
                  <Link
                    className="mobile-nav-link"
                    to={link.to}
                    onClick={(event) => handleSectionLinkClick(event, link.id)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
