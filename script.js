document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger');
  const closeIcon = document.getElementById('close');

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile Menu Toggle
  mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          hamburgerIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
      });
  });

  // Contact Form Submission Handling
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  async function handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
      }).then(response => {
          if (response.ok) {
              statusDiv.innerHTML = "Thanks for your submission!";
              statusDiv.style.color = "#38bdf8";
              form.reset();
          } else {
              response.json().then(data => {
                  if (Object.hasOwn(data, 'errors')) {
                      statusDiv.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                  } else {
                      statusDiv.innerHTML = "Oops! There was a problem submitting your form.";
                  }
                  statusDiv.style.color = "#f472b6";
              });
          }
      }).catch(error => {
          statusDiv.innerHTML = "Oops! There was a problem submitting your form.";
          statusDiv.style.color = "#f472b6";
      });
  }
  form.addEventListener("submit", handleSubmit);
});