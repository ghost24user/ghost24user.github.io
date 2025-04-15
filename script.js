document.addEventListener('DOMContentLoaded', function() {
    // Check if language is already set
    const language = localStorage.getItem('language');
    
    // Only show modal if language not set
    if (!localStorage.getItem('language')) {
        document.getElementById('languageModal').style.display = 'flex';
    }

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hidden');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title .title-text');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Typing speed
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // Toggle services visibility
    const toggleButton = document.getElementById('toggleServices');
    const hiddenServices = document.querySelectorAll('.hidden-service');
    let servicesExpanded = false;
    
    toggleButton.addEventListener('click', () => {
        if (servicesExpanded) {
            // Collapse services
            hiddenServices.forEach(service => {
                service.classList.add('hidden-service');
            });
            toggleButton.innerHTML = '<span class="terminal-prefix">></span><span>SEE_MORE</span>';
        } else {
            // Expand services
            hiddenServices.forEach(service => {
                service.classList.remove('hidden-service');
            });
            toggleButton.innerHTML = '<span class="terminal-prefix">></span><span>SEE_LESS</span>';
        }
        servicesExpanded = !servicesExpanded;
    });
});

// Language selection function
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    if (lang === 'ro') {
        window.location.href = 'index-ro.html';
    }
}

// Close modal function
function closeModal() {
    document.getElementById('languageModal').style.display = 'none';
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
    }
}

// Close modal if clicked outside
window.onclick = function(event) {
    const modal = document.getElementById('languageModal');
    if (event.target == modal) {
        closeModal();
    }
}