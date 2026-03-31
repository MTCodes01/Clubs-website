document.addEventListener("DOMContentLoaded", () => {
    // 3D Tilt Effect on Cards for a Premium Feel
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
    });

    function handleMouseMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to the card center
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate the rotation values (max rotation 6 degrees)
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; // Remove transition during mouse move for smooth 1:1 movement
        card.style.zIndex = '10'; // Bring to front
    }

    function handleMouseLeave() {
        const card = this;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        card.style.zIndex = '1';
    }

    // Optional: Add entry animation loop 
    gsapAnimateInit();
});

// A lightweight custom fade/slide-up init without external libs
function gsapAnimateInit() {
    const profile = document.querySelector('.profile');
    const links = document.querySelectorAll('.card');
    const footer = document.querySelector('.social-footer');

    // Initial State
    if (profile) {
        profile.style.opacity = '0';
        profile.style.transform = 'translateY(-20px)';
    }
    
    links.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
    });

    if (footer) {
        footer.style.opacity = '0';
    }
    
    // Animate In Sequence
    if (profile) {
        setTimeout(() => {
            profile.style.transition = 'all 0.8s ease-out';
            profile.style.opacity = '1';
            profile.style.transform = 'translateY(0)';
        }, 100);
    }

    links.forEach((link, index) => {
        setTimeout(() => {
            link.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (index * 120));
    });

    if (footer) {
        setTimeout(() => {
            footer.style.transition = 'all 1s ease-in-out';
            footer.style.opacity = '1';
        }, 800 + (links.length * 100));
    }
}
