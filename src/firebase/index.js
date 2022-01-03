import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVnKZdn89ygrpi6q2XRrhQ5v9bbY-fdVg",
  authDomain: "blogimage-198c4.firebaseapp.com",
  projectId: "blogimage-198c4",
  storageBucket: "blogimage-198c4.appspot.com",
  messagingSenderId: "956401806148",
  appId: "1:956401806148:web:2fdd42f2829eac4f470511",
  measurementId: "G-DKFSLZWMNZ",
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
