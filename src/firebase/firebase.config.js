import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAn_wV_QJTkBzwfaHTo5D7f3CoPUHkOlto",
    authDomain: "ecotrack-auth-9303d.firebaseapp.com",
    projectId: "ecotrack-auth-9303d",
    storageBucket: "ecotrack-auth-9303d.firebasestorage.app",
    messagingSenderId: "711921128139",
    appId: "1:711921128139:web:c5616cf6a8bcff75dc814e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
