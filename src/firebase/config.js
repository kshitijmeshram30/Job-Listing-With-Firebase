import app from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD5x6Rkt69wVaT9mcebAVS0NBfRpcSc5Hw",
    authDomain: "job-listing-app-925b5.firebaseapp.com",
    projectId: "job-listing-app-925b5",
    storageBucket: "job-listing-app-925b5.appspot.com",
    messagingSenderId: "238614628343",
    appId: "1:238614628343:web:77e641ad58eeb5ca6f10f2"
  };
  // Initialize Firebase
  const firebase = app.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();

  export {firebase, firestore, app};
