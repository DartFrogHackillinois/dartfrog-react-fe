import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    // Your Firebase configuration
    apiKey: process.env.APIKEY, // Make sure the environment variable is correctly set
    authDomain: "dartfrog-ecb02.firebaseapp.com",
    projectId: "dartfrog-ecb02",
    storageBucket: "dartfrog-ecb02.appspot.com",
    messagingSenderId: "856470715739",
    appId: "1:856470715739:web:780d9d50c7e604d4336e7e",
    measurementId: "G-RQ3MY0NEG8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;