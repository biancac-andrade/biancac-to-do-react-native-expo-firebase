import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "XXXXX",
  authDomain: "XXXXXXX",
  projectId: "XXXXXXX",
  storageBucket: "XXXXXXX",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
