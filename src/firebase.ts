import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOiutznSemgj5CmwfYJTV3W5lnPfI-CQo",
  authDomain: "twitter-y.firebaseapp.com",
  projectId: "twitter-y",
  storageBucket: "twitter-y.appspot.com",
  messagingSenderId: "1042331464729",
  appId: "1:1042331464729:web:2f8e114d557d5eedde6688",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
