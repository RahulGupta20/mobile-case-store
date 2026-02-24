// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.category-card, .product-card, .feature-card, .gallery-item');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.btn-add-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        button.style.position = 'relative';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Update cart count
        cartCount++;
        cartCountElement.textContent = cartCount;
        cartCountElement.style.animation = 'none';
        setTimeout(() => {
            cartCountElement.style.animation = 'bounce 0.5s ease';
        }, 10);

        // Show notification
        showNotification('Added to cart!');
    });
});

// Wishlist functionality
const wishlistButtons = document.querySelectorAll('.action-btn');
wishlistButtons.forEach(button => {
    if (button.querySelector('path[d*="20.84"]')) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const svg = button.querySelector('svg');
            const path = svg.querySelector('path');

            if (svg.getAttribute('fill') === 'currentColor') {
                svg.setAttribute('fill', 'none');
                showNotification('Removed from wishlist');
            } else {
                svg.setAttribute('fill', 'currentColor');
                showNotification('Added to wishlist!');
            }

            button.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                button.style.animation = '';
            }, 300);
        });
    }
});

// Product filter functionality
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        // Filter products with animation
        productCards.forEach((card, index) => {
            card.style.animation = 'none';

            if (filter === 'all' || card.dataset.category === filter) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out forwards';
                }, index * 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Category card interactions
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;

        // Scroll to products section
        document.querySelector('.products').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Filter products after scroll
        setTimeout(() => {
            const matchingTab = Array.from(filterTabs).find(
                tab => tab.dataset.filter === category
            );
            if (matchingTab) {
                matchingTab.click();
            }
        }, 500);
    });

    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});


// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const email = input.value;

    if (email) {
        showNotification('Thanks for subscribing!');
        input.value = '';

        // Add success animation
        const button = newsletterForm.querySelector('button');
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
});

// Hero CTA buttons
const ctaButtons = document.querySelectorAll('.hero-cta .btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('btn-primary')) {
            document.querySelector('.products').scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            showNotification('Video player coming soon!');
        }
    });
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    showNotification('Search feature coming soon!');
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('mobile-active');

    // Animate menu icon
    const spans = menuBtn.querySelectorAll('span');
    if (menuBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.875rem;
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease-out, slideOut 0.3s ease-out 2.7s forwards;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add keyframes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .mobile-active {
        display: flex !important;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        flex-direction: column;
        background: rgba(10, 10, 15, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (min-width: 768px) {
        .mobile-active {
            position: static;
            flex-direction: row;
            background: none;
            backdrop-filter: none;
            padding: 0;
            border: none;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }

    if (heroVisual && scrolled < 800) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Cursor glow effect for premium feel
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
cursor.style.cssText = `
    position: fixed;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(137, 92, 242, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease-out;
    display: none;
`;
document.body.appendChild(cursor);

// Only show cursor glow on desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 60 + 'px';
        cursor.style.top = e.clientY - 60 + 'px';
    });
}

// Add hover effects to interactive elements
const interactiveElements = document.querySelectorAll('button, a, .product-card, .category-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.background = 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.background = 'radial-gradient(circle, rgba(137, 92, 242, 0.15) 0%, transparent 70%)';
    });
});

// Lazy loading for images (placeholder for when images are added)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Stats Counter Animation
const statsCounterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-counter-value');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        if (target > 1000000) {
                            counter.textContent = (current / 1000000).toFixed(1) + 'M';
                        } else if (target > 1000) {
                            counter.textContent = (current / 1000).toFixed(0) + 'K';
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (target === 2500000) {
                            counter.textContent = '2.5M';
                        } else if (target === 50000) {
                            counter.textContent = '50K';
                        } else if (target === 98) {
                            counter.textContent = '98%';
                        } else {
                            counter.textContent = target;
                        }
                    }
                };
                updateCounter();
            });
            statsCounterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats counter section
const statsSection = document.querySelector('.stats-counter');
if (statsSection) {
    statsCounterObserver.observe(statsSection);
}

// Gallery hover effects
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Could add lightbox functionality here
            console.log('Gallery item clicked:', img.alt);
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }

    // Animate stats
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        setTimeout(() => {
            stat.style.transition = 'all 0.6s ease-out';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        });
        // If already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handlers
window.addEventListener('scroll', throttle(() => {
    // Scroll-dependent effects here
}, 100));

// 3D Tilt Effect for Hero Cards
document.addEventListener('DOMContentLoaded', () => {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });

        // Add smooth transition
        el.style.transition = 'transform 0.3s ease-out';
    });

    // Quick Add Button functionality
    const quickAddButtons = document.querySelectorAll('.quick-add-btn');

    quickAddButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            // Update cart count
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                cartCountElement.style.animation = 'none';
                setTimeout(() => {
                    cartCountElement.style.animation = 'bounce 0.5s ease';
                }, 10);
            }

            // Change button text temporarily
            const buttonText = button.querySelector('span');
            const originalText = buttonText.textContent;
            buttonText.textContent = 'Added!';
            button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

            setTimeout(() => {
                buttonText.textContent = originalText;
                button.style.background = '';
            }, 2000);

            // Show notification
            showNotification('Added to cart!');
        });
    });

    // Collection Banner click
    const collectionBanner = document.querySelector('.collection-banner');
    if (collectionBanner) {
        collectionBanner.addEventListener('click', () => {
            document.querySelector('.products')?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Feature Cards click
    const featureCards = document.querySelectorAll('.feature-card-mini');
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            showNotification('Feature coming soon!');
        });
    });

    // Promo Badge click
    const promoBadge = document.querySelector('.promo-badge');
    if (promoBadge) {
        promoBadge.addEventListener('click', () => {
            document.querySelector('.products')?.scrollIntoView({
                behavior: 'smooth'
            });
            showNotification('20% discount applied on all items!');
        });
    }
});

// ─── Hero Card Sliders ──────────────────────────────
(function initHeroSliders() {
    const INTERVAL = 3000; // ms between auto-advances

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSliders);
    } else {
        initSliders();
    }

    function initSliders() {
        document.querySelectorAll('.hero-product-card').forEach(card => {
        const slides = Array.from(card.querySelectorAll('.card-slider .slide'));
        const dots   = Array.from(card.querySelectorAll('.slider-dots .dot'));
        if (!slides.length) return;

        let current  = 0;
        let timer    = null;

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current]?.classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current]?.classList.add('active');
        }

        function start() {
            timer = setInterval(() => goTo(current + 1), INTERVAL);
        }

        function stop() {
            clearInterval(timer);
        }

        // Dot click navigation
        dots.forEach((dot, i) => {
            dot.addEventListener('click', e => {
                e.stopPropagation();
                stop();
                goTo(i);
                start();
            });
        });

        // Pause auto-play on hover, resume on leave
        card.addEventListener('mouseenter', stop);
        card.addEventListener('mouseleave', start);

        // Touch/swipe support
        let touchStartX = 0;
        card.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        card.addEventListener('touchend', e => {
            const delta = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(delta) > 40) {
                stop();
                goTo(delta < 0 ? current + 1 : current - 1);
                start();
            }
        }, { passive: true });

        // Kick off
        start();
        });
    }
})();

console.log('🚀 Premium Tech Cases - Interactive Hero Initialized');
