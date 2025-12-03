// About component for ASACODER landing page
// This section showcases personal background, experience, and skills
import { Code2, LineChart, Megaphone, Laptop } from 'lucide-react'
import './About.css'

const About = () => {
  // Skills data - Updated to match ASACODER's specific skills
  const skills = [
    { name: 'Web Development', icon: <Code2 />, level: 95, description: 'Modern, responsive, optimized websites' },
    { name: 'Forex Trading', icon: <LineChart />, level: 90, description: 'Mentorship & signals' },
    { name: 'Digital Marketing', icon: <Megaphone />, level: 85, description: 'Social media growth & ad campaigns' },
    { name: 'ICT/Microsoft Office Training', icon: <Laptop />, level: 90, description: 'Professional lessons' }
  ]

  return (
    <section id="about" className="about bg-light">
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 className="section-title">Meet Ashuembom Stephen Akembom - Professional Web Developer &amp; Digital Expert</h2>
          <p className="section-subtitle">
            Experienced full-stack developer and digital solutions specialist with expertise in React.js, Node.js, MongoDB, forex trading, and digital marketing
          </p>
        </div>

        <div className="about-content">
          {/* Personal information */}
          <div className="about-text">
            <h3>Who I Am</h3>
            <p>
              I&apos;m a professional full-stack web developer and digital solutions expert with over 5 years of experience in creating modern web applications. 
              Specializing in React.js, Node.js, and MongoDB development, I build scalable, responsive websites that drive business growth and user engagement.
            </p>
            
            <p>
              Beyond web development, I&apos;m a certified forex trading mentor helping traders achieve consistent profits, 
              a digital marketing specialist creating impactful campaigns, and an ICT trainer empowering teams with essential computer skills.
            </p>

            <h3>My Approach</h3>
            <p>
              I approach every project with a focus on results, user experience, and long-term success. 
              Whether it&apos;s developing a website, providing forex guidance, or teaching digital skills, 
              I ensure that my clients and students achieve their goals and exceed their expectations.
            </p>
          </div>

          {/* Skills section */}
          <div className="about-skills">
            <h3>Skills Overview</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                  <p className="skill-description">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience highlights */}
        <div className="about-highlights">
          <div className="highlight-item">
            <div className="highlight-number">2+</div>
            <div className="highlight-label">Years Experience</div>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">5+</div>
            <div className="highlight-label">Projects Completed</div>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">10+</div>
            <div className="highlight-label">Students Trained</div>
          </div>
          <div className="highlight-item">
            <div className="highlight-number">24/7</div>
            <div className="highlight-label">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
