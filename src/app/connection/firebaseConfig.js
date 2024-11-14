// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSC4gZVAOhMMuqATIo4-0IxjtNH7Z53Hs",
  authDomain: "gerenciador-de-taferas.firebaseapp.com",
  projectId: "gerenciador-de-taferas",
  storageBucket: "gerenciador-de-taferas.firebasestorage.app",
  messagingSenderId: "913726879355",
  appId: "1:913726879355:web:432222359d1f7108c3d4de",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
