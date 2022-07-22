// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeFirestore} from 'firebase/firestore'


import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0r59gnyX_PgpJkLDH2cJ51sAneOfypMM",
  authDomain: "chatmate-fe492.firebaseapp.com",
  projectId: "chatmate-fe492",
  storageBucket: "chatmate-fe492.appspot.com",
  messagingSenderId: "705823715212",
  appId: "1:705823715212:web:effe67c24a8af38401b0a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const game = getAuth(app)
export const store = getStorage(app)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});


