// ============================================
// 🌍 MAIN.JS - ГОЛОВНА ЛОГІКА (ТЕМА, МОВА, НАВІГАЦІЯ)
// ============================================

// Глобальні змінні
window.currentLanguage = localStorage.getItem('language') || 'en';
window.currentTheme = localStorage.getItem('theme') || 'dark';

// ============================================
// 🎨 ТЕМА (ТЕМНА/СВІТЛА)
// ============================================

function initTheme() {
    if (window.currentTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        updateThemeIcon('light');
    } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        updateThemeIcon('dark');
    }
}

function toggleTheme() {
    if (window.currentTheme === 'dark') {
        window.currentTheme = 'light';
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        window.currentTheme = 'dark';
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (themeText) {
        themeText.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
}

// ============================================
// 🌐 МОВА (УКР/АНГЛ) - ПОКРАЩЕНА ВЕРСІЯ
// ============================================

let translations = { uk: {}, en: {} };

async function loadTranslations() {
    try {
        const [ukRes, enRes] = await Promise.all([
            fetch('locales/uk.json'),
            fetch('locales/en.json')
        ]);
        translations.uk = await ukRes.json();
        translations.en = await enRes.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function applyTranslations() {
    // 1. Оновлення елементів з атрибутом data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[window.currentLanguage]?.[key];
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.placeholder !== undefined) {
                    el.placeholder = translation;
                } else {
                    el.value = translation;
                }
            } else {
                el.innerHTML = translation;
            }
        }
    });
    
    // 2. Оновлення placeholder через data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = translations[window.currentLanguage]?.[key];
        if (translation && el.placeholder !== undefined) {
            el.placeholder = translation;
        }
    });
    
    // 3. Оновлення кнопки мови
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = window.currentLanguage === 'uk' ? 'UA' : 'EN';
    }
    
    // 4. Оновлення кнопки входу (якщо не залогінений)
    const authButton = document.getElementById('authButton');
    if (authButton && !window.currentUser) {
        const signInText = window.currentLanguage === 'uk' ? 'Увійти' : 'Sign In';
        authButton.innerHTML = `<button onclick="openAuthModal()" class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition"><i class="fas fa-user mr-2"></i>${signInText}</button>`;
    }
    
    // 5. Оновлення модального вікна авторизації
    const modalTitle = document.getElementById('authModalTitle');
    if (modalTitle) {
        const loginForm = document.getElementById('loginForm');
        const isLoginVisible = loginForm && !loginForm.classList.contains('hidden');
        if (isLoginVisible) {
            modalTitle.textContent = window.currentLanguage === 'uk' ? 'Вхід' : 'Sign In';
        } else {
            modalTitle.textContent = window.currentLanguage === 'uk' ? 'Реєстрація' : 'Sign Up';
        }
    }
    
    // 6. Оновлення вкладок авторизації
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    if (loginTab && registerTab) {
        loginTab.textContent = window.currentLanguage === 'uk' ? 'Вхід' : 'Sign In';
        registerTab.textContent = window.currentLanguage === 'uk' ? 'Реєстрація' : 'Sign Up';
    }
    
    // 7. Оновлення кнопок в модальному вікні
    const signInBtn = document.querySelector('#loginForm button[onclick="signInWithEmail()"]');
    if (signInBtn) {
        signInBtn.textContent = window.currentLanguage === 'uk' ? 'Увійти' : 'Sign In';
    }
    
    const signUpBtn = document.querySelector('#registerForm button[onclick="signUpWithEmail()"]');
    if (signUpBtn) {
        signUpBtn.textContent = window.currentLanguage === 'uk' ? 'Створити акаунт' : 'Create Account';
    }
    
    // 8. Оновлення тексту в user menu
    const myProfileLink = document.querySelector('#userMenu a[href="profile.html"] span');
    const addCoinLink = document.querySelector('#userMenu a[href="add-coin.html"] span');
    const signOutBtn = document.querySelector('#userMenu button span');
    
    if (myProfileLink) {
        myProfileLink.textContent = window.currentLanguage === 'uk' ? 'Мій профіль' : 'My Profile';
    }
    if (addCoinLink) {
        addCoinLink.textContent = window.currentLanguage === 'uk' ? 'Додати монету' : 'Add Coin';
    }
    if (signOutBtn) {
        signOutBtn.textContent = window.currentLanguage === 'uk' ? 'Вийти' : 'Sign Out';
    }
    
    // 9. Оновлення категорій на головній сторінці
    updateCategoryTexts();
    
    // 10. Оновлення футера
    updateFooterTexts();
    
    // 11. Оновлення пошуку
    updateSearchPlaceholder();
    
    // 12. Оновлення заголовків сторінок
    updatePageTitles();
}

