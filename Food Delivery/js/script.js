// script.js

// Add animations for header links
const headerLinks = document.querySelectorAll('header ul li a');
headerLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)';
        link.style.transition = 'transform 0.2s';
    });
    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)';
    });
});

// Animate input placeholder color change on focus
const searchInput = document.querySelector('main input');
searchInput.addEventListener('focus', () => {
    searchInput.style.backgroundColor = '#ffe6ea';
    searchInput.style.transition = 'background-color 0.3s';
});

searchInput.addEventListener('blur', () => {
    searchInput.style.backgroundColor = 'white';
});

// Add a scroll-to-top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '⬆';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.padding = '10px';
scrollToTopButton.style.backgroundColor = '#e23744';
scrollToTopButton.style.color = 'white';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.borderRadius = '50%';
scrollToTopButton.style.cursor = 'pointer';
scrollToTopButton.style.display = 'none';
scrollToTopButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});