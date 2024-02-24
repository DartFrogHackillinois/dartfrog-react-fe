// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "dartfrog-ecb02.firebaseapp.com",
    projectId: "dartfrog-ecb02",
    storageBucket: "dartfrog-ecb02.appspot.com",
    messagingSenderId: "856470715739",
    appId: "1:856470715739:web:780d9d50c7e604d4336e7e",
    measurementId: "G-RQ3MY0NEG8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
