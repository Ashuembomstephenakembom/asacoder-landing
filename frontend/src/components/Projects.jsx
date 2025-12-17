// Projects component for ASACODER landing page
// Displays active projects in a clean list layout
import { Globe2, LayoutPanelLeft, LineChart, Rocket, Users, ShieldCheck, ExternalLink } from 'lucide-react'
import './Projects.css'

const projects = [
  {
    title: 'TraderLibrary5',
    role: 'Founder & Creator',
    description:
      'A Forex-focused learning and resource platform designed to help traders build skills, confidence, and better decision-making through structured content and practical tools.',
    tech: ['Forex education & learning paths', 'Digital trading resources (eBooks & guides)', 'Trading tools and broker insights'],
    link: '#',
    icon: <LayoutPanelLeft />,
    status: 'In Production'
  },
  {
    title: 'WorldLinkerGlobal',
    role: 'Founder & Lead Developer',
    description:
      'A category-based contact discovery platform powered by WhatsApp, enabling people to connect by location, niche, and intent. Built to simplify how services and opportunities are found across regions while maintaining controlled access and privacy.',
    tech: ['Category & location-based discovery', 'WhatsApp-powered connections', 'Subscription-based access', 'Multi-region support'],
    link: 'https://worldlinkerglobal.com',
    icon: <Globe2 />,
    status: 'In Production'
  },
  {
    title: 'Peer-to-Peer Sports Prediction Platform',
    role: 'Platform Architect',
    description:
      'A skill-based football prediction platform tailored for Cameroon, where users challenge each other, compete, and track performance in a peer-to-peer environment.',
    tech: ['Real-time interactions', 'Competitive prediction system', 'Secure payments & scoring logic'],
    link: '#',
    icon: <LineChart />,
    status: 'Planned'
  },
  {
    title: 'SecretConnect.cm',
    role: 'Founder & Lead Developer',
    description:
      'An anonymous social interaction platform designed for safe expression, conversations, and connections — with a strong emphasis on privacy, moderation, and responsible use.',
    tech: ['User anonymity', 'Content moderation', 'Private messaging'],
    link: '#',
    icon: <Users />,
    status: 'Planned'
  },
  {
    title: 'Cameroon Youth Skills & Opportunity Platform',
    role: 'Founder & Lead Developer',
    description:
      'A platform focused on empowering Cameroonian youth by connecting them to skills development, job opportunities, and funding resources that support long-term growth.',
    tech: ['Skills & training access', 'Job opportunities', 'Funding & growth resources'],
    link: '#',
    icon: <Rocket />,
    status: 'Planned'
  },
  {
    title: 'TrustForexBrokers',
    role: 'Founder & Lead Developer',
    description:
      'An educational and review platform helping Forex traders identify reliable brokers, understand trading conditions, and access learning materials — with a strong emphasis on transparency and trust.',
    tech: ['Broker reviews & comparisons', 'Educational content', 'Affiliate-driven referrals'],
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
            A snapshot of products and platforms I&apos;m actively building, refining, and preparing for scale spanning trading, connectivity, education, and digital platforms focused on real-world impact.
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
                      <span className={`project-status ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        Status: {project.status}
                      </span>
                    </div>
                    <p className="project-role">Role: {project.role}</p>
                    <p className="project-description">{project.description}</p>
                    <div className="project-focus">
                      <h4 className="project-focus-title">
                        {project.status === 'In Production' ? 'Focus Areas:' : 'Key Concepts:'}
                      </h4>
                      <ul className="project-tech-list">
                        {project.tech.map((item) => (
                          <li key={item} className="project-tech-tag">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {project.link !== '#' && (
                      <div className="project-footer">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <span>Visit</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    )}
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


