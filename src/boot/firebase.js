import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF9k2GJQM24HUxFgJWMMsjuXD2w3vHxv4",
  authDomain: "qwitter-da90f.firebaseapp.com",
  projectId: "qwitter-da90f",
  storageBucket: "qwitter-da90f.appspot.com",
  messagingSenderId: "885759086274",
  appId: "1:885759086274:web:f176cb3b22d1cb8796755b"
};
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;
