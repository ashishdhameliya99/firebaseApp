// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBT30KUIjKbCSal2Hey_p6Oo8yRAsU6aFk',
  authDomain: 'fir-app-e846f.firebaseapp.com',
  projectId: 'fir-app-e846f',
  storageBucket: 'fir-app-e846f.firebasestorage.app',
  messagingSenderId: '1021574425223',
  appId: '1:1021574425223:web:dc70c9cacd1e85c1936622',
  measurementId: 'G-009F5MZYCZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
