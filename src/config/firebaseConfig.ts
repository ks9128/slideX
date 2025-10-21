// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-project-7489e.firebaseapp.com",
  projectId: "my-project-7489e",
  storageBucket: "my-project-7489e.firebasestorage.app",
  messagingSenderId: "907644786489",
  appId: "1:907644786489:web:70fa6cc54700188c56bae8",
  measurementId: "G-2LWN4BCCHM",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app);


// Initialize the Gemini Developer API backend service
const ai = getAI(app, {backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance with a model that supports your use case
export const GeminiAiModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });