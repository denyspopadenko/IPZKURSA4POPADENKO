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
// 🌐 МОВА (УКР/АНГЛ) - ПРОСТА ВЕРСІЯ З ПЕРЕЗАВАНТАЖЕННЯМ
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
    // Оновлення елементів з атрибутом data-i18n
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
    
    // Оновлення кнопки мови
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = window.currentLanguage === 'uk' ? 'UA' : 'EN';
    }
    
    // Оновлення кнопки входу (якщо не залогінений)
    const authButton = document.getElementById('authButton');
    if (authButton && !window.currentUser) {
        const signInText = window.currentLanguage === 'uk' ? 'Увійти' : 'Sign In';
        authButton.innerHTML = `<button onclick="openAuthModal()" class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition"><i class="fas fa-user mr-2"></i>${signInText}</button>`;
    }
}

// ОСНОВНА ФУНКЦІЯ ЗМІНИ МОВИ (просте перезавантаження)
function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
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
    
    // Поточний статус мови для кнопки
    const currentLangForButton = window.currentLanguage === 'uk' ? 'en' : 'uk';
    
    navHtml += `
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <button onclick="toggleTheme()" class="p-2 rounded-lg bg-gray-800 text-yellow-500 hover:bg-gray-700 transition">
                            <i id="themeIcon" class="fas ${window.currentTheme === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>
                        </button>
                        
                        <button onclick="switchLanguage('${currentLangForButton}')" class="p-2 rounded-lg bg-gray-800 text-yellow-500 hover:bg-gray-700 transition font-bold">
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
    const userMenu = document.getElementById('userMenu');
    
    if (window.currentUser) {
        if (userName) userName.textContent = window.currentUser.name;
        if (userEmail) userEmail.textContent = window.currentUser.email;
        
        // Оновлюємо кнопку входу на аватар
        const authButton = document.getElementById('authButton');
        if (authButton) {
            const firstLetter = window.currentUser.name?.charAt(0) || 'U';
            authButton.innerHTML = `
                <div class="flex items-center gap-2 cursor-pointer" onclick="toggleUserMenu()">
                    ${window.currentUser.photoURL 
                        ? `<img src="${window.currentUser.photoURL}" class="w-8 h-8 rounded-full object-cover">` 
                        : `<div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">${firstLetter}</div>`
                    }
                    <span class="hidden md:inline">${window.currentUser.name?.split(' ')[0] || window.currentUser.name}</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                </div>
            `;
        }
    } else {
        // Відновлюємо кнопку входу
        const authButton = document.getElementById('authButton');
        if (authButton) {
            const signInText = window.currentLanguage === 'uk' ? 'Увійти' : 'Sign In';
            authButton.innerHTML = `<button onclick="openAuthModal()" class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition"><i class="fas fa-user mr-2"></i>${signInText}</button>`;
        }
    }
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('hidden');
    }
}

window.updatePageAfterAuth = function() {
    const isLoggedIn = !!window.currentUser;
    const protectedNavItems = ['nav-profile', 'nav-add-coin'];
    
    protectedNavItems.forEach(itemId => {
        const el = document.getElementById(itemId);
        if (el) {
            if (isLoggedIn) el.classList.remove('hidden');
            else el.classList.add('hidden');
        }
    });
    
    // Показуємо адмін-панель для адміністратора
    const adminLink = document.getElementById('adminLink');
    if (adminLink) {
        if (window.currentUser && window.currentUser.role === 'admin') {
            adminLink.classList.remove('hidden');
        } else {
            adminLink.classList.add('hidden');
        }
    }
    
    updateUserMenu();
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
        updateUserMenu();
        window.updatePageAfterAuth();
    }
});

// Глобальні функції
window.toggleTheme = toggleTheme;
window.switchLanguage = switchLanguage;
window.updatePageAfterAuth = window.updatePageAfterAuth;
window.toggleUserMenu = toggleUserMenu;