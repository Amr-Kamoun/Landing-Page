// Select the navbar and sections from the document
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');

/**
 * Function to dynamically build the navigation menu based on sections
 */
sections.forEach(section => {
    const navItem = document.createElement('li');
    navItem.innerHTML = `<a href="#${section.id}">${section.querySelector('h2').innerText}</a>`;
    navbar.appendChild(navItem);
});

/**
 * Event listener for scroll events
 * Highlights the navigation link based on the currently visible section
 */
window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const navItems = navbar.querySelectorAll('li');

        // Check if section is in the viewport, then highlight the link
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            sections.forEach(sec => sec.classList.remove('active-section'));
            section.classList.add('active-section');

            navItems.forEach(item => item.classList.remove('active'));
            const activeNavItem = navbar.querySelector(`a[href="#${section.id}"]`).parentElement;
            activeNavItem.classList.add('active');
        }
    });
});

/**
 * Event listener for smooth scrolling when navigation links are clicked
 */
navbar.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Smooth scroll to the target section
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    }
});

/**
 * Intersection Observer to trigger animations when sections come into view
 */
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-scale'); // Apply animation class
            observer.unobserve(entry.target); // Stop observing after animation triggers
        }
    });
}, options);

// Observe each section for visibility
sections.forEach(section => {
    observer.observe(section);
});
