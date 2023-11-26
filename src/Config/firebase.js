import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCREsdYz6INhqQ2RBHBinpC_ZgS-TSSXPU',
  authDomain: 'sctk-links-edba8.firebaseapp.com',
  projectId: 'sctk-links-edba8',
  storageBucket: 'sctk-links-edba8.appspot.com',
  messagingSenderId: '569555549208',
  appId: '1:569555549208:web:ce02e044ef53857dee976d',
  measurementId: 'G-HBVRCDRF7Q',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
