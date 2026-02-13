// script.js - Основной JavaScript файл для АвтоТор

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initNavbarScroll();
    initQuickView();
    initCatalogFilters();
    initContactForm();
    initCarAnimations();
});

// Инициализация AOS (Animate On Scroll)
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out',
        delay: 100
    });
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

// Быстрый просмотр автомобилей
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    if (!quickViewButtons.length) return;
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const car = this.dataset.car;
            const data = carData[car];
            
            if (!data) return;
            
            document.getElementById('quickViewImage').src = data.image;
            document.getElementById('quickViewTitle').textContent = data.title;
            document.getElementById('quickViewDesc').textContent = data.desc;
            document.getElementById('quickViewPrice').innerHTML = `<span class="car-price">${data.price}</span>`;
            document.getElementById('quickViewLink').href = data.link;
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
            
            // Фильтр по бренду
            if (brandValue !== 'all' && item.dataset.brand !== brandValue) {
                showItem = false;
            }
            
            // Фильтр по цене
            if (priceValue !== 'all' && showItem) {
                const price = parseInt(item.dataset.price);
                let [min, max] = priceValue.split('-');
                
                if (max === '9999999') {
                    if (price <= parseInt(min)) showItem = false;
                } else if (price < parseInt(min) || price > parseInt(max)) {
                    showItem = false;
                }
            }
            
            // Показываем/скрываем с анимацией
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
        
        // Обновляем AOS
        AOS.refresh();
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
        
        // Валидация
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        const successAlert = document.getElementById('successAlert');
        
        let isValid = true;
        
        // Проверка имени
        if (!name.value.trim()) {
            showError(name, 'Введите имя');
            isValid = false;
        } else {
            clearError(name);
        }
        
        // Проверка email
        if (!email.value.trim()) {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // Проверка телефона
        if (!phone.value.trim()) {
            showError(phone, 'Введите телефон');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Введите корректный телефон');
            isValid = false;
        } else {
            clearError(phone);
        }
        
        // Проверка сообщения
        if (!message.value.trim()) {
            showError(message, 'Введите сообщение');
            isValid = false;
        } else {
            clearError(message);
        }
        
        if (isValid) {
            // Анимация отправки
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки
            setTimeout(() => {
                successAlert.classList.remove('d-none');
                contactForm.reset();
                submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Отправить';
                submitBtn.disabled = false;
                
                // Скрываем алерт через 5 секунд
                setTimeout(() => {
                    successAlert.classList.add('d-none');
                }, 5000);
                
                // Плавный скролл к алерту
                successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        }
    });
}

// Валидация email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валидация телефона
function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

// Показать ошибку
function showError(input, message) {
    const formGroup = input.closest('.mb-3');
    let errorDiv = formGroup.querySelector('.invalid-feedback');
    
    input.classList.add('is-invalid');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

// Очистить ошибку
function clearError(input) {
    input.classList.remove('is-invalid');
    const formGroup = input.closest('.mb-3');
    const errorDiv = formGroup.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Анимации для автомобилей с GSAP
function initCarAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Анимация карточек при появлении
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
    
    // Параллакс эффект для Hero секции
    gsap.to('.hero-section', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        backgroundPosition: '50% 30%',
        ease: 'none'
    });
    
    // Анимация преимуществ
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

// Форматирование цены
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}

// Добавление анимации при наведении на карточки
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
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
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
    initCarAnimations
};
