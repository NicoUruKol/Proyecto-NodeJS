import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey:            process.env.FIREBASE_API_KEY,
    authDomain:        process.env.FIREBASE_AUTH_DOMAIN,
    projectId:         "tannatco-back-node",
    storageBucket:     process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "413307252073",
    appId:             process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
