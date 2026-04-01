// Services component for ASACODER landing page
// This section showcases the services and solutions offered
import { Link } from 'react-router-dom'
import { Globe, Megaphone, LineChart, Laptop } from 'lucide-react'
import digitalMarketingImage from '../assets/Digital-Marketing-Vs-Web-Development.webp'
import forexEducationImage from '../assets/forex-education-courses-.png'
import './Services.css'

const Services = () => {
  // Services data - Updated to match ASACODER's specific services
  const services = [
    {
      icon: <Globe />,
      title: 'Website Development',
      description: 'Modern, responsive, and fast-loading websites built with React, Node.js, and MongoDB. From personal portfolios to business landing pages, I create digital platforms that stand out.',
      features: ['Custom React/Node.js Sites', 'Landing Pages', 'E-commerce Platforms', 'Responsive Design']
    },
    {
      icon: <Megaphone />,
      title: 'Digital Marketing',
      description: 'Social media management, content creation, and targeted ad campaigns that drive real engagement and increase sales.',
      features: ['Facebook/Instagram Ads', 'Account Growth', 'Social Media Management', 'Campaign Analytics']
    },
    {
      icon: <LineChart />,
      title: 'Forex Training & Signals',
      description: 'Personalized forex trading lessons, market insights, and trading signals to help you trade with confidence.',
      features: ['Trading Education', 'Professional Signals', 'Risk Management', 'Market Analysis']
    },
    {
      icon: <Laptop />,
      title: 'Microsoft Office & ICT Training',
      description: 'Step-by-step training in Word, Excel, PowerPoint, and core computer skills to boost your productivity and career.',
      features: ['Word, Excel, PowerPoint', 'Professional Lessons', 'Practical Exercises', 'Certification Prep']
    }
  ]

  return (
    <section
      id="services"
      className="services"
      style={{
        '--services-digital-image': `url("${digitalMarketingImage}")`,
        '--services-forex-image': `url("${forexEducationImage}")`
      }}
    >
      <div className="services-background" aria-hidden="true">
        <div className="services-background-image services-background-image-left"></div>
        <div className="services-background-image services-background-image-right"></div>
      </div>
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 className="section-title">Professional Web Development & Digital Services</h2>
          <p className="section-subtitle">
            Expert React.js, Node.js development, forex trading mentorship, and digital marketing solutions for businesses and individuals
          </p>
        </div>

        {/* Services grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              {/* Service features */}
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="service-feature">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to action - internal link to contact and process */}
        <div className="services-cta">
          <h3>Ready to Start Your Project?</h3>
          <p>
            See <Link to="/#process" className="services-internal-link">how I work</Link> in 4 simple steps, then{' '}
            <Link to="/#contact" className="services-internal-link">get a free consultation</Link>.
          </p>
          <Link className="btn btn-primary" to="/#contact">
            Get Free Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
