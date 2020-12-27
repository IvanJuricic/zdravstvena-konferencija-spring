import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9q1eSVaJwFHjeBKFLC9veE7TODxNVUmU",
  authDomain: "znanstvena-konferencija.firebaseapp.com",
  projectId: "znanstvena-konferencija",
  storageBucket: "znanstvena-konferencija.appspot.com",
  messagingSenderId: "242889620906",
  appId: "1:242889620906:web:6b03c41285830fea257fd3",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
