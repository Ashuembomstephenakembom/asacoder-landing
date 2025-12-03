// Process component for ASACODER landing page
// This section explains the workflow and methodology used for projects

import { MessagesSquare, ClipboardList, Rocket, Headphones } from 'lucide-react'
import './Process.css'

const Process = () => {
  // Process steps data - Updated to match ASACODER's specific process
  const processSteps = [
    {
      icon: <MessagesSquare />,
      title: 'Discuss Your Needs',
      description: 'We start by understanding your goals and challenges.',
      details: [
        'Initial consultation call',
        'Requirements gathering',
        'Project scope discussion',
        'Budget and timeline planning'
      ]
    },
    {
      icon: <ClipboardList />,
      title: 'Plan the Solution',
      description: 'I design a tailored approach for your unique requirements.',
      details: [
        'Custom strategy development',
        'Technology selection',
        'Project timeline creation',
        'Resource allocation'
      ]
    },
    {
      icon: <Rocket />,
      title: 'Deliver With Quality',
      description: 'I execute with precision, ensuring the best outcome.',
      details: [
        'Development and implementation',
        'Quality assurance testing',
        'Performance optimization',
        'Final review and approval'
      ]
    },
    {
      icon: <Headphones />,
      title: 'Support & Growth',
      description: 'I provide ongoing guidance and updates to keep you moving forward.',
      details: [
        'Post-launch support',
        'Training and documentation',
        'Maintenance and updates',
        'Ongoing consultation'
      ]
    }
  ]

  return (
    <section id="process" className="process bg-dark">
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 className="section-title">From Idea to Impact in 4 Simple Steps</h2>
          <p className="section-subtitle">
            A proven 4-step process that ensures successful project delivery and lasting results
          </p>
        </div>

        {/* Process steps */}
        <div className="process-steps">
          {processSteps.map((step, index) => (
            <div key={index} className="process-step">
              {/* Step number */}
              <div className="step-number">
                <span>{index + 1}</span>
              </div>
              
              {/* Step content */}
              <div className="step-content">
                <div className="step-icon">
                  {step.icon}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                
                {/* Step details */}
                <ul className="step-details">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="step-detail">
                      <span className="detail-bullet">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process summary */}
        <div className="process-summary">
          <div className="summary-content">
            <h3>Why This Process Works</h3>
            <p>
              This systematic approach ensures that every project is delivered on time, within budget, 
              and exceeds expectations. By following these proven steps, we minimize risks and maximize 
              the success of your digital project.
            </p>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">On Time</span>
                <span className="stat-label">Project Delivery</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
