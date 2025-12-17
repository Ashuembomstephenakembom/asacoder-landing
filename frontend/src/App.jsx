// Main App component for ASACODER landing page
// This component will contain all the sections of the landing page
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import './App.css'
import './components/MobileAnimations.css'

// Import all the components (we'll create these next)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import Contact from './components/Contact'

import ConnectionStatus from './components/ConnectionStatus'
import Footer from './components/Footer'

// Lazy load route components to avoid circular dependency issues
const AdminPanel = lazy(() => import('./components/AdminPanel'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="App">
      {/* Navigation bar - fixed at the top */}
      <Navbar />
      
      {/* Main content sections */}
      <main>
        {/* Hero section - first thing visitors see */}
        <Hero />
        
        {/* About section - personal information and background */}
        <About />
        
        {/* Services section - what you offer */}
        <Services />

        {/* Projects section - recent work */}
        <Projects />
        
        {/* Process section - how you work */}
        <Process />
        
        {/* Contact section - contact form and information */}
        <Contact />
      </main>
      

      
      {/* Connection Status (only in development) */}
      <ConnectionStatus />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Don't scroll for static files (they're handled by the server)
    const staticFileExtensions = ['.xml', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.css', '.js', '.json', '.woff', '.woff2', '.ttf', '.eot', '.html']
    const isStaticFile = staticFileExtensions.some(ext => pathname.endsWith(ext))
    
    if (!isStaticFile) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])

  return null
}

// Component to handle static files (suppresses React Router warnings)
const StaticFileHandler = () => {
  useEffect(() => {
    // Static files are served by the server, not React Router
    // This component just suppresses the "No routes matched" warning
  }, [])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div>
            <h2>Loading...</h2>
            <p>Please wait while we load the page.</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* Catch-all route for static files - these are handled by the server */}
          <Route path="*" element={<StaticFileHandler />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