function updateCategoryTexts() {
    const categories = [
        { id: 'cat-us', uk: 'Монети США', en: 'US Coins' },
        { id: 'cat-world', uk: 'Монети світу', en: 'World Coins' },
        { id: 'cat-ancient', uk: 'Стародавні монети', en: 'Ancient Coins' },
        { id: 'cat-gold', uk: 'Золоті монети', en: 'Gold Coins' },
        { id: 'cat-error', uk: 'Монети з помилками', en: 'Error Coins' },
        { id: 'cat-commonwealth', uk: 'Співдружність', en: 'Commonwealth' }
    ];
    
    categories.forEach(cat => {
        const el = document.getElementById(cat.id);
        if (el) {
            el.textContent = window.currentLanguage === 'uk' ? cat.uk : cat.en;
        }
    });
    
    // Кнопка Explore All Categories
    const exploreBtn = document.querySelector('.explore-btn, a[href="catalog.html"] .btn-text');
    if (exploreBtn) {
        exploreBtn.textContent = window.currentLanguage === 'uk' ? 'Переглянути всі категорії' : 'Explore All Categories';
    }
}

function updateFooterTexts() {
    const footerTexts = {
        'footer-explore': { uk: 'ДОСЛІДЖУЙТЕ', en: 'EXPLORE' },
        'footer-resources': { uk: 'РЕСУРСИ', en: 'RESOURCES' },
        'footer-company': { uk: 'КОМПАНІЯ', en: 'COMPANY' },
        'footer-newsletter': { uk: 'РОЗСИЛКА', en: 'NEWSLETTER' },
        'footer-coins': { uk: 'Монети', en: 'Coins' },
        'footer-values': { uk: 'Ціни', en: 'Values' },
        'footer-grades': { uk: 'Грейди', en: 'Grades' },
        'footer-notes': { uk: 'Нотатки', en: 'Notes' },
        'footer-grading-guide': { uk: 'Гайд з грейдування', en: 'Coin Grading Guide' },
        'footer-value-charts': { uk: 'Таблиці цін', en: 'Value Charts' },
        'footer-certification': { uk: 'Сертифікація', en: 'Coin Certification' },
        'footer-faqs': { uk: 'Питання', en: 'FAQs' },
        'footer-about': { uk: 'Про нас', en: 'About Us' },
        'footer-contact': { uk: 'Контакти', en: 'Contact' },
        'footer-privacy': { uk: 'Політика конфіденційності', en: 'Privacy Policy' },
        'footer-copyright': { uk: 'Всі права захищені. Довідник нумізмата.', en: 'All rights reserved. Numismatist\'s Reference Guide.' }
    };
    
    Object.keys(footerTexts).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = footerTexts[id][window.currentLanguage];
        }
    });
    
    // Підписка на новини
    const subscribeBtn = document.querySelector('.subscribe-btn, .newsletter-btn');
    if (subscribeBtn) {
        subscribeBtn.textContent = window.currentLanguage === 'uk' ? 'Підписатись' : 'Subscribe';
    }
    
    const newsletterInput = document.querySelector('#newsletter-input, .newsletter-input');
    if (newsletterInput) {
        newsletterInput.placeholder = window.currentLanguage === 'uk' ? 'Введіть ваш email' : 'Enter your email';
    }
}

function updateSearchPlaceholder() {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.placeholder = window.currentLanguage === 'uk' 
            ? 'Пошук монет за назвою, типом, країною або роком...' 
            : 'Search coins by name, type, country, or year...';
    }
}

function updatePageTitles() {
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        const titles = {
            uk: 'Довідник нумізмата - Рідкісні монети світу',
            en: 'Numismatist\'s Guide - Rare Coins Directory'
        };
        pageTitle.textContent = titles[window.currentLanguage] || titles.en;
    }
    
    const heroTitle = document.querySelector('.hero-title, h1[data-hero]');
    if (heroTitle) {
        heroTitle.textContent = window.currentLanguage === 'uk' 
            ? 'Найнадійніший довідник монет у світі'
            : 'The World\'s Most Trusted Coin Reference Directory';
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = window.currentLanguage === 'uk'
            ? 'Визначайте, досліджуйте та оцінюйте монети з усього світу. Створено колекціонерами для колекціонерів.'
            : 'Identify, explore, and value coins from around the world. Built for collectors, by collectors.';
    }
    
    const joinBtn = document.querySelector('.join-btn, .cta-button');
    if (joinBtn) {
        joinBtn.textContent = window.currentLanguage === 'uk' ? 'Приєднатися безкоштовно' : 'Join Free Today';
    }
}

function switchLanguage(lang) {
    window.currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Оновлюємо всі тексти на сторінці
    applyTranslations();
    
    // Оновлюємо кнопку мови
    const langBtn = document.querySelector('button[onclick*="switchLanguage"]');
    if (langBtn) {
        const newLang = window.currentLanguage === 'uk' ? 'en' : 'uk';
        langBtn.setAttribute('onclick', `switchLanguage('${newLang}')`);
    }
    
    // Оновлюємо динамічний контент (якщо є)
    if (typeof updateDynamicContent === 'function') {
        updateDynamicContent();
    }
    
    // Оновлюємо каталог, якщо сторінка каталогу
    if (typeof applyFilters === 'function') {
        applyFilters();
    }
    
    console.log(`Language switched to: ${lang}`);
}

