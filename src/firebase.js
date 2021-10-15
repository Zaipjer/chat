import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAStFY--e-EcjEwvxrrfaaWJIe_edpqDBY",
    authDomain: "chat-8e312.firebaseapp.com",
    projectId: "chat-8e312",
    storageBucket: "chat-8e312.appspot.com",
    messagingSenderId: "221629545792",
    appId: "1:221629545792:web:e3076710921401b6674ea5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider(app);

const db = getFirestore(app);

export { auth, provider, db };