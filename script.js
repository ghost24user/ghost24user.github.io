document.addEventListener('DOMContentLoaded', function() {
    // Language selection
    if (!localStorage.getItem('language')) {
        document.getElementById('languageModal').style.display = 'flex';
    } else if (localStorage.getItem('language') === 'ro' && !window.location.href.includes('index-ro.html')) {
        window.location.href = 'index-ro.html';
    }

    // Set language and close modal
    window.setLanguage = function(lang) {
        localStorage.setItem('language', lang);
        document.body.classList.add('language-selected');
        
        if (lang === 'ro') {
            setTimeout(() => {
                window.location.href = 'index-ro.html';
            }, 300);
        } else {
            closeModal();
        }
    };

    window.closeModal = function() {
        document.getElementById('languageModal').style.display = 'none';
        document.body.classList.add('language-selected');
    };

    // Close modal if clicked outside
    window.onclick = function(event) {
        const modal = document.getElementById('languageModal');
        if (event.target === modal) {
            setLanguage('en');
        }
    };

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
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Typewriter effect for all terminal-prefix elements
    document.querySelectorAll('.terminal-prefix').forEach((element, index) => {
        const originalText = element.nextElementSibling?.textContent || '';
        if (originalText && index === 0) { // Only apply to first element (hero title)
            element.nextElementSibling.textContent = '';
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    element.nextElementSibling.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            setTimeout(typeWriter, 500);
        }
    });

     // Toggle services visibility - FIXED VERSION
    const toggleButton = document.getElementById('toggleServices');
    if (toggleButton) {
        const hiddenServices = document.querySelectorAll('.hidden-service');
        let servicesExpanded = false;
        
        toggleButton.addEventListener('click', () => {
            servicesExpanded = !servicesExpanded;
            
            hiddenServices.forEach(service => {
                if (servicesExpanded) {
                    service.style.opacity = '0';
                    service.style.maxHeight = '0';
                    service.style.padding = '0';
                    service.style.margin = '0';
                    service.style.border = '0';
                    // Force reflow
                    void service.offsetHeight;
                    service.classList.remove('hidden-service');
                    service.style.opacity = '';
                    service.style.maxHeight = '';
                    service.style.padding = '';
                    service.style.margin = '';
                    service.style.border = '';
                } else {
                    service.classList.add('hidden-service');
                }
            });
            
            const text = servicesExpanded ? 'SEE_LESS' : 'SEE_MORE';
            toggleButton.innerHTML = `<span class="terminal-prefix">></span><span>${text}</span>`;
        });
    }
});
