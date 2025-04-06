// ==================== Main Initialization ====================
window.addEventListener('DOMContentLoaded', function() {
  initPreloader();
  initModals();
  initSlider();
});

// ==================== Preloader ====================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function() {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });
}

// ==================== Modals ====================
function initModals() {
  const modals = {
    signup: {
      modal: document.getElementById('signupModal'),
      openBtn: document.getElementById('signUpBtn'),
      closeBtn: document.getElementById('closeModal')
    },
    login: {
      modal: document.getElementById('loginModal'),
      openBtn: document.querySelector('.log-in'),
      closeBtn: document.getElementById('closeLoginModal')
    }
  };

  // Open/close modals
  function setupModal(modal, openBtn, closeBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Setup each modal
  setupModal(modals.signup.modal, modals.signup.openBtn, modals.signup.closeBtn);
  setupModal(modals.login.modal, modals.login.openBtn, modals.login.closeBtn);

  // Form submissions
  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Registration successful!');
    modals.signup.modal.style.display = 'none';
  });

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login successful!');
    modals.login.modal.style.display = 'none';
  });
}

// ==================== Slider ====================
function initSlider() {
  const slides = document.querySelectorAll('.hero-image');
  let currentSlide = 0;
  
  function showSlide() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide();
  }, 3000);

  showSlide();
}