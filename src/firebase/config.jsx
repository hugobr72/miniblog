
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYvKFaQ756iI87ChFIC4_P72AU-yEGNe0",
  authDomain: "miniblog-6edf4.firebaseapp.com",
  projectId: "miniblog-6edf4",
  storageBucket: "miniblog-6edf4.appspot.com",
  messagingSenderId: "624425401823",
  appId: "1:624425401823:web:4b55862d94fa94ce0e186a"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };