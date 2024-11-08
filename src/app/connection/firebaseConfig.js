// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSS8ZVUPeoiGXTdOMdjdYaDHZ9YoqS9TI",
  authDomain: "gerenciamentodetarefas-b1812.firebaseapp.com",
  projectId: "gerenciamentodetarefas-b1812",
  storageBucket: "gerenciamentodetarefas-b1812.firebasestorage.app",
  messagingSenderId: "32955577094",
  appId: "1:32955577094:web:8ba8a37a9bbe2fd853a487",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
