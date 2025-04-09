const cards = {
  card_1: {
    title: "Professional Profile",
    description: "We know finding the right job is stressful, so we've made it simple...",
  },
  card_2: {
    title: "Best Portfolio",
    description: "Showcase your work and stand out from the crowd...",
  },
  card_3: {
    title: "Powerful Resume",
    description: "Create a resume that gets noticed by recruiters...",
  }
};

function getCards() {
  return Object.values(cards); 
}

function createCardTemplate(card) {
  return `
    <div class="feature-card" role="button" tabindex="0">
      <hr>
      <h3>${card.title}</h3>
      <p>${card.description}</p>
    </div>
  `;
}

function renderCards(containerSelector, cards) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found.`);
    return;
  }

  const cardsHTML = cards.map(createCardTemplate).join(""); 
  container.innerHTML = cardsHTML; 

  
  const renderedCards = container.querySelectorAll('.feature-card');

  renderedCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      updateHeaderText(cards[index].description); 
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        updateHeaderText(cards[index].description);
      }
    });
  });
}

function updateHeaderText(newText) {
  const header = document.querySelector('.info h1');
  if (header) {
    header.textContent = newText;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const cardData = getCards(); 
  renderCards(".features", cardData); 
});
window.addEventListener('DOMContentLoaded', function() {
  initPreloader();
  initModals();
  initSlider();
});
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500); 
  }, 1000); 
});

function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function() {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });
}
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
  setupModal(modals.signup.modal, modals.signup.openBtn, modals.signup.closeBtn);
  setupModal(modals.login.modal, modals.login.openBtn, modals.login.closeBtn);

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