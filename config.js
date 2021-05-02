import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAxx2u3yPqwG_5AzWgbQ_v3eZyQS7fwhf4",
    authDomain: "hwschedule-ee91d.firebaseapp.com",
    projectId: "hwschedule-ee91d",
    storageBucket: "hwschedule-ee91d.appspot.com",
    messagingSenderId: "152257524217",
    appId: "1:152257524217:web:dfc145c0aa59de415fcd28"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()