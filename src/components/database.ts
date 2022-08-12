// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC0P9xHiTZI_p2qGm0rImrkONvXqd0t6Q",
  authDomain: "ionic2do-b433b.firebaseapp.com",
  databaseURL: "https://ionic2do-b433b-default-rtdb.firebaseio.com",
  projectId: "ionic2do-b433b",
  storageBucket: "ionic2do-b433b.appspot.com",
  messagingSenderId: "1044263925843",
  appId: "1:1044263925843:web:541f3aac2095c61b6daea6",
  measurementId: "G-HF85ETBL0Z",
};

const app = initializeApp(firebaseConfig);

export default getFirestore();
