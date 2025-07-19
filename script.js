document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your User ID
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS User ID

    // Slideshow functionality
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        if (slides.length === 0) return;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 3000); // 3-second interval
    }

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeMenu = document.getElementById('close-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = {
            name: contactForm.querySelector('input[name="name"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'birhanutbelay@gmail.com' // Manager's email
        })
        .then(() => {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = '#2c3e50';
            contactForm.reset(); 
        })
        .catch((error) => {
            formMessage.textContent = 'Failed to send message. Please try again later.';
            formMessage.style.color = '#e74c3c';
            console.error('EmailJS error:', error);
        });
    });
});