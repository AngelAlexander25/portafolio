// Global variables
let currentSection = 'home';
const fullText = "ANGEL ALEXANDER BARRIENTOS";
let typedText = "";
let typeIndex = 0;

// DOM elements
const scrollProgress = document.getElementById('scrollProgress');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const typedTextElement = document.getElementById('typedText');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Start typing animation
    startTypingAnimation();
    
    // Initialize scroll listeners
    initScrollListeners();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize form
    initContactForm();
});

// Typing animation
function startTypingAnimation() {
    const typeTimer = setInterval(() => {
        if (typeIndex < fullText.length) {
            typedText += fullText.charAt(typeIndex);
            typedTextElement.textContent = typedText;
            typeIndex++;
        } else {
            clearInterval(typeTimer);
        }
    }, 100);
}

// Scroll listeners
function initScrollListeners() {
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateActiveSection();
    });
}

// Update scroll progress bar
function updateScrollProgress() {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = (totalScroll / windowHeight) * 100;
    scrollProgress.style.width = scroll + '%';
}

// Update active navigation section
function updateActiveSection() {
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                if (currentSection !== sectionId) {
                    currentSection = sectionId;
                    updateActiveNavLink(sectionId);
                }
            }
        }
    });
}

// Update active navigation link
function updateActiveNavLink(activeSection) {
    // Update desktop nav
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            scrollToSection(section);
        });
    });
    
    // Mobile navigation
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            scrollToSection(section);
            closeMobileMenu();
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Close mobile menu
function closeMobileMenu() {
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    mobileMenu.classList.remove('active');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize skill bars animation
function initSkillBars() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Utility function for smooth scrolling (used by hero CTA)
window.scrollToSection = scrollToSection;

// Add scroll animations for elements
function initScrollAnimations() {
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
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.section-header, .project-card, .skill-category, .about-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    document.addEventListener('DOMContentLoaded', smoothScrollPolyfill);
}