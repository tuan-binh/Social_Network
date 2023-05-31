// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7g-q9CoqIY7QbgBo6JmIZnxqfadxxQwM",
  authDomain: "upload-img-a4d0c.firebaseapp.com",
  projectId: "upload-img-a4d0c",
  storageBucket: "upload-img-a4d0c.appspot.com",
  messagingSenderId: "736867202226",
  appId: "1:736867202226:web:c273ce25863695aa9805ab",
  measurementId: "G-JXY2LRFDS6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
