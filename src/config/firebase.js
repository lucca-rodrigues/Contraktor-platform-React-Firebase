import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB_FWr5UsbzFjiOuj6-o8Z7tLA9O50QSvY",
  authDomain: "projeto-eventos-ec809.firebaseapp.com",
  databaseURL: "https://projeto-eventos-ec809.firebaseio.com",
  projectId: "projeto-eventos-ec809",
  storageBucket: "projeto-eventos-ec809.appspot.com",
  messagingSenderId: "917705733791",
  appId: "1:917705733791:web:7d3dbc985bffb90410d4aa"
  };

  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
