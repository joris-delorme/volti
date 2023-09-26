import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAcFsB7FVdAO7ekcbw6IVw7kiu3zjFUjd0",
  authDomain: "volti-55ea7.firebaseapp.com",
  projectId: "volti-55ea7",
  storageBucket: "volti-55ea7.appspot.com",
  messagingSenderId: "329318463850",
  appId: "1:329318463850:web:7793472916c626dd81cd13",
  measurementId: "G-QD7HZ8ENP4"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {
  app,
  auth
}