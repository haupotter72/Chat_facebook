import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDRxMgfYYLSRS7BBaoM7OGuBD88UiVhK1U",
    authDomain: "chat-1ac28.firebaseapp.com",
    projectId: "chat-1ac28",
    storageBucket: "chat-1ac28.appspot.com",
    messagingSenderId: "799252825655",
    appId: "1:799252825655:web:8a325c0f927d154716a1b2",
    measurementId: "G-NB7E8MHKX8",
  })
  .auth();
