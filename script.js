// script.js - Основной JavaScript файл для АвтоТор

// Данные для быстрого просмотра
const carData = {
    bmw: {
        title: "BMW X5 xDrive40i",
        desc: "Роскошный кроссовер с мощным двигателем 340 л.с. Полный привод, 8-ступенчатая АКПП.",
        price: "5 890 000 ₽",
        image: "https://avatars.mds.yandex.net/get-entity_search/5504037/1228435937/S600xU_2x",
        link: "autotor.html"
    },
    mercedes: {
        title: "Mercedes-Benz GLE 350",
        desc: "Роскошный кроссовер с гибридной установкой EQ Boost. Полный привод, 9-ступенчатая АКПП.",
        price: "6 150 000 ₽",
        image: "https://avatars.mds.yandex.net/get-autoru-vos/2165425/51aeb04658c96386b7d5b9fc7131a6f7/1200x900",
        link: "autotor1.html"
    },
    audi: {
        title: "Audi Q7 55 TFSI",
        desc: "Просторный 7-местный SUV с полным приводом quattro. Двигатель 3.0 л, 340 л.с.",
        price: "5 980 000 ₽",
        image: "https://avatars.mds.yandex.net/i?id=19e4d8b023ab7ff67332da155eef489bc8f08519-13104207-images-thumbs&n=13",
        link: "autotor2.html"
    },
    volvo: {
        title: "Volvo XC90 Recharge",
        desc: "Гибридный SUV премиум-класса с запасом хода 45 км на электротяге.",
        price: "6 450 000 ₽",
        image: "https://avatars.mds.yandex.net/i?id=10b417aaad62557aa8d55e800849dc0a5426ef65-10700817-images-thumbs&n=13",
        link: "#"
    },
    porsche: {
        title: "Porsche Cayenne",
        desc: "Спортивный SUV с отличной динамикой. Разгон до 100 км/ч за 5.2 секунды.",
        price: "7 250 000 ₽",
        image: "https://avatars.mds.yandex.net/get-entity_search/2057673/1236866597/S600xU_2x",
        link: "#"
    },
    lexus: {
        title: "Lexus RX 350",
        desc: "Надежный и комфортный премиум-кроссовер с бесступенчатой трансмиссией.",
        price: "5 750 000 ₽",
        image: "https://avatars.mds.yandex.net/get-autoru-vos/5232626/9216c6b6fdcdadeee27a474bc6b5352d/1200x900",
        link: "#"
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initNavbarScroll();
    initQuickView();
    initCatalogFilters();
    initContactForm();
    initCarAnimations();
    initSmoothScroll();
    initScrollSpy();
    initProductPage();
});

// Инициализация AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            offset: 100,
            easing: 'ease-in-out',
            delay: 100
        });
    }
}

// Эффект скролла для навбара
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Быстрый просмотр автомобилей
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    if (!quickViewButtons.length) return;
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const car = this.dataset.car;
            const data = carData[car];
            
            if (!data) return;
            
            const modalImage = document.getElementById('quickViewImage');
            const modalTitle = document.getElementById('quickViewTitle');
            const modalDesc = document.getElementById('quickViewDesc');
            const modalPrice = document.getElementById('quickViewPrice');
            const modalLink = document.getElementById('quickViewLink');
            
            if (modalImage) modalImage.src = data.image;
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalDesc) modalDesc.textContent = data.desc;
            if (modalPrice) modalPrice.innerHTML = `<span class="car-price">${data.price}</span>`;
            if (modalLink) modalLink.href = data.link;
        });
    });
}

// Фильтрация в каталоге
function initCatalogFilters() {
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (!brandFilter || !priceFilter) return;
    
    function filterItems() {
        const brandValue = brandFilter.value;
        const priceValue = priceFilter.value;
        const items = document.querySelectorAll('.catalog-item');
        
        items.forEach(item => {
            let showItem = true;
            
            if (brandValue !== 'all' && item.dataset.brand !== brandValue) {
                showItem = false;
            }
            
            if (priceValue !== 'all' && showItem) {
                const price = parseInt(item.dataset.price);
                const [min, max] = priceValue.split('-');
                
                if (max === '9999999') {
                    if (price <= parseInt(min)) showItem = false;
                } else if (price < parseInt(min) || price > parseInt(max)) {
                    showItem = false;
                }
            }
            
            if (showItem) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    brandFilter.addEventListener('change', filterItems);
    priceFilter.addEventListener('change', filterItems);
}

// Обработка контактной формы
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        const successAlert = document.getElementById('successAlert');
        
        let isValid = true;
        
        clearAllErrors();
        
        if (!name || !name.value.trim()) {
            showError(name, 'Введите имя');
            isValid = false;
        }
        
        if (!email || !email.value.trim()) {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }
        
        if (!phone || !phone.value.trim()) {
            showError(phone, 'Введите телефон');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Введите корректный телефон');
            isValid = false;
        }
        
        if (!message || !message.value.trim()) {
            showError(message, 'Введите сообщение');
            isValid = false;
        }
        
        if (isValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                if (successAlert) {
                    successAlert.classList.remove('d-none');
                }
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    if (successAlert) {
                        successAlert.classList.add('d-none');
                    }
                }, 5000);
            }, 1500);
        }
    });
}

function clearAllErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.remove();
    });
}

function showError(input, message) {
    if (!input) return;
    input.classList.add('is-invalid');
    
    const formGroup = input.closest('.mb-3');
    if (!formGroup) return;
    
    let errorDiv = formGroup.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

// Анимации для автомобилей с GSAP
function initCarAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.utils.toArray('.car-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    gsap.utils.toArray('.advantage-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=50',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.2,
            ease: 'backOut(1.7)'
        });
    });
}

// Плавный скролл к якорям
function initSmoothScroll() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Подсветка активного пункта меню
function initScrollSpy() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}

// Функции для страниц товаров
function initProductPage() {
    if (document.getElementById('mainImage')) {
        window.changeImage = function(src) {
            const mainImage = document.getElementById('mainImage');
            if (mainImage) mainImage.src = src;
            
            document.querySelectorAll('.gallery-thumb').forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            if (event && event.target) {
                event.target.classList.add('active');
            }
        };
    }
    
    if (document.getElementById('selectedColor')) {
        window.selectColor = function(element, colorName) {
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            element.classList.add('active');
            
            const selectedColor = document.getElementById('selectedColor');
            if (selectedColor) selectedColor.textContent = colorName;
        };
    }
    
    if (document.getElementById('testDriveModal')) {
        window.bookTestDrive = function() {
            if (typeof bootstrap !== 'undefined') {
                const modal = new bootstrap.Modal(document.getElementById('testDriveModal'));
                modal.show();
            }
        };
    }
    
    if (document.getElementById('downPayment')) {
        const downPaymentSlider = document.getElementById('downPayment');
        if (downPaymentSlider) {
            downPaymentSlider.addEventListener('input', function() {
                const percent = this.value;
                const percentDisplay = document.getElementById('downPaymentPercent');
                if (percentDisplay) percentDisplay.textContent = percent;
                
                const monthlyPayment = document.getElementById('monthlyPayment');
                if (monthlyPayment) {
                    const carPrice = 5890000;
                    const downPaymentAmount = carPrice * (percent / 100);
                    const creditAmount = carPrice - downPaymentAmount;
                    const monthlyPaymentValue = (creditAmount * 0.15) / 12;
                    
                    monthlyPayment.textContent = Math.round(monthlyPaymentValue).toLocaleString('ru-RU') + ' ₽';
                }
            });
        }
    }
    
    window.buyNow = function() {
        const carModel = document.querySelector('h1')?.textContent || 'автомобиль';
        alert(`Спасибо за интерес к ${carModel}! Наш менеджер свяжется с вами в ближайшее время.`);
    };
    
    window.downloadSpecs = function() {
        alert('PDF файл со спецификацией будет отправлен на ваш email');
    };
}

// Форматирование цены
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}

// Анимация карточек при наведении
document.addEventListener('mouseover', function(e) {
    const card = e.target.closest('.car-card');
    if (card) {
        const img = card.querySelector('.card-img-top');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    }
});

document.addEventListener('mouseout', function(e) {
    const card = e.target.closest('.car-card');
    if (card) {
        const img = card.querySelector('.card-img-top');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    }
});

// Ленивая загрузка изображений
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Экспорт функций для глобального доступа
window.avtotor = {
    initAOS,
    initNavbarScroll,
    initQuickView,
    initCatalogFilters,
    initContactForm,
    initCarAnimations,
    initSmoothScroll,
    initScrollSpy,
    initProductPage,
    changeImage: window.changeImage,
    selectColor: window.selectColor,
    bookTestDrive: window.bookTestDrive,
    buyNow: window.buyNow,
    downloadSpecs: window.downloadSpecs
};
