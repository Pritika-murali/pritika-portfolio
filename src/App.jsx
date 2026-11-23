import React, { useState, useRef } from 'react'
import InteractiveCharacter from './components/InteractiveCharacter'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [mailDrafted, setMailDrafted] = useState(false)
  const heroRef = useRef(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pritikamurali06@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.message) return

    // Create a real mailto link so the message is actually sent via user's email client
    const subject = encodeURIComponent(contactForm.subject || `Portfolio Inquiry from ${contactForm.name}`)
    const body = encodeURIComponent(
      `Hello Pritika,\n\nMy Name: ${contactForm.name}\nMy Email: ${contactForm.email || 'Not provided'}\n\nMessage:\n${contactForm.message}`
    )
    window.location.href = `mailto:pritikamurali06@gmail.com?subject=${subject}&body=${body}`

    setMailDrafted(true)
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' })
      setMailDrafted(false)
    }, 5000)
  }

  const skillsData = [
    {
      category: 'Frontend Development',
      icon: '🌐',
      skills: ['HTML', 'CSS', 'JavaScript', 'React.js']
    },
    {
      category: 'Programming Languages',
      icon: '🐍',
      skills: ['Python']
    },
    {
      category: 'Database & APIs',
      icon: '🗄️',
      skills: ['MySQL', 'REST APIs']
    },
    {
      category: 'UI/UX Design',
      icon: '🎨',
      skills: ['Figma', 'Wireframing', 'Prototyping', 'UI/UX Design']
    },
    {
      category: 'Internet of Things (IoT)',
      icon: '📡',
      skills: ['ESP32', 'Sensor Integration', 'IoT Fundamentals']
    }
  ]

  const projectsData = [
    {
      id: 1,
      title: 'ShrimpSense AI',
      subtitle: 'IoT-Based Smart Shrimp Farming Solution',
      description:
        'An IoT-based intelligent shrimp farming monitoring solution designed to monitor important pond conditions and support better, data-driven farming decisions.',
      technologies: ['ESP32', 'Sensors', 'AI/ML', 'IoT Dashboard'],
      achievement: '🏆 Winner – Best Business Potential Award at SRM Hackathon (Prize: ₹7,000)',
      highlightType: 'winner'
    },
    {
      id: 2,
      title: 'SkySense AI',
      subtitle: 'Environmental & Weather Intelligence System',
      description:
        'An intelligent environmental and weather monitoring system combining sensor telemetry, machine learning algorithms and a web dashboard for predictive analysis.',
      technologies: ['ESP32', 'Flask', 'Python', 'Random Forest', 'Sensors'],
      achievement: '📊 Sensor telemetry with ML classification'
    },
    {
      id: 3,
      title: 'E-Tongue',
      subtitle: 'IoT Healthcare & Ayurveda Telemetry',
      description:
        'An IoT-based healthcare and Ayurveda-related project developed in the context of the Smart India Hackathon. Focuses on hardware architecture, sensor integration and sensor testing.',
      technologies: ['Hardware Architecture', 'Sensor Integration', 'Testing', 'IoT'],
      achievement: '💡 Developed for Smart India Hackathon (SIH)'
    },
    {
      id: 4,
      title: 'DocSync',
      subtitle: 'Medical Connectivity & Collaboration Platform',
      description:
        'A comprehensive UI/UX prototype meticulously designed to improve connectivity, referral coordination and real-time clinical communication between medical doctors.',
      technologies: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
      achievement: '🥉 Third Place – IEEE UI/UX Competition',
      highlightType: 'award'
    },
    {
      id: 5,
      title: 'SevaSphere',
      subtitle: 'Essential Services & NGO Locator',
      description:
        'A humanitarian service locator concept designed to seamlessly connect NGOs providing food, healthcare and essential welfare services with citizens and communities in need.',
      technologies: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
      achievement: '🤝 Social Welfare Technology Solution'
    }
  ]

  const interests = [
    { title: 'Frontend & Full Stack', icon: '💻', desc: 'Crafting responsive, high-performance web applications.' },
    { title: 'UI/UX Design', icon: '✨', desc: 'Designing intuitive wireframes, interfaces and design systems in Figma.' },
    { title: 'Artificial Intelligence', icon: '🧠', desc: 'Applying machine learning and intelligent models to real-world datasets.' },
    { title: 'Internet of Things (IoT)', icon: '📡', desc: 'Connecting ESP32 microcontrollers, hardware sensors and cloud dashboards.' },
    { title: 'Interactive Web Experiences', icon: '🕹️', desc: 'Building creative, cursor-controlled and immersive web interactions.' },
    { title: 'Hackathons & Problem Solving', icon: '🚀', desc: 'Prototyping impactful solutions under competitive hackathon timelines.' }
  ]

  return (
    <div className="portfolio-app">
      {/* Top Navigation */}
      <header className="cinematic-navbar">
        <div className="nav-container">
          <a href="#" className="brand-logo" aria-label="PRITIKA M Home">
            <span className="brand-dot"></span>
            <span className="brand-text">PRITIKA M</span>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="nav-actions">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              title="Open Resume PDF in a new tab"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Resume</span>
            </a>
            <a href="#contact" className="btn btn-crimson">Get in Touch</a>

            {/* Mobile menu toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View Resume (PDF)
            </a>
          </div>
        )}
      </header>

      <main>
        {/* ========================================================================= */}
        {/* 1. IMMERSIVE RED CINEMATIC HERO SECTION                                    */}
        {/* ========================================================================= */}
        <section className="cinematic-hero" ref={heroRef} id="hero">
          {/* Subtle atmospheric lighting */}
          <div className="hero-radial-glow"></div>
          <div className="hero-vignette-overlay"></div>

          {/* Top text block */}
          <div className="hero-text-container">
            <span className="hero-eyebrow">
              <span className="pulse-dot"></span>
              Computer Science & Engineering Student | Frontend Developer | UI/UX Enthusiast
            </span>

            <h1 className="hero-cinematic-title">HI, I'M PRITIKA.</h1>

            <p className="hero-cinematic-tagline">
              Designing. Building. Creating.
            </p>

            <p className="hero-cinematic-desc">
              Building thoughtful digital experiences through code, creativity and technology.
            </p>
          </div>

          {/* Central Character Stage (No boxes, no cards, borderless blending) */}
          <div className="hero-character-stage">
            <InteractiveCharacter heroRef={heroRef} />
          </div>

          {/* Bottom quick navigation */}
          <div className="hero-bottom-actions">
            <a href="#about" className="hero-scroll-cue" aria-label="Scroll to About Section">
              <span>Explore My Work</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ABOUT ME SECTION                                                      */}
        {/* ========================================================================= */}
        <section id="about" className="section about-section">
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">More than just code — creativity meets technology.</h2>
            <p className="section-description">
              I'm a Computer Science and Engineering student specializing in IoT, passionate about creating meaningful
              applications by combining frontend development, user experience design, AI and connected technologies.
            </p>
          </div>

          {/* Education & Overview Highlights */}
          <div className="about-details-grid">
            <div className="about-card education-card">
              <div className="card-top-icon">🎓</div>
              <span className="card-badge">Education</span>
              <h3 className="education-degree">B.E. Computer Science and Engineering</h3>
              <p className="education-specialization">Specialization in Internet of Things (IoT)</p>
              
              <div className="education-meta">
                <div className="meta-item">
                  <span className="meta-label">Institution</span>
                  <span className="meta-value">Sri Krishna College of Technology (SKCT)</span>
                  <span className="meta-sub">Coimbatore, Tamil Nadu, India</span>
                </div>
                <div className="meta-stats-row">
                  <div className="meta-pill">
                    <span className="meta-pill-label">Graduation</span>
                    <span className="meta-pill-val">Expected 2028</span>
                  </div>
                  <div className="meta-pill accent">
                    <span className="meta-pill-label">Current CGPA</span>
                    <span className="meta-pill-val">7.7 / 10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-card intro-card">
              <div className="card-top-icon">📍</div>
              <span className="card-badge">Location & Profile</span>
              <h3 className="intro-name">PRITIKA M</h3>
              <p className="intro-location">Coimbatore, Tamil Nadu, India</p>
              <p className="intro-text">
                "Hi, I'm Pritika — a Computer Science and Engineering student specializing in IoT, passionate about
                building creative digital experiences, interactive web applications and intelligent technology solutions."
              </p>
              <div className="quick-tags-wrap">
                <span className="tag-pill">IoT & Hardware</span>
                <span className="tag-pill">React & Web</span>
                <span className="tag-pill">Figma Prototyping</span>
                <span className="tag-pill">AI & ML</span>
              </div>
            </div>
          </div>

          {/* Core Areas of Interest */}
          <div className="interests-header">
            <h3 className="subsection-title">Areas of Interest & Passion</h3>
          </div>

          <div className="interests-grid">
            {interests.map((item, idx) => (
              <div key={idx} className="interest-item">
                <span className="interest-icon">{item.icon}</span>
                <h4 className="interest-title">{item.title}</h4>
                <p className="interest-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SKILLS SECTION                                                        */}
        {/* ========================================================================= */}
        <section id="skills" className="section skills-section">
          <div className="section-header">
            <span className="section-tag">Technical Capabilities</span>
            <h2 className="section-title">My Real-World Skills</h2>
            <p className="section-description">
              An honest representation of the tools, technologies and design methodologies I use to engineer projects.
            </p>
          </div>

          <div className="skills-categories-grid">
            {skillsData.map((group, idx) => (
              <div key={idx} className="skill-category-card">
                <div className="skill-cat-header">
                  <span className="skill-cat-icon">{group.icon}</span>
                  <h3 className="skill-cat-title">{group.category}</h3>
                </div>
                <div className="skill-pills-list">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-pill">
                      <span className="skill-dot"></span>
                      <span className="skill-label">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ACTUAL PROJECTS SECTION                                               */}
        {/* ========================================================================= */}
        <section id="projects" className="section projects-section">
          <div className="section-header">
            <span className="section-tag">Portfolio Showcase</span>
            <h2 className="section-title">Actual Projects & Inventions</h2>
            <p className="section-description">
              Practical implementations developed for competitions, hackathons and research.
            </p>
          </div>

          <div className="projects-cards-list">
            {projectsData.map((proj) => (
              <article key={proj.id} className="project-feature-card">
                <div className="project-header">
                  <div className="project-title-area">
                    <span className="project-num">Project #{proj.id}</span>
                    <h3 className="project-name">{proj.title}</h3>
                    <p className="project-subtitle">{proj.subtitle}</p>
                  </div>
                  {proj.achievement && (
                    <div className={`project-award-badge ${proj.highlightType || ''}`}>
                      {proj.achievement}
                    </div>
                  )}
                </div>

                <p className="project-text">{proj.description}</p>

                <div className="project-tech-stack">
                  <span className="tech-label">Technologies:</span>
                  <div className="tech-chips">
                    {proj.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="tech-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. INTERNSHIP & ACHIEVEMENTS SECTION                                     */}
        {/* ========================================================================= */}
        <section id="experience" className="section experience-section">
          <div className="section-header">
            <span className="section-tag">Milestones</span>
            <h2 className="section-title">Internship & Key Achievements</h2>
            <p className="section-description">
              Professional training, competitive hackathon recognitions, and certifications.
            </p>
          </div>

          <div className="experience-dual-grid">
            {/* Internship Column */}
            <div className="experience-column">
              <h3 className="column-heading">
                <span className="heading-icon">💼</span> Internship Experience
              </h3>

              <div className="timeline-card">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-dates">Coimbatore, Tamil Nadu</div>
                  <h4 className="timeline-role">IoT Intern</h4>
                  <div className="timeline-org">App Innovation Technologies Pvt. Ltd.</div>
                  <p className="timeline-desc">
                    Worked hands-on with IoT hardware, sensor telemetry, and smart device connectivity,
                    gaining practical industry experience in integrating microcontrollers with software dashboards.
                  </p>
                  <div className="timeline-tags">
                    <span className="sub-tag">IoT Development</span>
                    <span className="sub-tag">Sensor Integration</span>
                    <span className="sub-tag">Device Testing</span>
                  </div>
                </div>
              </div>

              {/* Certifications Block */}
              <div className="certifications-block">
                <h4 className="cert-heading">
                  <span className="heading-icon">📜</span> Certifications
                </h4>
                <ul className="cert-list">
                  <li>
                    <span className="cert-bullet">✓</span>
                    <div>
                      <strong>NPTEL</strong> – Introduction to IoT
                    </div>
                  </li>
                  <li>
                    <span className="cert-bullet">✓</span>
                    <div>
                      <strong>NPTEL</strong> – Internet Crimes and Cyber Security
                    </div>
                  </li>
                  <li>
                    <span className="cert-bullet">✓</span>
                    <div>
                      <strong>Coursera</strong> – AI for Everyone
                    </div>
                  </li>
                  <li>
                    <span className="cert-bullet">✓</span>
                    <div>
                      <strong>Introduction to AI</strong> – Foundational Concepts & Applications
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Achievements Column */}
            <div className="experience-column">
              <h3 className="column-heading">
                <span className="heading-icon">🏆</span> Hackathons & Competitions
              </h3>

              <div className="achievements-cards-stack">
                <div className="achievement-item gold">
                  <div className="award-trophy">🥇</div>
                  <div className="award-info">
                    <h4>Best Business Potential Award</h4>
                    <p className="award-event">SRM Hackathon • ShrimpSense AI Project</p>
                    <p className="award-meta">
                      Awarded 1st place in Business Viability along with a cash prize of <strong>₹7,000</strong> for designing an intelligent, scalable IoT solution for aquaculture monitoring.
                    </p>
                  </div>
                </div>

                <div className="achievement-item bronze">
                  <div className="award-trophy">🥉</div>
                  <div className="award-info">
                    <h4>Third Place – IEEE UI/UX Competition</h4>
                    <p className="award-event">IEEE Student Branch • DocSync Prototype</p>
                    <p className="award-meta">
                      Recognized for exceptional healthcare workflow modeling, interactive doctor collaboration prototyping, and accessible interface design in Figma.
                    </p>
                  </div>
                </div>

                <div className="achievement-item blue">
                  <div className="award-trophy">🇮🇳</div>
                  <div className="award-info">
                    <h4>Smart India Hackathon (SIH)</h4>
                    <p className="award-event">National Initiative • E-Tongue Healthcare Project</p>
                    <p className="award-meta">
                      Participated in the premier national innovation initiative, developing hardware architecture and sensor testing for traditional Ayurveda quality telemetry.
                    </p>
                  </div>
                </div>

                <div className="achievement-item purple">
                  <div className="award-trophy">⚡</div>
                  <div className="award-info">
                    <h4>Hackathon & Innovation Competitions</h4>
                    <p className="award-event">Technical Symposiums & University Competitions</p>
                    <p className="award-meta">
                      Regular competitor in problem-solving hackathons, building IoT prototypes, machine learning integrations, and creative web solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CONTACT SECTION                                                       */}
        {/* ========================================================================= */}
        <section id="contact" className="section contact-section">
          <div className="section-header">
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-title">Let's Connect & Collaborate</h2>
            <p className="section-description">
              Have an opportunity, collaboration idea, or question? Feel free to reach out directly.
            </p>
          </div>

          <div className="contact-card-wrapper">
            {/* Direct Contact Information */}
            <div className="contact-direct-info">
              <h3 className="direct-info-title">Contact Channels</h3>
              <p className="direct-info-sub">
                Always open to discussions regarding internship opportunities, hackathon collaborations, and tech initiatives.
              </p>

              <div className="contact-links-list">
                <a href="mailto:pritikamurali06@gmail.com" className="contact-link-row">
                  <div className="link-icon-box">✉️</div>
                  <div className="link-text-content">
                    <span className="link-type">Email Address</span>
                    <span className="link-val">pritikamurali06@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+918248889053" className="contact-link-row">
                  <div className="link-icon-box">📞</div>
                  <div className="link-text-content">
                    <span className="link-type">Phone Number</span>
                    <span className="link-val">+91 8248889053</span>
                  </div>
                </a>

                <div className="contact-link-row static">
                  <div className="link-icon-box">📍</div>
                  <div className="link-text-content">
                    <span className="link-type">Location</span>
                    <span className="link-val">Coimbatore, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              {/* Social and Coding Profiles */}
              <div className="social-profiles-area">
                <span className="profiles-label">Online Profiles:</span>
                <div className="social-buttons-grid">
                  <a
                    href="https://github.com/Pritika-murali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/pritika-murali-aa1875325"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://leetcode.com/u/pritikamurali/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c.058-.087.122-.17.195-.248l4.903-4.903c.54-.54.54-1.414 0-1.954A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z" />
                    </svg>
                    <span>LeetCode</span>
                  </a>
                </div>
              </div>

              <div className="copy-email-box">
                <button onClick={handleCopyEmail} className="btn-copy-email">
                  {copiedEmail ? '✓ Email Copied to Clipboard!' : '📋 Copy Email Address'}
                </button>
              </div>
            </div>

            {/* Functional Mail Dispatch Form */}
            <div className="contact-form-panel">
              <h3 className="form-panel-title">Send a Direct Message</h3>
              <p className="form-panel-sub">
                Submitting this form prepares a message draft directly in your default email client.
              </p>

              {mailDrafted && (
                <div className="mail-draft-notice">
                  <span className="notice-icon">✓</span>
                  <span>Opening your email client with your pre-filled message...</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="direct-mail-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Jane Doe"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Your Email (optional)</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="jane@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Project Inquiry / Collaboration"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows="4"
                    placeholder="Hello Pritika, I would like to discuss..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-crimson btn-block">
                  Send Message via Email
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="cinematic-footer">
        <div className="footer-inner">
          <div className="footer-brand-block">
            <span className="brand-dot"></span>
            <span className="brand-text">PRITIKA M</span>
          </div>
          <p className="footer-tagline">
            Building thoughtful digital experiences through code, creativity and technology.
          </p>
          <div className="footer-nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Pritika M • Coimbatore, Tamil Nadu, India.
          </div>
        </div>
      </footer>
    </div>
  )
}
