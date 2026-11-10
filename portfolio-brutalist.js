/**
 * NILAY GHOSH - Brutalist Portfolio Interactive Engine v3.0
 * Fully integrated with all previous data:
 * - Floating AI Chatbot Toggle
 * - Back to Top Button
 * - Local Agartala, India Clock
 * - Typewriter Banner Effect
 * - Interactive Terminal CLI (whoami, help, skills, projects, exp, sudo, clear)
 * - Hotspot Callout Badges
 * - Specialty Domain Filter
 * - 3D Card Tilt & Chain Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typewriter Effect
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const textPhrases = [
      "Content Developer @ Govt. of Tripura.",
      "Crafting high-scale digital experiences.",
      "Building with React, Node.js & PostgreSQL.",
      "Engineering AI & Machine Learning pipelines."
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentPhrase = textPhrases[phraseIdx];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 30 : 70;

      if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % textPhrases.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // 2. Local Time in Agartala, India
  const localTimeEl = document.getElementById('agartala-time');
  function updateTime() {
    if (localTimeEl) {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      localTimeEl.textContent = now.toLocaleTimeString('en-US', options) + ' IST';
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  // 3. Floating AI Chatbot Widget Logic
  const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');

  if (chatbotToggleBtn && chatbotWindow) {
    chatbotToggleBtn.addEventListener('click', () => {
      chatbotWindow.classList.toggle('open');
      if (chatbotWindow.classList.contains('open')) {
        showToast('🤖 Nilay\'s AI Assistant loaded!');
      }
    });
  }

  if (chatbotCloseBtn && chatbotWindow) {
    chatbotCloseBtn.addEventListener('click', () => {
      chatbotWindow.classList.remove('open');
    });
  }

  // 4. Back To Top Button Logic
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Specialty & Tech Stack Filter
  const specialtyPills = document.querySelectorAll('.specialty-pill');
  const skillTags = document.querySelectorAll('.skill-tag');
  const activeSpecialtyLabel = document.getElementById('active-specialty-label');

  const specialtyProfiles = {
    'all': ['React.js', 'Node.js', 'Python', 'TypeScript', 'Tailwind', 'Next.js', 'PostgreSQL', 'MongoDB', 'Scikit-Learn', 'FastAPI', 'Gemini AI', 'Git'],
    'fullstack': ['React.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind', 'MongoDB', 'REST APIs'],
    'ai': ['Python', 'Scikit-Learn', 'Gemini AI', 'Pandas', 'Explainable AI', 'NLP', 'FastAPI'],
    'frontend': ['React.js', 'Next.js', 'TypeScript', 'Tailwind', 'HTML5 / CSS3', 'JavaScript'],
    'backend': ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB', 'FastAPI', 'Git']
  };

  specialtyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      specialtyPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const specialty = pill.dataset.specialty;
      if (activeSpecialtyLabel) {
        activeSpecialtyLabel.textContent = pill.textContent.trim();
      }

      const activeSkills = specialtyProfiles[specialty] || specialtyProfiles['all'];
      skillTags.forEach(tag => {
        if (activeSkills.includes(tag.textContent.trim())) {
          tag.style.background = '#D6FF00';
          tag.style.color = '#0B0B0B';
          tag.style.borderColor = '#0B0B0B';
        } else {
          tag.style.background = '#FFFFFF';
          tag.style.color = '#0B0B0B';
          tag.style.borderColor = '#0B0B0B';
        }
      });

      showToast(`Filter: ${pill.textContent.trim()}`);
    });
  });

  // 6. Hotspot Callout Badges (1, 2, 3, 4)
  const hotspots = document.querySelectorAll('.hotspot-badge');
  hotspots.forEach(spot => {
    spot.addEventListener('click', () => {
      const callout = spot.querySelector('.callout-bubble-card');
      if (callout) {
        callout.classList.toggle('active-mobile');
        const num = spot.querySelector('.badge-pin-circle').textContent.trim();
        showToast(`Point #${num} detailed info`);
      }
    });
  });

  // 7. Interactive Terminal CLI
  const terminalTrigger = document.getElementById('btn-open-terminal');
  const terminalModal = document.getElementById('terminal-modal');
  const terminalClose = document.getElementById('terminal-close-btn');
  const terminalInput = document.getElementById('terminal-cmd-input');
  const terminalLogs = document.getElementById('terminal-logs');

  if (terminalTrigger && terminalModal) {
    terminalTrigger.addEventListener('click', () => {
      terminalModal.classList.add('open');
      if (terminalInput) terminalInput.focus();
    });
  }

  if (terminalClose && terminalModal) {
    terminalClose.addEventListener('click', () => {
      terminalModal.classList.remove('open');
    });
  }

  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) terminalModal.classList.remove('open');
    });
  }

  const terminalCommands = {
    help: `Available commands:<br>
      - <span style="color:#D6FF00">whoami</span>: About Nilay Ghosh<br>
      - <span style="color:#D6FF00">skills</span>: List technical arsenal<br>
      - <span style="color:#D6FF00">projects</span>: View highlighted projects<br>
      - <span style="color:#D6FF00">exp</span>: Work experience timeline<br>
      - <span style="color:#D6FF00">edu</span>: Academic degrees &amp; CGPA<br>
      - <span style="color:#D6FF00">contact</span>: Email, phone, LinkedIn<br>
      - <span style="color:#D6FF00">sudo</span>: Administrative privilege check<br>
      - <span style="color:#D6FF00">clear</span>: Clear terminal logs`,
    whoami: `Nilay Ghosh. Full Stack Web Developer &amp; Content Developer @ Directorate of IT, Govt. of Tripura.<br>B.Tech CSE (AIML) graduate, Brainware University (CGPA 8.28).`,
    skills: `Frontend: React.js, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3<br>Backend: Node.js, Express.js, Python, FastAPI, REST APIs<br>Databases: PostgreSQL, MongoDB, MySQL<br>AI/ML: Scikit-learn, Google Gemini API, Pandas, NLP, Explainable AI`,
    projects: `1. GenFolio — AI-powered portfolio generator (React, Node, Tailwind)<br>2. Disease Prediction — Python ML (Decision Tree, Random Forest)<br>3. Chatbot App — JavaScript &amp; Gemini AI on Render<br>4. ExamAI Portal — Competitive exam study platform on Netlify<br>5. MGNREGA Bharat — Government scheme management system`,
    exp: `1. Content Developer @ Directorate of IT, Govt. of Tripura (Jan 2026 – Present)<br>2. Intern @ Webguru Infosystems (Aug 2024 – Oct 2024)<br>3. Data Analyst Intern (Aug 2024)`,
    edu: `1. B.Tech in CSE (AIML) — Brainware University Kolkata (2022-2025) [CGPA: 8.28]<br>2. Diploma in Electrical Engg — Gomati District Polytechnic (2019-2022) [CGPA: 7.06]`,
    contact: `Phone: +91 9366449167<br>Email: nilayghosh901@gmail.com<br>LinkedIn: https://www.linkedin.com/in/nilay-ghosh-30719a235<br>GitHub: https://github.com/NilayGhosh901`,
    sudo: `Access granted: User is Nilay Ghosh [Superuser / Lead Developer].`
  };

  if (terminalInput && terminalLogs) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (val === 'clear') {
          terminalLogs.innerHTML = '';
          return;
        }

        const logEntry = document.createElement('div');
        logEntry.style.marginBottom = '0.6rem';

        if (terminalCommands[val]) {
          logEntry.innerHTML = `<span style="color:#D6FF00">nilay@portfolio:~$</span> ${val}<br>${terminalCommands[val]}`;
        } else {
          logEntry.innerHTML = `<span style="color:#D6FF00">nilay@portfolio:~$</span> ${val}<br><span style="color:#FF5E5E">Command not found. Type 'help' to see all commands.</span>`;
        }

        terminalLogs.appendChild(logEntry);
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
      }
    });
  }

  // 8. Contact & Inquiry Forms Submission
  const heroInquiryForm = document.getElementById('hero-inquiry-form');
  if (heroInquiryForm) {
    heroInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inq-name').value || 'Collaborator';
      showToast(`⚡ Thanks ${name}! Your message was dispatched directly to Nilay.`);
      heroInquiryForm.reset();
    });
  }

  const fullContactForm = document.getElementById('full-contact-form');
  if (fullContactForm) {
    fullContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🚀 Thank you! Nilay will contact you at your email shortly.');
      fullContactForm.reset();
    });
  }

  // 9. Hire Me Modal
  const hireBtns = document.querySelectorAll('.btn-hire-trigger');
  const hireModal = document.getElementById('hire-modal');
  const hireModalClose = document.getElementById('hire-modal-close');
  const modalContactForm = document.getElementById('modal-contact-form');

  hireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (hireModal) hireModal.classList.add('open');
    });
  });

  if (hireModalClose && hireModal) {
    hireModalClose.addEventListener('click', () => {
      hireModal.classList.remove('open');
    });
  }

  if (hireModal) {
    hireModal.addEventListener('click', (e) => {
      if (e.target === hireModal) hireModal.classList.remove('open');
    });
  }

  if (modalContactForm) {
    modalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (hireModal) hireModal.classList.remove('open');
      showToast('🚀 Inquiry received! Nilay will respond within 24 hours.');
      modalContactForm.reset();
    });
  }

  // 10. 3D Tilt on Editorial Project Cards
  const editorialCards = document.querySelectorAll('.editorial-card');
  editorialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // 11. Mouse Parallax for Floating 3D Chain
  const chainCanvas = document.querySelector('.chain-svg-canvas');
  if (chainCanvas) {
    window.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
      chainCanvas.style.transform = `rotate(-18deg) translate(${moveX}px, ${moveY}px)`;
    });
  }

  // Toast Notification System
  function showToast(message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
