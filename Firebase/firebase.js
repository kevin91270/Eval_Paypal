// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//import { } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCudEO_7P6Tpu3QUV4H5IN5EQivaHWiByI",
  authDomain: "projet5-cbe71.firebaseapp.com",
  projectId: "projet5-cbe71",
  storageBucket: "projet5-cbe71.appspot.com",
  messagingSenderId: "770548540689",
  appId: "1:770548540689:web:65386b57a517db48c5d8b0"
};

// Initialize Firebase

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
}
else {
  app = app.firebase()
}

const auth = firebase.auth()
const db = firebase.firestore()
const Firebase = {
  products: () => {
    return db.collection('products')
  },
  user: () => {
    return db.collection('user')
  }
}

export { auth, db, Firebase }

// const app = initializeApp(firebaseConfig);