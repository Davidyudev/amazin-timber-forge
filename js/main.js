// Amazin Timber - Main JavaScript functionality
// Includes mobile navigation, FAQ accordion, form handling, and smooth scrolling

(function() {
    'use strict';
    
    // DOM Elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const form = document.querySelector('form[name="quote"]');
    
    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', isOpen);
            
            // Update aria-expanded for accessibility
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('svg path');
            if (icon) {
                if (isOpen) {
                    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // Hamburger
                } else {
                    icon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // X
                }
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Navbar background on scroll
    if (navbar) {
        function updateNavbar() {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.add('bg-white/90');
                navbar.classList.remove('bg-white/95');
            }
        }
        
        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Initial call
    }
    
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            const answerId = this.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            const icon = this.querySelector('.faq-icon');
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswerId = otherQuestion.getAttribute('aria-controls');
                    const otherAnswer = document.getElementById(otherAnswerId);
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    if (otherAnswer && otherIcon) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.classList.add('hidden');
                        otherIcon.textContent = '+';
                    }
                }
            });
            
            // Toggle current FAQ
            if (answer && icon) {
                if (isOpen) {
                    this.setAttribute('aria-expanded', 'false');
                    answer.classList.add('hidden');
                    icon.textContent = '+';
                } else {
                    this.setAttribute('aria-expanded', 'true');
                    answer.classList.remove('hidden');
                    icon.textContent = '−';
                }
            }
        });
    });
    
    // Form submission handling with loading state
    if (form && submitBtn && submitText) {
        form.addEventListener('submit', function(e) {
            // Show loading state
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitBtn.classList.add('opacity-75');
            
            // Re-enable after a delay if form validation fails or submission errors
            setTimeout(() => {
                if (submitBtn.disabled) {
                    submitBtn.disabled = false;
                    submitText.textContent = 'Send Quote Request';
                    submitBtn.classList.remove('opacity-75');
                }
            }, 5000);
        });
        
        // Reset button state if user makes changes after failed submission
        const formInputs = form.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (submitBtn.disabled) {
                    submitBtn.disabled = false;
                    submitText.textContent = 'Send Quote Request';
                    submitBtn.classList.remove('opacity-75');
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple AOS (Animate On Scroll) implementation
    function initAOS() {
        const elements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-in-up');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize AOS when page loads
    if (window.IntersectionObserver) {
        initAOS();
    }
    
    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('opacity-0');
                        img.classList.add('opacity-100');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                imageObserver.observe(img);
            });
        }
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }
    });
    
    // Focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.modal'); // If you add modals later
    
    // Add focus indicators that are always visible for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });
    
    // Performance: Debounce scroll events
    function debounce(func, wait) {
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
    
    // Apply debouncing to scroll handler
    if (navbar) {
        const debouncedNavbarUpdate = debounce(function() {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        }, 10);
        
        window.addEventListener('scroll', debouncedNavbarUpdate);
    }
    
    // Console log for debugging (remove in production)
    console.log('Amazin Timber website loaded successfully');
    
})();