// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMenu.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.top = '-100px';
        } else {
            navbar.style.top = '0';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Animate on Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Project Filter (if you have project filtering functionality)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons?.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form Validation (if you have a contact form)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                showFormError('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormError('Please enter a valid email address');
                return;
            }
            
            // If validation passes, you can submit the form
            submitForm(this);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const existing = contactForm.querySelector('.error-message');
        if (existing) existing.remove();
        
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    async function submitForm(form) {
        // Add your form submission logic here
        // This could be an API call or email service integration
        console.log('Form submitted');
    }

    // Typing Animation for Hero Section
    const typedText = document.querySelector('.typed-text');
    
    if (typedText) {
        const words = ['AI Engineer', 'Developer', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const current = words[wordIndex];
            
            if (isDeleting) {
                typedText.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 100 : 200);
            }
        }
        
        type();
    }

    // Initialize AOS (Animate on Scroll) if you're using it
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// Add this to your existing script.js

// Activities filter functionality (if you want to add categories)
const filterButtons = document.querySelectorAll('.filter-btn');
const activityCards = document.querySelectorAll('.activity-card');

filterButtons?.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter activities
        activityCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for animation
const observeActivities = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    },
    { threshold: 0.1 }
);

activityCards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observeActivities.observe(card);
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
// Add to your existing script.js
function openVideoModal() {
    const modal1 = document.getElementById('videoModal');
    modal1.style.display = 'block';
    // Force reflow
    modal1.offsetHeight;
    modal1.classList.add('show1');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeVideoModal() {
    const modal1 = document.getElementById('videoModal');
    modal1.classList.remove('show1');
    setTimeout(() => {
        modal1.style.display = 'none';
        // Stop video when closing modal1
        const iframe = modal1.querySelector('iframe');
        iframe.src = iframe.src;
    }, 300);
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal1 when clicking outside
window.onclick = function(event) {
    const modal1 = document.getElementById('videoModal');
    if (event.target == modal1) {
        closeVideomodal1();
    }
}

// Close modal1 with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideomodal1();
    }
});


