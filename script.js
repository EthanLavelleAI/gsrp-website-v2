// ========================================
// Intersection Observer for Scroll Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.feature-card, .stat-card, .contact-item, .footer-section').forEach(el => {
    observer.observe(el);
});

// ========================================
// Mobile Menu Toggle
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========================================
// Smooth Scroll Effect
// ========================================

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

// ========================================
// Navbar Background on Scroll
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// ========================================
// Counter Animation for Statistics
// ========================================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
};

// Start counter animations when stats section is in view
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statNumbers.forEach(element => {
                const target = parseInt(element.getAttribute('data-count'));
                animateCounter(element, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats') && statsObserver.observe(document.querySelector('.stats'));

// ========================================
// Button Click Effects
// ========================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple effect styling (add to CSS or here)
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Parallax Effect on Hero Section
// ========================================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.3;
    }
});

// ========================================
// Feature Card Hover Effect
// ========================================

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Contact Link Interactions
// ========================================

document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            this.style.animation = 'pulse-link 0.6s ease-out';
            
            setTimeout(() => {
                this.style.animation = 'none';
            }, 600);
        }
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse-link {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ========================================
// Active Navigation Link Highlighting
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Page Load Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.8s ease-out';
});

const loadStyle = document.createElement('style');
loadStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(loadStyle);

// ========================================
// Scroll Progress Bar
// ========================================

const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0066cc, #ff6b6b, #ffd700);
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createProgressBar();

// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu && navMenu.classList.remove('active');
        hamburger && hamburger.classList.remove('active');
    }
});

// ========================================
// Lazy Loading Setup
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('lazy-loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Theme Toggle (Optional Light/Dark Mode)
// ========================================

const createThemeToggle = () => {
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.innerHTML = '🌙';
    toggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #0066cc, #ff6b6b);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 20px rgba(0, 102, 204, 0.3);
        transition: all 0.3s ease;
    `;

    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1)';
        toggle.style.boxShadow = '0 8px 30px rgba(0, 102, 204, 0.5)';
    });

    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1)';
        toggle.style.boxShadow = '0 5px 20px rgba(0, 102, 204, 0.3)';
    });

    toggle.addEventListener('click', () => {
        console.log('Theme toggle clicked - ready for implementation');
    });

    document.body.appendChild(toggle);
};

createThemeToggle();

// ========================================
// Console Welcome Message
// ========================================

console.log('%c Welcome to GSRP ', 'background: linear-gradient(135deg, #0066cc, #ff6b6b); color: white; font-size: 20px; padding: 10px;');
console.log('%c The Premier Roleplay Server on ERLC ', 'color: #0066cc; font-size: 14px;');
console.log('Join us today at https://gsrp.example.com');
