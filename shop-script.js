// ========================================
// Shop Page Interactions
// ========================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

// Add click animation to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.closest('.btn-buy')) {
            return; // Don't animate if clicking the button
        }
    });

    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.product-icon');
        if (icon) {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'float 3s ease-in-out infinite';
            }, 10);
        }
    });
});

// Button interactions
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    button.addEventListener('click', function(e) {
        // Add ripple effect
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

// Smooth scroll for category links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add hover effect to info cards
document.querySelectorAll('.info-card').forEach(card => {
    const icon = card.querySelector('.info-icon');
    
    card.addEventListener('mouseenter', function() {
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Track which products are viewed (for analytics)
const trackProductView = (productName, price) => {
    console.log(`%c Viewed: ${productName} (${price}R$)`, 'color: #ff8c42; font-weight: bold;');
};

// Add tracking to product cards
document.querySelectorAll('.product-card').forEach(card => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.product-price').textContent;
                trackProductView(productName, productPrice);
                observer.unobserve(card);
            }
        });
    });
    observer.observe(card);
});

// Console message
console.log('%c Welcome to GSRP Shop ', 'background: linear-gradient(135deg, #ff8c42, #f7931e); color: white; font-size: 14px; padding: 8px;');
console.log('%c Support the server and unlock exclusive perks! ', 'color: #ff8c42; font-size: 12px;');
console.log('%c All purchases go towards maintaining and improving GSRP ', 'color: #ff8c42; font-size: 11px;');

}); // End DOMContentLoaded
