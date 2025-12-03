// Main App component for ASACODER landing page
// This component will contain all the sections of the landing page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
