// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== SKILL BARS ANIMATION ====================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    
    const skillsSectionTop = skillsSection.offsetTop;
    const windowHeight = window.innerHeight;
    
    if (window.pageYOffset > skillsSectionTop - windowHeight + 200) {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkillBars);

// ==================== TYPING EFFECT ====================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        }
    }

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeText, 500);
    });
}

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
    });
}

// ==================== ENDORSEMENT BUTTON FUNCTIONALITY ====================
document.querySelectorAll('.endorse-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('endorsed')) {
            this.innerHTML = '<i class="fas fa-plus"></i> Endorse';
            this.classList.remove('endorsed');
        } else {
            this.innerHTML = '<i class="fas fa-check"></i> Endorsed';
            this.classList.add('endorsed');
            
            // Increment endorsement count
            const endorsementText = this.closest('.skill-item-endorsed').querySelector('.endorsement-text');
            if (endorsementText) {
                const currentCount = parseInt(endorsementText.textContent.match(/\d+/)[0]);
                endorsementText.textContent = `${currentCount + 1} endorsements`;
            }
        }
    });
});

// ==================== POST ACTION BUTTONS ====================
document.querySelectorAll('.post-action-btn').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent.trim().toLowerCase();
        const post = this.closest('.activity-post');
        
        if (!post) return;
        
        if (action.includes('like')) {
            const likeIcon = this.querySelector('i');
            if (likeIcon) {
                if (likeIcon.classList.contains('far')) {
                    likeIcon.classList.remove('far');
                    likeIcon.classList.add('fas');
                    this.style.color = 'var(--primary-color)';
                    
                    // Increment like count
                    const likeCount = post.querySelector('.post-stats span:first-child');
                    if (likeCount) {
                        const currentLikes = parseInt(likeCount.textContent.match(/\d+/)[0]);
                        likeCount.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentLikes + 1} likes`;
                    }
                } else {
                    likeIcon.classList.remove('fas');
                    likeIcon.classList.add('far');
                    this.style.color = '';
                    
                    const likeCount = post.querySelector('.post-stats span:first-child');
                    if (likeCount) {
                        const currentLikes = parseInt(likeCount.textContent.match(/\d+/)[0]);
                        likeCount.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentLikes - 1} likes`;
                    }
                }
            }
        }
        
        if (action.includes('comment')) {
            alert('Comment functionality - You can integrate a comment system here!');
        }
        
        if (action.includes('share')) {
            // Copy page URL to clipboard
            const pageUrl = window.location.href;
            navigator.clipboard.writeText(pageUrl).then(() => {
                alert('Link copied to clipboard! You can now share it.');
            }).catch(() => {
                alert('Share this page: ' + pageUrl);
            });
        }
    });
});

// ==================== PROFILE VIEWS COUNTER ====================
function updateProfileViews() {
    const viewsElement = document.querySelector('.profile-meta');
    if (viewsElement) {
        const viewsMatch = viewsElement.textContent.match(/Profile views: (\d+)/);
        if (viewsMatch) {
            const currentViews = parseInt(viewsMatch[1]);
            // Simulate view increment (in real app, this would be from backend)
            const newViews = currentViews + Math.floor(Math.random() * 3);
            viewsElement.innerHTML = viewsElement.innerHTML.replace(/Profile views: \d+/, `Profile views: ${newViews}`);
        }
    }
}

// Update views every 30 seconds (for demo)
setInterval(updateProfileViews, 30000);

// ==================== SHOW MORE FUNCTIONALITY ====================
document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const section = this.closest('section');
        if (!section) return;
        
        const hiddenItems = section.querySelectorAll('.hidden-item');
        
        if (hiddenItems.length > 0) {
            hiddenItems.forEach(item => item.classList.remove('hidden-item'));
            this.textContent = 'Show less';
        } else {
            // If there are no hidden items, just toggle button text
            if (this.textContent.includes('less')) {
                this.textContent = this.textContent.replace('less', 'all');
            }
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
const revealElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .featured-item, .experience-item, .cert-item, .recommendation-card, .activity-post');

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// ==================== MOBILE MENU RESPONSIVE STYLES ====================
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 968px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--glass-bg);
            backdrop-filter: var(--backdrop-blur);
            flex-direction: column;
            align-items: center;
            padding: 3rem 0;
            gap: 2rem;
            transition: var(--transition);
            z-index: 999;
            border-top: 1px solid var(--glass-border);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-link {
            font-size: 1.2rem;
        }
    }
`;
document.head.appendChild(style);

// ==================== PRELOADER (OPTIONAL) ====================
window.addEventListener('load', () => {
    // Hide preloader if you add one
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Trigger initial animations
    animateSkillBars();
});

// ==================== COPY EMAIL TO CLIPBOARD ====================
document.querySelectorAll('.contact-item a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Create temporary success message
            const originalText = emailLink.textContent;
            emailLink.textContent = 'Email copied!';
            emailLink.style.color = 'var(--success-color)';
            
            setTimeout(() => {
                emailLink.textContent = originalText;
                emailLink.style.color = '';
            }, 2000);
        }).catch(() => {
            // Fallback - just open email client
            window.location.href = `mailto:${email}`;
        });
    });
});

// ==================== FEATURED/PROJECT LINKS ====================
document.querySelectorAll('.featured-link, .cert-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            alert('This link will be updated with your actual project/certificate URL!');
        }
    });
});

// ==================== INITIALIZE ON LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    updateThemeIcon(currentTheme);
    
    // Animate skill bars if already in view
    setTimeout(() => {
        animateSkillBars();
    }, 500);
    
    console.log('Portfolio loaded successfully! 🚀');
});

// ==================== CURSOR EFFECT (OPTIONAL PREMIUM FEATURE) ====================
// Uncomment if you want a custom cursor effect
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    }
`;
document.head.appendChild(cursorStyle);
*/
