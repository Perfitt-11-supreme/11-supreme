// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const USER_COLLECTION = collection(db, 'users');
const database = getDatabase(app);
const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};

export { USER_COLLECTION, auth, storage, database, db, signInWithGoogle };
