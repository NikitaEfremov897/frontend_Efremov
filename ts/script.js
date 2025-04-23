var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getCards() {
    return __awaiter(this, void 0, void 0, function () {
        var response, comments, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/comments?_limit=3')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    comments = _a.sent();
                    return [2 /*return*/, comments.map(function (comment) { return ({
                            title: "Comment from ".concat(comment.email),
                            description: comment.body,
                            id: comment.id
                        }); })];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching cards:', error_1);
                    return [2 /*return*/, [
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
                        ]];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createCardTemplate(card) {
    return "\n        <div class=\"feature-card\" role=\"button\" tabindex=\"0\" data-id=\"".concat(card.id, "\">\n            <hr>\n            <h3>").concat(card.title, "</h3>\n            <p>").concat(card.description, "</p>\n        </div>\n    ");
}
function renderCards(containerSelector, cards) {
    var container = document.querySelector(containerSelector);
    if (!container) {
        console.error("Container with selector \"".concat(containerSelector, "\" not found."));
        return;
    }
    var cardsHTML = cards.map(createCardTemplate).join("");
    container.innerHTML = cardsHTML;
    var renderedCards = container.querySelectorAll('.feature-card');
    renderedCards.forEach(function (card, index) {
        card.addEventListener('click', function () {
            updateHeaderText(cards[index].description);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                updateHeaderText(cards[index].description);
            }
        });
    });
}
function updateHeaderText(newText) {
    var header = document.querySelector('.info h1');
    if (header) {
        header.textContent = newText;
    }
}
function initPreloader() {
    var preloader = document.getElementById('preloader');
    if (!preloader)
        return;
    window.addEventListener('load', function () {
        preloader.style.opacity = '0';
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 500);
    });
}
function initModals() {
    var modals = {
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
        if (!modal || !openBtn || !closeBtn)
            return;
        openBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (modal)
                modal.style.display = 'block';
        });
        closeBtn.addEventListener('click', function () {
            if (modal)
                modal.style.display = 'none';
        });
        window.addEventListener('click', function (e) {
            if (e.target === modal && modal)
                modal.style.display = 'none';
        });
    }
    setupModal(modals.signup.modal, modals.signup.openBtn, modals.signup.closeBtn);
    setupModal(modals.login.modal, modals.login.openBtn, modals.login.closeBtn);
    var signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Registration successful!');
            if (modals.signup.modal)
                modals.signup.modal.style.display = 'none';
        });
    }
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Login successful!');
            if (modals.login.modal)
                modals.login.modal.style.display = 'none';
        });
    }
}
function initSlider() {
    var slides = document.querySelectorAll('.hero-image');
    if (slides.length === 0)
        return function () { };
    var currentSlide = 0;
    function showSlide() {
        slides.forEach(function (slide, i) {
            slide.classList.toggle('active', i === currentSlide);
        });
    }
    var slideInterval = setInterval(function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide();
    }, 3000);
    showSlide();
    return function () { return clearInterval(slideInterval); };
}
function initializeApp() {
    return __awaiter(this, void 0, void 0, function () {
        var preloader, cardData, cleanupSlider, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    preloader = document.querySelector('.preloader');
                    if (preloader) {
                        preloader.style.display = 'flex';
                        preloader.style.opacity = '1';
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, getCards()];
                case 2:
                    cardData = _a.sent();
                    renderCards(".features", cardData);
                    initPreloader();
                    initModals();
                    cleanupSlider = initSlider();
                    if (cleanupSlider) {
                        window.addEventListener('unload', cleanupSlider);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error initializing app:", error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setTimeout(function () {
                        if (preloader) {
                            preloader.style.opacity = '0';
                            setTimeout(function () {
                                preloader.style.display = 'none';
                            }, 500);
                        }
                    }, 1000);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", initializeApp);
