// ========================================
// Rules Page Interactions
// ========================================

// Smooth scroll for table of contents
document.querySelectorAll('.table-of-contents a').forEach(link => {
    link.addEventListener('click', function(e) {
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

// Highlight active section in TOC on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.rule-card');
    const tocLinks = document.querySelectorAll('.table-of-contents a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            tocLinks.forEach(link => link.style.color = 'var(--text-secondary)');
            const activeLink = document.querySelector(
                `.table-of-contents a[href="#${section.id}"]`
            );
            if (activeLink) {
                activeLink.style.color = '#ff8c42';
                activeLink.style.background = 'rgba(255, 140, 66, 0.15)';
            }
        }
    });
});

// Fade in animation for rule items on scroll
const ruleObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const ruleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            ruleObserver.unobserve(entry.target);
        }
    });
}, ruleObserverOptions);

// Observe all rule items
document.querySelectorAll('.rule-item, .consequence-item').forEach(el => {
    ruleObserver.observe(el);
});

// Button interactions
document.querySelectorAll('.button-group .btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click animation to rule cards
document.querySelectorAll('.rule-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Copy to clipboard functionality for rule sections
document.querySelectorAll('.rule-item').forEach(item => {
    item.addEventListener('contextmenu', function(e) {
        // Allow right-click to copy rule text
    });
});

// Print styling
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.table-of-contents').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.table-of-contents').forEach(el => {
        el.style.display = 'block';
    });
});

console.log('%c GSRP Server Rules Page Loaded ', 'background: linear-gradient(135deg, #ff8c42, #f7931e); color: white; font-size: 14px; padding: 8px;');
console.log('%c Read carefully! Following our rules ensures a great experience for everyone. ', 'color: #ff8c42; font-size: 12px;');
