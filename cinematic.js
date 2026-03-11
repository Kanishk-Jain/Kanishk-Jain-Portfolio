document.addEventListener('DOMContentLoaded', () => {

    // 1. Create Custom Cursor
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow loop
    const renderCursor = () => {
        outlineX += (mouseX - outlineX) * 0.6; // Increased from 0.15 to 0.6 for faster trailing
        outlineY += (mouseY - outlineY) * 0.6;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Hover states for cursor
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-content, .skill-category, .edu-card, .icon-link, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
    });

    // 2. Inject Reveal Classes dynamically
    const applyReveal = (selector, animClass) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal', animClass);
            el.style.transitionDelay = (index * 0.1) + 's';
        });
    };

    applyReveal('.hero-content', 'reveal-left');
    applyReveal('.hero-image', 'reveal-right');
    applyReveal('.section-title', 'reveal-up');
    
    // Staggered skill categories
    const categories = document.querySelectorAll('.skill-category');
    if(categories.length >= 3) {
        categories[0].classList.add('reveal', 'reveal-left');
        categories[1].classList.add('reveal', 'reveal-up');
        categories[2].classList.add('reveal', 'reveal-right');
    }

    applyReveal('.timeline-item', 'reveal-left');
    applyReveal('.project-card', 'reveal-3d');
    applyReveal('.edu-card, .cert-item', 'reveal-right');

    // 3. Intersection Observer mapping
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Optional: Re-hide when scrolling out for continuous effect
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(r => observer.observe(r));

    // 4. Parallax Background effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        if(blob1) blob1.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.05}deg) scale(${1 + scrolled * 0.0005})`;
        if(blob2) blob2.style.transform = `translateY(${scrolled * 0.15}px) rotate(${-scrolled * 0.05}deg) scale(${1 + scrolled * 0.0005})`;
    });

    // Smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
