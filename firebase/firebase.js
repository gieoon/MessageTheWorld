import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyC-zbnM3WFg4rvFerbALCkhAwZ3JogYEvw",
    authDomain: "passitforward-7662c.firebaseapp.com",
    projectId: "passitforward-7662c",
    storageBucket: "passitforward-7662c.appspot.com",
    messagingSenderId: "273480932624",
    appId: "1:273480932624:web:c9a347b09edb607de91995",
    measurementId: "G-LESXXQPHBY"
};
  
var app;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

export const storage = getStorage(app);
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
