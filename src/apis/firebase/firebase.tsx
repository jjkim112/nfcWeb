import { OneHistory } from 'domain/OneHistory';
import { NfcUserInfo } from 'domain/nfcUserInfo';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
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

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();

const testSetData = async (type: string | null, id: string) => {
  const stationRef = doc(
    fireStore,
    'DBWD_WebCollection',
    type ?? '',
    'nfcUserInfos',
    id,
  );

  await setDoc(stationRef, { id });
};

const testReadData: (
  typeStr: string,
  id: string,
) => Promise<NfcUserInfo | null> = async (typeStr: string, id: string) => {
  const stationRef = doc(fireStore, 'test', typeStr, 'nfcUserInfos', id);
  const docSnap = await getDoc(stationRef);

  if (docSnap.exists()) {
    return NfcUserInfo.fromData(id, typeStr, docSnap.data());
  } else {
    return null;
  }
};

// const testUpdateData = async (testInfoId: string | null) => {
//   const stationRef = doc(fireStore, 'info', `food${name}`);

//   await updateDoc(stationRef, { name: '멜론', number: number });
// };

// const updataFood = async (number: number[], name: string) => {
//   const stationRef = doc(fireStore, 'info', `food${name}`);

//   await updateDoc(stationRef, { name: '멜론', number: number });

// };
// const deleteFood = async (name: string) => {
//   await deleteDoc(doc(fireStore, 'info', `food${name}`));
// };
export { fireStore, testSetData, testReadData };
