// Import the functions you need from the SDKs you need
// import firestore from '@react-native-firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxiUhdpfLnbKiM2ev7hdz6f5aPNVy1GTc",
  authDomain: "projectsecu-a3323.firebaseapp.com",
  projectId: "projectsecu-a3323",
  storageBucket: "projectsecu-a3323.appspot.com",
  messagingSenderId: "824812412300",
  appId: "1:824812412300:web:3725f55c8f85b876cc4aa9",
  measurementId: "G-NMKJQYS8YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export default getFirestore(app);
