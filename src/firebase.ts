// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD1XeHAdQwpcV1F7xIjfDgwS8eu9C8jEQ4",
    authDomain: "web2025-a8b2b.firebaseapp.com",
    projectId: "web2025-a8b2b",
    storageBucket: "web2025-a8b2b.appspot.com",
    messagingSenderId: "689039568489",
    appId: "1:689039568489:web:2faacd6d45277a50c87cf8",
    measurementId: "G-LVEK2RK0FE"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
