import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqZZFVsgbJ3OixetcA81YhvWmbXW3OGpE",
  authDomain: "kway-2026.firebaseapp.com",
  projectId: "kway-2026",
  storageBucket: "kway-2026.firebasestorage.app",
  messagingSenderId: "954020489874",
  appId: "1:954020489874:web:27c54378736910b00ad44b",
  measurementId: "G-X5G2PR43P1",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth =
  getApps().length > 1
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

export const db = getFirestore(app);
