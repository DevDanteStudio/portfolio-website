
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


const currencyToggle = document.getElementById('currencyToggle');
const nairaLabel = document.getElementById('nairaLabel');
const usdLabel = document.getElementById('usdLabel');
const priceElements = document.querySelectorAll('.price[data-naira]');


const EXCHANGE_RATE = 1600; 

let isUSD = false;

if (currencyToggle) {
    currencyToggle.addEventListener('click', () => {
        isUSD = !isUSD;
        currencyToggle.classList.toggle('active');
        
        
        if (isUSD) {
            nairaLabel.style.color = 'var(--light-grey)';
            usdLabel.style.color = 'var(--khaki)';
        } else {
            nairaLabel.style.color = 'var(--khaki)';
            usdLabel.style.color = 'var(--light-grey)';
        }
        
        
        priceElements.forEach(priceEl => {
            const nairaPrice = parseInt(priceEl.getAttribute('data-naira'));
            
            if (isUSD) {
                
                const usdPrice = Math.round(nairaPrice / EXCHANGE_RATE);
                priceEl.textContent = `$${usdPrice.toLocaleString()}`;
            } else {
                // 
                priceEl.textContent = `₦${nairaPrice.toLocaleString()}`;
            }
        });
    });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});


let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.padding = '0.7rem 5%';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        nav.style.padding = '1rem 5%';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
    
    lastScroll = currentScroll;
});


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


const animateElements = document.querySelectorAll('.project-card, .expect-card, .pricing-card, .contact-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


const currentLocation = window.location.pathname;
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    if (item.getAttribute('href') === currentLocation || 
        (currentLocation.includes('index.html') && item.getAttribute('href') === '#home') ||
        (currentLocation === '/' && item.getAttribute('href') === '#home')) {
        item.style.color = 'var(--khaki)';
    }
});


window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});


if (window.innerWidth <= 768) {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(43, 43, 43, 0.98);
            padding: 2rem;
            gap: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
    `;
    document.head.appendChild(style);
}


console.log('%c🚀 DevDanteStudio', 'color: #c9b588; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with 💪 during the 30-day coding challenge', 'color: #c9b588; font-size: 14px;');
console.log('%cInterested in working together? Reach out!', 'color: #5a5a5a; font-size: 12px;');

const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
let currentSlide = 0;

if (testimonialDots.length > 0) {
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialDots.forEach(d => d.classList.remove('active'));
            
            
            testimonialCards[index].classList.add('active');
            dot.classList.add('active');
            currentSlide = index;
        });
    });
}



// Add fade-in class to sections you want to animate
const sectionsToAnimate = document.querySelectorAll('.about, .projects, .testimonial, .faq, .cta, .project-card, .pricing-card, .contact-card');
sectionsToAnimate.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// 3. STATS COUNTER ANIMATION
const stats = document.querySelectorAll('.stat h3');
let statsAnimated = false;

// Find the stats container
const statsContainer = document.querySelector('.stats');

if (statsContainer && stats.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsContainer);
}

function animateStats() {
    stats.forEach(stat => {
        const parent = stat.parentElement;
        parent.classList.add('counting');
        
        const text = stat.textContent.trim();
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasSlash = text.includes('/');
        
        // Extract number from text
        let number = parseInt(text.replace(/[^0-9]/g, ''));
        
        // Skip if not a valid number or if it's 24/7
        if (isNaN(number) || hasSlash) {
            parent.classList.remove('counting');
            return;
        }
        
        const duration = 2000; // 2 seconds
        const steps = 50;
        const increment = number / steps;
        const stepTime = duration / steps;
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= number) {
                // Final value
                if (hasPlus) {
                    stat.textContent = number + '+';
                } else if (hasPercent) {
                    stat.textContent = number + '%';
                } else {
                    stat.textContent = number;
                }
                clearInterval(counter);
                setTimeout(() => {
                    parent.classList.remove('counting');
                }, 500);
            } else {
                // Counting up
                const currentNum = Math.floor(current);
                if (hasPlus) {
                    stat.textContent = currentNum + '+';
                } else if (hasPercent) {
                    stat.textContent = currentNum + '%';
                } else {
                    stat.textContent = currentNum;
                }
            }
        }, stepTime);
    });
}


// 5. SMOOTH SCROLL FOR ANCHOR LINKS 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// 6. ADD RIPPLE EFFECT TO BUTTONS ON CLICK
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

console.log('%c🎨 Animations loaded!', 'color: #c9b588; font-size: 16px; font-weight: bold;');



const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.querySelector('.btn-submit');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable button and show loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success!
                formStatus.textContent = ' Message sent successfully!';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                contactForm.reset();
            } else {
                // Error
                formStatus.textContent = ' Oops! Something went wrong. Please try again or email us directly.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
            }
        } catch (error) {
            // Network error
            formStatus.textContent = ' Network error. Please check your connection and try again.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
        }
        
        // Re-enable button
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Hide status after 10 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 10000);
    });
}



window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});