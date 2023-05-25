// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3uaFZxMm7NC7csgVgFRwVPR9Uo77ZZYc",
  authDomain: "auth-project-9ca5c.firebaseapp.com",
  projectId: "auth-project-9ca5c",
  storageBucket: "auth-project-9ca5c.appspot.com",
  messagingSenderId: "942778323158",
  appId: "1:942778323158:web:59239407cd408fdaa33977"
};


let app;

app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();

export { auth };   