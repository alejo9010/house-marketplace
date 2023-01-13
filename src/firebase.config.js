// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDeoNFqEoZD7y_eiXuMoGVPQ1sEzZri_wo',
  authDomain: 'house-marketplace-app-e72e4.firebaseapp.com',
  projectId: 'house-marketplace-app-e72e4',
  storageBucket: 'house-marketplace-app-e72e4.appspot.com',
  messagingSenderId: '287954199136',
  appId: '1:287954199136:web:d1b130027f8f9f2e525905',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
