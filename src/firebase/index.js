// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBer3u9UeKq6rr3ThZ-YA84JAyK0dWIXW8",
  authDomain: "webferrol-app.firebaseapp.com",
  projectId: "webferrol-app",
  storageBucket: "webferrol-app.appspot.com",
  messagingSenderId: "333482588665",
  appId: "1:333482588665:web:92ed7fba0d6376a9b1a528",
  measurementId: "G-0DVHLVC3CQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

//Activación de persistencia cuando no haya conexión de red
enableIndexedDbPersistence(db)
  //.then(() => console.log('Todo ok'))
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

//const analytics = getAnalytics(app);
const auth = getAuth();

export { firebaseApp, db, auth, storage }