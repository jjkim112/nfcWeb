import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
export interface UserInfo {
  desc: string;
  name: string;
  number: number[];
}
firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();

const initFood = async (user: UserInfo) => {
  const stationRef = doc(fireStore, 'info', `food${user.name}`);

  await setDoc(stationRef, { ...user });
};

const updataFood = async (number: number, name: string) => {
  const stationRef = doc(fireStore, 'info', `food${name}`);

  await updateDoc(stationRef, { number: arrayUnion(6) });
  // Atomically add a new region to the "regions" array field.
  // await updateDoc(stationRef, { number: arrayUnion(6) });

  // Atomically remove a region from the "regions" array field.
  // await updateDoc(stationRef, { number: arrayRemove(6) });
};
const deleteFood = async (name: string) => {
  await deleteDoc(doc(fireStore, 'info', `food${name}`));
};

export { fireStore, initFood, deleteFood, updataFood };
