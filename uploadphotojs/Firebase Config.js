// js/firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRKeXJg7ZFyoy2N3RoVgMFnaaHQ1y5WWE",
    authDomain: "wedding-3e426.firebaseapp.com",
    projectId: "wedding-3e426",
    storageBucket: "wedding-3e426.firebasestorage.app",
    messagingSenderId: "531046039955",
    appId: "1:531046039955:web:ac629474956529c160e866"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);
