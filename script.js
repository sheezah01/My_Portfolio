document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');

            // Get the target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Smooth scroll to target section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Hide mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Hide mobile menu when scrolling
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
        lastScroll = currentScroll;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Resume button click animation
    const resumeBtn = document.querySelector('.resume-btn');
    resumeBtn.addEventListener('click', () => {
        resumeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resumeBtn.style.transform = 'scale(1)';
        }, 200);

        // Add your resume download logic here
        console.log('Resume download initiated');
    });

    // Smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover animation for profile image
    const imageContainer = document.querySelector('.image-container');
    imageContainer.addEventListener('mouseover', () => {
        imageContainer.style.transform = 'scale(1.02)';
        imageContainer.style.transition = 'transform 0.3s ease';
    });

    imageContainer.addEventListener('mouseout', () => {
        imageContainer.style.transform = 'scale(1)';
    });

    // Initialize social icons with hover effects
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add your social media link logic here
            const type = icon.classList[1];
            console.log(`Clicked on ${type} icon`);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.skill-circle');
    
    // Randomly position circles within container
    circles.forEach((circle, index) => {
        // Calculate random positions
        const randomX = Math.random() * 60 - 30; // -30 to 30
        const randomY = Math.random() * 60 - 30; // -30 to 30
        
        // Add random delays to animation
        circle.style.animationDelay = `${index * -1.2}s`;
        
        // Set initial random positions
        circle.style.left = `${(index % 4) * 25 + randomX}%`;
        circle.style.top = `${Math.floor(index / 4) * 25 + randomY}%`;
    });

    // Add floating effect with random movements
    function addRandomMovement(circle) {
        const radius = 30; // Maximum movement radius
        const duration = 15000; // Animation duration in milliseconds
        
        let startTime = Date.now();
        
        function updatePosition() {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % duration) / duration;
            
            // Calculate new position using sine and cosine for smooth circular motion
            const angle = progress * Math.PI * 2;
            const offsetX = Math.sin(angle) * radius;
            const offsetY = Math.cos(angle) * radius;
            
            // Apply the new position
            const baseX = parseFloat(circle.style.left);
            const baseY = parseFloat(circle.style.top);
            
            circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            
            requestAnimationFrame(updatePosition);
        }
        
        updatePosition();
    }

    // Apply random movement to each circle
    circles.forEach(circle => {
        addRandomMovement(circle);
    });

    // Add hover effect to show skill labels
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', () => {
            circle.querySelector('.skill-label').style.opacity = '1';
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.querySelector('.skill-label').style.opacity = '0';
        });
    });
});
// education.js
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.education-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay between each card animation
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.2}s`;
                }, 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '20px'
    });

    cards.forEach(card => observer.observe(card));
});
// projects.js
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.project-slider');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');

    let currentIndex = 0;
    let startX;
    let scrollLeft;
    let isDown = false;
    
    // Calculate how many cards to show based on screen width
    const getVisibleCards = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    // Calculate maximum scroll position
    const getMaxScroll = () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        return (cards.length - getVisibleCards()) * (cardWidth + gap);
    };

    // Auto scroll function
    const autoScroll = () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        currentIndex = (currentIndex + 1) % (cards.length - getVisibleCards() + 1);
        slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px) translateY(-50%)`;
    };

    // Start auto scroll
    let scrollInterval = setInterval(autoScroll, 3000);

    // Manual navigation
    prevBtn.addEventListener('click', () => {
        clearInterval(scrollInterval);
        const cardWidth = cards[0].offsetWidth;
        const gap = 32;
        currentIndex = Math.max(0, currentIndex - 1);
        slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px) translateY(-50%)`;
        scrollInterval = setInterval(autoScroll, 3000);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(scrollInterval);
        const cardWidth = cards[0].offsetWidth;
        const gap = 32;
        currentIndex = Math.min(cards.length - getVisibleCards(), currentIndex + 1);
        slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px) translateY(-50%)`;
        scrollInterval = setInterval(autoScroll, 3000);
    });

    // Mouse drag functionality
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        clearInterval(scrollInterval);
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        scrollInterval = setInterval(autoScroll, 3000);
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        scrollInterval = setInterval(autoScroll, 3000);
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Pause auto scroll on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });

    slider.addEventListener('mouseleave', () => {
        scrollInterval = setInterval(autoScroll, 3000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        clearInterval(scrollInterval);
        currentIndex = 0;
        slider.style.transform = 'translateX(0) translateY(-50%)';
        scrollInterval = setInterval(autoScroll, 3000);
    });
});