// ============================================
// 🔥 FIREBASE CONFIGURATION
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyBrccVfv2RLhBTH8oM2IlG6TGJheDOExwQ",
  authDomain: "numismatic-guide-9cc6b.firebaseapp.com",
  projectId: "numismatic-guide-9cc6b",
  storageBucket: "numismatic-guide-9cc6b.firebasestorage.app",
  messagingSenderId: "1034882045759",
  appId: "1:1034882045759:web:c6900a243a0bf47a2a258a",
  measurementId: "G-9GJ2F887YF"
};

// Ініціалізація Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore ? firebase.firestore() : null;

// Глобальний експорт
window.auth = auth;
window.db = db;

console.log("Firebase initialized successfully!");