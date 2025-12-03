// Projects component for ASACODER landing page
// Displays active projects with a horizontal slider
import { useRef } from 'react'
import { Globe2, LayoutPanelLeft, LineChart, Rocket, Users, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import './Projects.css'

const projects = [
  {
    title: 'TraderLibrary5',
    role: 'Founder & Creator',
    description:
      'A Forex-focused platform offering educational resources, eBooks, trading tools, broker reviews, and VIP trading signals to help traders improve their skills and make informed trading decisions.',
    tech: ['Forex Education', 'eBooks', 'Trading Tools'],
    link: '#',
    icon: <LayoutPanelLeft />,
    status: 'in production'
  },
  {
    title: 'WorldLinkerglobal.com',
    role: 'founder & Lead Developer',
    description:
      'A global contact connection platform powered by WhatsApp that connects buyers and sellers by location and business niche. Users must register and subscribe to access contacts.',
    tech: ['WhatsApp Automation', 'Subscriptions', 'Multi-region'],
    link: 'https://worldlinkerglobal.com',
    icon: <Globe2 />,
    status: 'In Production'
  },
  {
    title: 'Peer‑to‑Peer Sports Prediction Platform',
    role: 'Platform Architect',
    description:
      'A football prediction game in Cameroon where users can challenge each other, compete, and test their prediction skills in a peer‑to‑peer format.',
    tech: ['Node.js', 'Realtime', 'Payments'],
    link: '#',
    icon: <LineChart />,
    status: 'planned'
  },
  {
    title: 'SecretConnect.cm',
    role: 'founder & lead Developer',
    description:
      'An anonymous social and confession platform for Cameroonians to share thoughts, secrets, or meet people while keeping privacy protected.',
    tech: ['Anonymity', 'Moderation', 'Messaging'],
    link: '#',
    icon: <Users />,
    status: 'Planned'
  },
  {
    title: 'Cameroon Youth Skills & Opportunity Platform',
    role: 'founder & lead Developer',
    description:
      'A platform aimed at empowering youth in Cameroon by providing access to skills, job opportunities, and funding resources to grow their careers or businesses.',
    tech: ['Jobs', 'Funding', 'Training'],
    link: '#',
    icon: <Rocket />,
    status: 'Planned'
  },
  {
    title: 'TrustForexBrokers',
    role: 'founder & Lead Developer',
    description:
      'A website helping Forex traders find reliable brokers and learn about trading strategies, reviews, and educational content, including referral links for account openings.',
    tech: ['Broker Reviews', 'Affiliates', 'Education'],
    link: '#',
    icon: <ShieldCheck />,
    status: 'Planned'
  }
]

const Projects = () => {
  const trackRef = useRef(null)

  const scrollByCards = (direction) => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector('.project-card')
    if (!card) return

    const cardWidth = card.offsetWidth + 24 // width + gap
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="projects">
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 className="section-title">Featured Projects & Active Work</h2>
          <p className="section-subtitle">
            A snapshot of what I&apos;m building right now – from production apps to active training and marketing projects.
          </p>
        </div>

        <div className="projects-slider">
          <button
            type="button"
            className="projects-nav-btn left"
            onClick={() => scrollByCards(-1)}
            aria-label="Previous projects"
          >
            <ChevronLeft />
          </button>

          <div className="projects-track" ref={trackRef}>
            {projects.map((project, index) => (
              <article key={project.title + index} className="project-card">
                <div className="project-header">
                  <div className="project-icon-wrapper">{project.icon}</div>
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-role">{project.role}</p>
                  </div>
                  <span
                    className={`project-status ${
                      project.status.toLowerCase() === 'live' ? 'live' : 'active'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-meta">
                  <ul className="project-tech-list">
                    {project.tech.map((item) => (
                      <li key={item} className="project-tech-pill">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View project
                  </a>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="projects-nav-btn right"
            onClick={() => scrollByCards(1)}
            aria-label="Next projects"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects


