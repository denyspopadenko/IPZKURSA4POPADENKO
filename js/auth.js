// ============================================
// 🔐 AUTHENTICATION SYSTEM (Google + Email)
// ============================================

// Глобальні змінні
let currentUser = null;
let toastTimeout = null;

// ============================================
// 🍞 TOAST СПОВІЩЕННЯ
// ============================================
function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    if (toastTimeout) clearTimeout(toastTimeout);

    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all transform translate-x-0 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);

    toastTimeout = setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// 📱 МОДАЛЬНЕ ВІКНО АВТОРИЗАЦІЇ
// ============================================
function createAuthModal() {
    if (document.getElementById('authModal')) return;

    const modalHTML = `
        <div id="authModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4 transition-all">
            <div class="bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl transform transition-all scale-95 opacity-0" id="authModalContent">
                <div class="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 class="text-2xl font-bold text-white" id="authModalTitle" data-i18n="sign_in">Sign In</h3>
                    <button onclick="closeAuthModal()" class="text-gray-400 hover:text-white transition">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>

                <div class="flex border-b border-gray-700">
                    <button onclick="switchAuthTab('login')" id="loginTab" class="flex-1 py-3 text-center font-medium transition-all border-b-2 border-yellow-500 text-yellow-500" data-i18n="sign_in">Sign In</button>
                    <button onclick="switchAuthTab('register')" id="registerTab" class="flex-1 py-3 text-center font-medium transition-all border-b-2 border-transparent text-gray-400 hover:text-white" data-i18n="sign_up">Sign Up</button>
                </div>

                <div id="loginForm" class="p-6">
                    <div class="mb-4">
                        <label class="block text-gray-300 mb-2" data-i18n="email">Email</label>
                        <input type="email" id="loginEmail" data-i18n-placeholder="email_placeholder" placeholder="your@email.com" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-300 mb-2" data-i18n="password">Password</label>
                        <input type="password" id="loginPassword" data-i18n-placeholder="password_placeholder" placeholder="••••••••" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500">
                    </div>
                    <button onclick="signInWithEmail()" class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-lg transition mb-4" data-i18n="sign_in">Sign In</button>
                    <div class="relative my-4">
                        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-700"></div></div>
                        <div class="relative flex justify-center text-sm"><span class="px-2 bg-gray-900 text-gray-400" data-i18n="or_continue_with">Or continue with</span></div>
                    </div>
                    <button onclick="signInWithGoogle()" class="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 rounded-lg transition flex items-center justify-center gap-2">
                        <i class="fab fa-google"></i> Google
                    </button>
                </div>

                <div id="registerForm" class="p-6 hidden">
                    <div class="mb-4">
                        <label class="block text-gray-300 mb-2" data-i18n="full_name">Full Name</label>
                        <input type="text" id="registerName" data-i18n-placeholder="full_name_placeholder" placeholder="John Doe" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-300 mb-2" data-i18n="email">Email</label>
                        <input type="email" id="registerEmail" data-i18n-placeholder="email_placeholder" placeholder="your@email.com" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-300 mb-2" data-i18n="password">Password</label>
                        <input type="password" id="registerPassword" data-i18n-placeholder="password_placeholder" placeholder="••••••••" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-300 mb-2" data-i18n="confirm_password">Confirm Password</label>
                        <input type="password" id="registerConfirmPassword" data-i18n-placeholder="confirm_password_placeholder" placeholder="••••••••" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500">
                    </div>
                    <button onclick="signUpWithEmail()" class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-lg transition mb-4" data-i18n="create_account">Create Account</button>
                    <div class="relative my-4">
                        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-700"></div></div>
                        <div class="relative flex justify-center text-sm"><span class="px-2 bg-gray-900 text-gray-400" data-i18n="or_continue_with">Or continue with</span></div>
                    </div>
                    <button onclick="signInWithGoogle()" class="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 rounded-lg transition flex items-center justify-center gap-2">
                        <i class="fab fa-google"></i> Google
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('authModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('authModal')) closeAuthModal();
    });
}

function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) createAuthModal();
    const modalContent = document.getElementById('authModalContent');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    const modalContent = document.getElementById('authModalContent');
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 200);
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const modalTitle = document.getElementById('authModalTitle');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('border-b-2', 'border-yellow-500', 'text-yellow-500');
        loginTab.classList.remove('text-gray-400', 'border-transparent');
        registerTab.classList.remove('border-b-2', 'border-yellow-500', 'text-yellow-500');
        registerTab.classList.add('text-gray-400', 'border-transparent');
        modalTitle.textContent = window.currentLanguage === 'uk' ? 'Вхід' : 'Sign In';
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        registerTab.classList.add('border-b-2', 'border-yellow-500', 'text-yellow-500');
        registerTab.classList.remove('text-gray-400', 'border-transparent');
        loginTab.classList.remove('border-b-2', 'border-yellow-500', 'text-yellow-500');
        loginTab.classList.add('text-gray-400', 'border-transparent');
        modalTitle.textContent = window.currentLanguage === 'uk' ? 'Реєстрація' : 'Sign Up';
    }
}

// ============================================
// 🔑 GOOGLE SIGN-IN
// ============================================
async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: user.email === 'admin@admin.com' ? 'admin' : 'user'
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        window.currentUser = userData;

        const welcomeMsg = window.currentLanguage === 'uk' ? `Ласкаво просимо ${user.displayName}!` : `Welcome ${user.displayName}!`;
        showToast(welcomeMsg, 'success');
        closeAuthModal();
        updateUIAfterLogin(userData);
        
        if (typeof updatePageAfterAuth === 'function') updatePageAfterAuth();
        setTimeout(() => location.reload(), 500);
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        showToast(error.message, 'error');
    }
}

// ============================================
// 📧 EMAIL SIGN-IN
// ============================================
async function signInWithEmail() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showToast(window.currentLanguage === 'uk' ? 'Будь ласка, заповніть всі поля' : 'Please fill all fields', 'error');
        return;
    }

    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = result.user;

        const userData = {
            uid: user.uid,
            name: user.displayName || email.split('@')[0],
            email: user.email,
            photoURL: user.photoURL || null,
            role: email === 'admin@admin.com' ? 'admin' : 'user'
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        window.currentUser = userData;

        const welcomeMsg = window.currentLanguage === 'uk' ? `Ласкаво просимо ${userData.name}!` : `Welcome ${userData.name}!`;
        showToast(welcomeMsg, 'success');
        closeAuthModal();
        updateUIAfterLogin(userData);
        
        if (typeof updatePageAfterAuth === 'function') updatePageAfterAuth();
        setTimeout(() => location.reload(), 500);
    } catch (error) {
        console.error('Email Sign-In Error:', error);
        if (error.code === 'auth/user-not-found') {
            showToast(window.currentLanguage === 'uk' ? 'Користувача не знайдено' : 'User not found', 'error');
        } else if (error.code === 'auth/wrong-password') {
            showToast(window.currentLanguage === 'uk' ? 'Невірний пароль' : 'Wrong password', 'error');
        } else {
            showToast(error.message, 'error');
        }
    }
}

// ============================================
// 📝 EMAIL SIGN-UP
// ============================================
async function signUpWithEmail() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        showToast(window.currentLanguage === 'uk' ? 'Будь ласка, заповніть всі поля' : 'Please fill all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast(window.currentLanguage === 'uk' ? 'Паролі не співпадають' : 'Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showToast(window.currentLanguage === 'uk' ? 'Пароль має бути не менше 6 символів' : 'Password must be at least 6 characters', 'error');
        return;
    }

    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = result.user;

        await user.updateProfile({ displayName: name });

        const userData = {
            uid: user.uid,
            name: name,
            email: user.email,
            photoURL: null,
            role: 'user'
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        window.currentUser = userData;

        const createdMsg = window.currentLanguage === 'uk' ? `Акаунт створено! Ласкаво просимо ${name}!` : `Account created! Welcome ${name}!`;
        showToast(createdMsg, 'success');
        closeAuthModal();
        updateUIAfterLogin(userData);
        
        if (typeof updatePageAfterAuth === 'function') updatePageAfterAuth();
        setTimeout(() => location.reload(), 500);
    } catch (error) {
        console.error('Email Sign-Up Error:', error);
        if (error.code === 'auth/email-already-in-use') {
            showToast(window.currentLanguage === 'uk' ? 'Email вже використовується' : 'Email already in use', 'error');
        } else {
            showToast(error.message, 'error');
        }
    }
}

// ============================================
// 🚪 SIGN OUT
// ============================================
async function signOut() {
    try {
        await firebase.auth().signOut();
        localStorage.removeItem('currentUser');
        window.currentUser = null;
        const signOutMsg = window.currentLanguage === 'uk' ? 'Ви вийшли з аккаунту' : 'Signed out successfully';
        showToast(signOutMsg, 'success');
        updateUIAfterLogout();
        
        if (typeof updatePageAfterAuth === 'function') updatePageAfterAuth();
        setTimeout(() => location.reload(), 500);
    } catch (error) {
        console.error('Sign Out Error:', error);
        showToast(error.message, 'error');
    }
}

// ============================================
// 👤 UPDATE UI
// ============================================
function updateUIAfterLogin(user) {
    window.currentUser = user;
    const authButton = document.getElementById('authButton');
    const adminLink = document.getElementById('adminLink');

    if (authButton) {
        const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';
        authButton.innerHTML = `
            <div class="flex items-center gap-2 cursor-pointer" onclick="toggleUserMenu()">
                ${user.photoURL ? `<img src="${user.photoURL}" class="w-8 h-8 rounded-full object-cover">` : `<div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">${firstLetter}</div>`}
                <span class="hidden md:inline">${user.name?.split(' ')[0] || user.name || 'User'}</span>
                <i class="fas fa-chevron-down text-xs"></i>
            </div>
        `;
    }

    if (adminLink && user.role === 'admin') {
        adminLink.classList.remove('hidden');
    } else if (adminLink) {
        adminLink.classList.add('hidden');
    }
}

function updateUIAfterLogout() {
    window.currentUser = null;
    const authButton = document.getElementById('authButton');
    const adminLink = document.getElementById('adminLink');
    const userMenu = document.getElementById('userMenu');

    if (authButton) {
        const signInText = window.currentLanguage === 'uk' ? 'Увійти' : 'Sign In';
        authButton.innerHTML = `<button onclick="openAuthModal()" class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition"><i class="fas fa-user mr-2"></i>${signInText}</button>`;
    }
    if (userMenu) userMenu.classList.add('hidden');
    if (adminLink) adminLink.classList.add('hidden');
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) menu.classList.toggle('hidden');
}

// ============================================
// 👂 LISTENER ДЛЯ ЗМІНИ СТАНУ АВТОРИЗАЦІЇ
// ============================================
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            window.currentUser = JSON.parse(savedUser);
        } else {
            const userData = {
                uid: user.uid,
                name: user.displayName || user.email?.split('@')[0] || 'User',
                email: user.email,
                photoURL: user.photoURL,
                role: user.email === 'admin@admin.com' ? 'admin' : 'user'
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            window.currentUser = userData;
        }
        updateUIAfterLogin(window.currentUser);
    } else {
        window.currentUser = null;
        updateUIAfterLogout();
    }
    if (typeof updatePageAfterAuth === 'function') updatePageAfterAuth();
});

// ============================================
// 📌 ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createAuthModal();
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        updateUIAfterLogin(window.currentUser);
    }
});

// Глобальний експорт
window.signInWithGoogle = signInWithGoogle;
window.signInWithEmail = signInWithEmail;
window.signUpWithEmail = signUpWithEmail;
window.signOut = signOut;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.toggleUserMenu = toggleUserMenu;
window.showToast = showToast;
window.updateUIAfterLogin = updateUIAfterLogin;
window.updateUIAfterLogout = updateUIAfterLogout;