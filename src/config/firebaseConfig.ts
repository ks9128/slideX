// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAI, getGenerativeModel, getLiveGenerativeModel, GoogleAIBackend, ResponseModality } from "firebase/ai";


// Your web app's Firebase configuration
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

// Create a `LiveGenerativeModel` instance with the flash-live model (only model that supports the Live API)
export const GeminiAiLiveModel = getLiveGenerativeModel(ai, {
  model: "gemini-2.0-flash-live-001",
  // Configure the model to respond with text
  generationConfig: {
    responseModalities: [ResponseModality.TEXT],
  },
});