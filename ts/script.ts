interface Comment {
    email: string;
    body: string;
    id: number;
    [key: string]: any; // For other potential properties we don't care about
}

interface Card {
    title: string;
    description: string;
    id: number;
}

interface ModalElements {
    modal: HTMLElement | null;
    openBtn: HTMLElement | null;
    closeBtn: HTMLElement | null;
}

async function getCards(): Promise<Card[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const comments: Comment[] = await response.json();
    
        return comments.map(comment => ({
            title: `Comment from ${comment.email}`,
            description: comment.body,
            id: comment.id
        }));
        
    } catch (error) {
        console.error('Error fetching cards:', error);
        
        return [
            {
                title: "Professional Profile",
                description: "We know finding the right job is stressful, so we've made it simple...",
                id: 1
            },
            {
                title: "Best Portfolio",
                description: "Showcase your work and stand out from the crowd...",
                id: 2
            },
            {
                title: "Powerful Resume",
                description: "Create a resume that gets noticed by recruiters...",
                id: 3
            }
        ];
    }
}

function createCardTemplate(card: Card): string {
    return `
        <div class="feature-card" role="button" tabindex="0" data-id="${card.id}">
            <hr>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
        </div>
    `;
}

function renderCards(containerSelector: string, cards: Card[]): void {
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.error(`Container with selector "${containerSelector}" not found.`);
        return;
    }

    const cardsHTML = cards.map(createCardTemplate).join(""); 
    container.innerHTML = cardsHTML; 

    const renderedCards = container.querySelectorAll<HTMLElement>('.feature-card');

    renderedCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            updateHeaderText(cards[index].description); 
        });
        card.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                updateHeaderText(cards[index].description);
            }
        });
    });
}

function updateHeaderText(newText: string): void {
    const header = document.querySelector<HTMLHeadingElement>('.info h1');
    if (header) {
        header.textContent = newText;
    }
}

function initPreloader(): void {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

function initModals(): void {
    const modals = {
        signup: {
            modal: document.getElementById('signupModal'),
            openBtn: document.getElementById('signUpBtn'),
            closeBtn: document.getElementById('closeModal')
        },
        login: {
            modal: document.getElementById('loginModal'),
            openBtn: document.querySelector<HTMLElement>('.log-in'),
            closeBtn: document.getElementById('closeLoginModal')
        }
    } as Record<string, ModalElements>;
    
    function setupModal(modal: HTMLElement | null, openBtn: HTMLElement | null, closeBtn: HTMLElement | null): void {
        if (!modal || !openBtn || !closeBtn) return;

        openBtn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            if (modal) modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });

        window.addEventListener('click', (e: MouseEvent) => {
            if (e.target === modal && modal) modal.style.display = 'none';
        });
    }
    
    setupModal(modals.signup.modal, modals.signup.openBtn, modals.signup.closeBtn);
    setupModal(modals.login.modal, modals.login.openBtn, modals.login.closeBtn);

    const signupForm = document.getElementById('signupForm') as HTMLFormElement | null;
    if (signupForm) {
        signupForm.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();
            alert('Registration successful!');
            if (modals.signup.modal) modals.signup.modal.style.display = 'none';
        });
    }

    const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
    if (loginForm) {
        loginForm.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();
            alert('Login successful!');
            if (modals.login.modal) modals.login.modal.style.display = 'none';
        });
    }
}

function initSlider(): () => void {
    const slides = document.querySelectorAll<HTMLElement>('.hero-image');
    if (slides.length === 0) return () => {};
    
    let currentSlide = 0;
    
    function showSlide(): void {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
    }

    const slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide();
    }, 3000);

    showSlide();
    
    return () => clearInterval(slideInterval);
}

async function initializeApp(): Promise<void> {
    const preloader = document.querySelector<HTMLElement>('.preloader');
    if (preloader) {
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
    }

    try {
        const cardData = await getCards();
        renderCards(".features", cardData);
    
        initPreloader();
        initModals();
        const cleanupSlider = initSlider();
        if (cleanupSlider) {
            window.addEventListener('unload', cleanupSlider);
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    } finally {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", initializeApp);