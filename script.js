// Smooth scroll for navbar links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      window.scroll({
        top: section.offsetTop - 60, // adjust for fixed navbar height
        behavior: 'smooth'
      });
    }
  }
  
  // Dark/Light mode toggle
  const modeToggle = document.getElementById('modeToggle');
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
  
  // Optimize animation trigger with Intersection Observer
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        animationObserver.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(el => {
    animationObserver.observe(el);
  });
  
// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['submit-to-google-sheet'];
    const requiredInputs = form.querySelectorAll('.form-group.required input');

    // Remove all error states when the page loads
    requiredInputs.forEach(input => {
        input.parentElement.classList.remove('show-error');
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzIJ9xaHUF-f6aWVQVAiQZJ93Hc5pdUYQkxj6TKAEjRKmDhzUHTD0DOzEDo0SjqFfWHXQ/exec'; // Ensure this is the correct URL
    form.addEventListener('submit', e => {
        e.preventDefault();
        let isValid = true;
        let errorMessage = '';
        
        // Validate name
        const nameInput = form.querySelector('input[name="name"]');
        if (!nameInput.value.trim()) {
            isValid = false;
            nameInput.parentElement.classList.add('show-error');
            errorMessage = 'Please enter your name';
        } else if (!/^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
            isValid = false;
            nameInput.parentElement.classList.add('show-error');
            errorMessage = 'Please enter a valid name';
        }

        // Validate email
        const emailInput = form.querySelector('input[name="email"]');
        if (!emailInput.value.trim()) {
            isValid = false;
            emailInput.parentElement.classList.add('show-error');
            errorMessage = errorMessage ? 'Please fill in all required fields' : 'Please enter your email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.parentElement.classList.add('show-error');
            errorMessage = errorMessage ? 'Please fill in all required fields' : 'Please enter a valid email address';
        }

        if (!isValid) {
            showErrorPopup(errorMessage);
            return;
        }

        // If form is valid, show success message
        showSuccessPopup();
        form.reset();
    });

    // Clear error state when user starts typing in an invalid field
    requiredInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.parentElement.classList.contains('show-error')) {
                if (this.value.trim()) {
                    this.parentElement.classList.remove('show-error');
                }
            }
        });
    });
});

function showErrorPopup(message) {
    const popup = document.getElementById('error-popup');
    const errorMessage = popup.querySelector('.error-message');
    errorMessage.textContent = message;
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

function showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}