// ============================================
// 🏗️ СТВОРЕННЯ ХЕДЕРА ТА НАВІГАЦІЇ
// ============================================

function createHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navItems = [
        { href: 'index.html', icon: 'fa-home', key: 'nav_home', label: 'Home' },
        { href: 'catalog.html', icon: 'fa-list', key: 'nav_catalog', label: 'Catalog' },
        { href: 'blog.html', icon: 'fa-newspaper', key: 'nav_blog', label: 'Blog' },
        { href: 'values.html', icon: 'fa-chart-line', key: 'nav_values', label: 'Values' },
        { href: 'grades.html', icon: 'fa-star', key: 'nav_grades', label: 'Grades' }
    ];
    
    const protectedItems = [
        { href: 'profile.html', icon: 'fa-user', key: 'nav_profile', label: 'Profile' },
        { href: 'add-coin.html', icon: 'fa-plus-circle', key: 'nav_add_coin', label: 'Add Coin' }
    ];
    
    let navHtml = `
        <nav class="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                    <a href="index.html" class="flex items-center gap-2 text-2xl font-bold text-yellow-500">
                        <i class="fas fa-coins"></i>
                        <span class="hidden sm:inline">Numismatist's Guide</span>
                    </a>
                    
                    <div class="hidden md:flex items-center gap-6">
    `;
    
    navItems.forEach(item => {
        const isActive = currentPage === item.href;
        navHtml += `<a href="${item.href}" class="flex items-center gap-2 ${isActive ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'} transition"><i class="fas ${item.icon}"></i><span data-i18n="${item.key}">${item.label}</span></a>`;
    });
    
    protectedItems.forEach(item => {
        navHtml += `<a href="${item.href}" id="nav-${item.href.split('.')[0]}" class="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition hidden"><i class="fas ${item.icon}"></i><span data-i18n="${item.key}">${item.label}</span></a>`;
    });
    
    navHtml += `<a href="admin.html" id="adminLink" class="flex items-center gap-2 text-red-400 hover:text-red-300 transition hidden"><i class="fas fa-shield-alt"></i><span data-i18n="nav_admin">Admin</span></a>`;
    
    navHtml += `
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <button onclick="toggleTheme()" class="p-2 rounded-lg bg-gray-800 text-yellow-500 hover:bg-gray-700 transition">
                            <i id="themeIcon" class="fas ${window.currentTheme === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>
                        </button>
                        
                        <button onclick="switchLanguage('${window.currentLanguage === 'uk' ? 'en' : 'uk'}')" class="p-2 rounded-lg bg-gray-800 text-yellow-500 hover:bg-gray-700 transition font-bold">
                            <span id="langText">${window.currentLanguage === 'uk' ? 'EN' : 'UA'}</span>
                        </button>
                        
                        <div id="authButton" class="relative">
                            <button onclick="openAuthModal()" class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition">
                                <i class="fas fa-user mr-2"></i><span data-i18n="sign_in">Sign In</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
        <div id="userMenu" class="fixed right-4 top-20 bg-gray-800 rounded-lg shadow-xl z-50 hidden min-w-48">
            <div class="p-4 border-b border-gray-700">
                <p id="userName" class="text-white font-bold"></p>
                <p id="userEmail" class="text-gray-400 text-sm"></p>
            </div>
            <div class="py-2">
                <a href="profile.html" class="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition"><i class="fas fa-user"></i> <span data-i18n="my_profile">My Profile</span></a>
                <a href="add-coin.html" class="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition"><i class="fas fa-plus-circle"></i> <span data-i18n="add_coin">Add Coin</span></a>
                <hr class="border-gray-700 my-1">
                <button onclick="signOut()" class="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-700 transition w-full text-left"><i class="fas fa-sign-out-alt"></i> <span data-i18n="sign_out">Sign Out</span></button>
            </div>
        </div>
    `;
    
    headerPlaceholder.innerHTML = navHtml;
}

function updateUserMenu() {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    if (window.currentUser) {
        if (userName) userName.textContent = window.currentUser.name;
        if (userEmail) userEmail.textContent = window.currentUser.email;
    }
}

function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

window.updatePageAfterAuth = function() {
    const isLoggedIn = !!window.currentUser;
    const protectedNavItems = ['nav-profile.html', 'nav-add-coin.html'];
    
    protectedNavItems.forEach(itemId => {
        const el = document.getElementById(itemId);
        if (el) {
            if (isLoggedIn) el.classList.remove('hidden');
            else el.classList.add('hidden');
        }
    });
    
    updateUserMenu();
    applyTranslations();
};

// ============================================
// 🏁 ІНІЦІАЛІЗАЦІЯ
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    createHeader();
    initTheme();
    await loadTranslations();
    applyTranslations();
    
    if (window.currentUser) {
        if (typeof updateUIAfterLogin === 'function') {
            updateUIAfterLogin(window.currentUser);
        }
        updateUserMenu();
    }
});

window.toggleTheme = toggleTheme;
window.switchLanguage = switchLanguage;
window.updatePageAfterAuth = window.updatePageAfterAuth;