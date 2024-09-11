// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAEzcQg3MgwFCfUEDeqtyXUqQ1jseIe3rA',
  authDomain: 'perfitt-11-supreme-97137.firebaseapp.com',
  projectId: 'perfitt-11-supreme-97137',
  storageBucket: 'perfitt-11-supreme-97137.appspot.com',
  messagingSenderId: '688939823762',
  appId: '1:688939823762:web:dc6cad08100b0f8f35ac4b',
  measurementId: 'G-86H2ZBF0B5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const USER_COLLECTION = collection(db, 'users');
