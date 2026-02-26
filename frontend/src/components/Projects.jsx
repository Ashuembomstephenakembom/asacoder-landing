// Projects component for ASACODER landing page
// Full-width horizontal track with cards that slide in on scroll
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Globe2, LayoutPanelLeft, LineChart, Rocket, Users, ShieldCheck, ExternalLink, Store } from 'lucide-react'
import './Projects.css'

const projects = [
  {
    title: 'WorldLinkerGlobal',
    role: 'Founder & Developer',
    description:
      'A category-based contact discovery platform powered by WhatsApp, enabling people to connect by location, niche, and intent. Built to simplify how services and opportunities are found across regions while maintaining controlled access and privacy.',
    tech: ['Category & location-based discovery', 'WhatsApp-powered connections', 'Subscription-based access', 'Multi-region support'],
    link: 'https://worldlinkerglobal.com',
    icon: <Globe2 />,
    status: 'Live'
  },
  {
    title: 'CashTrack POS',
    role: 'Founder & Developer',
    description:
      'CashTrack POS is a cloud-based Point of Sale system built for small and medium businesses in Cameroon and across Africa. It focuses on one core problem: ensuring sales always match cash. Designed for retail shops, mini-markets, and growing businesses, CashTrack POS provides structured sales tracking, staff accountability, and real-time business control — even in low-connectivity environments.',
    tech: [
      'Sales tracking & daily reconciliation',
      'Role-based access (Owner / Staff view separation)',
      'Offline-first support (works without internet)',
      'Cloud sync & secure data storage',
      'Simple, clean interface for fast transactions'
    ],
    link: 'https://cashtrackpos.com',
    icon: <Store />,
    status: 'Live'
  },
  {
    title: 'TraderLibrary5',
    role: 'Founder & Developer',
    description:
      'A Forex-focused learning and resource platform designed to help traders build skills, confidence, and better decision-making through structured content and practical tools.',
    tech: ['Forex education & learning paths', 'Digital trading resources (eBooks & guides)', 'Trading tools and broker insights'],
    link: '#',
    icon: <LayoutPanelLeft />,
    status: 'In Production'
  },
  {
    title: 'Peer-to-Peer Sports Prediction Platform',
    role: 'Founder & Developer',
    description:
      'A skill-based football prediction platform tailored for Cameroon, where users challenge each other, compete, and track performance in a peer-to-peer environment.',
    tech: ['Real-time interactions', 'Competitive prediction system', 'Secure payments & scoring logic'],
    link: '#',
    icon: <LineChart />,
    status: 'Planned'
  },
  {
    title: 'SecretConnect.cm',
    role: 'Founder & Developer',
    description:
      'An anonymous social interaction platform designed for safe expression, conversations, and connections — with a strong emphasis on privacy, moderation, and responsible use.',
    tech: ['User anonymity', 'Content moderation', 'Private messaging'],
    link: '#',
    icon: <Users />,
    status: 'Planned'
  },
  {
    title: 'Cameroon Youth Skills & Opportunity Platform',
    role: 'Founder & Developer',
    description:
      'A platform focused on empowering Cameroonian youth by connecting them to skills development, job opportunities, and funding resources that support long-term growth.',
    tech: ['Skills & training access', 'Job opportunities', 'Funding & growth resources'],
    link: '#',
    icon: <Rocket />,
    status: 'Planned'
  },
  {
    title: 'TrustForexBrokers',
    role: 'Founder & Developer',
    description:
      'An educational and review platform helping Forex traders identify reliable brokers, understand trading conditions, and access learning materials — with a strong emphasis on transparency and trust.',
    tech: ['Broker reviews & comparisons', 'Educational content', 'Affiliate-driven referrals'],
    link: '#',
    icon: <ShieldCheck />,
    status: 'Planned'
  }
]

const cardVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
}

const Projects = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      {/* Section header - constrained width */}
      <div className="projects-header-wrap">
        <div className="section-header">
          <h2 className="section-title">Featured Projects & Active Work</h2>
          <p className="section-subtitle">
            A snapshot of products and platforms I&apos;m actively building, refining, and preparing for scale spanning trading, connectivity, education, and digital platforms focused on real-world impact. Need a similar solution? <Link to="/#contact" className="projects-internal-link">Get in touch</Link>.
          </p>
        </div>
      </div>

      {/* Full-width horizontal track - edge to edge */}
      <div className="projects-track-outer">
        <motion.div
          className="projects-track"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 }
            }
          }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title + index}
              className="project-card"
              variants={cardVariants}
              custom={index}
            >
              <div className="project-content">
                <div className="project-main">
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-info">
                    <div className="project-title-row">
                      <h3 className="project-title">{project.title}</h3>
                      <span className={`project-status ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="project-role">{project.role}</p>
                    <p className="project-description">{project.description}</p>
                    <div className="project-focus">
                      <h4 className="project-focus-title">
                        {(project.status === 'In Production' || project.status === 'Live') ? 'Focus Areas:' : 'Key Concepts:'}
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
