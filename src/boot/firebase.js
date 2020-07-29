// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAtVA1L6HjSyM4Cod1X47ExcSz8LtBbf34",
  authDomain: "licenta-3b932.firebaseapp.com",
  databaseURL: "https://licenta-3b932.firebaseio.com",
  projectId: "licenta-3b932",
  storageBucket: "licenta-3b932.appspot.com",
  messagingSenderId: "472267527358",
  appId: "1:472267527358:web:712ef23bb469d76e14faef"
};
// Initialize Firebase
let firebaseApp=firebase.initializeApp(firebaseConfig);
let firebaseAuth=firebaseApp.auth();
let firebaseDb=firebaseApp.database();

export{firebaseAuth,firebaseDb}
