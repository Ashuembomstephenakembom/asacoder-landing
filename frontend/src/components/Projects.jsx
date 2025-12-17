// Projects component for ASACODER landing page
// Displays active projects in a clean list layout
import { Globe2, LayoutPanelLeft, LineChart, Rocket, Users, ShieldCheck, ExternalLink } from 'lucide-react'
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
    role: 'Founder & Lead Developer',
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
    role: 'Founder & Lead Developer',
    description:
      'An anonymous social and confession platform for Cameroonians to share thoughts, secrets, or meet people while keeping privacy protected.',
    tech: ['Anonymity', 'Moderation', 'Messaging'],
    link: '#',
    icon: <Users />,
    status: 'Planned'
  },
  {
    title: 'Cameroon Youth Skills & Opportunity Platform',
    role: 'Founder & Lead Developer',
    description:
      'A platform aimed at empowering youth in Cameroon by providing access to skills, job opportunities, and funding resources to grow their careers or businesses.',
    tech: ['Jobs', 'Funding', 'Training'],
    link: '#',
    icon: <Rocket />,
    status: 'Planned'
  },
  {
    title: 'TrustForexBrokers',
    role: 'Founder & Lead Developer',
    description:
      'A website helping Forex traders find reliable brokers and learn about trading strategies, reviews, and educational content, including referral links for account openings.',
    tech: ['Broker Reviews', 'Affiliates', 'Education'],
    link: '#',
    icon: <ShieldCheck />,
    status: 'Planned'
  }
]

const Projects = () => {
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

        <div className="projects-list">
          {projects.map((project, index) => (
            <article key={project.title + index} className="project-item">
              <div className="project-content">
                <div className="project-main">
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-info">
                    <div className="project-title-row">
                      <h3 className="project-title">{project.title}</h3>
                      <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="project-role">{project.role}</p>
                    <p className="project-description">{project.description}</p>
                    <div className="project-footer">
                      <ul className="project-tech-list">
                        {project.tech.map((item) => (
                          <li key={item} className="project-tech-tag">
                            {item}
                          </li>
                        ))}
                      </ul>
                      {project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <span>Visit</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects


