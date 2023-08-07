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

const testSetData: (
  uid: string,
  id: string,
  newHistoryData: OneHistory,
) => Promise<boolean> = async (
  uid: string,
  id: string,
  newHistoryData: OneHistory,
) => {
  try {
    const previousData = await testReadData(uid, id);

    const historiesData = previousData?.histories;

    historiesData?.push(newHistoryData);

    await fireStore
      .collection('categories')
      .doc(uid)
      .collection('products')
      .doc(id)
      .set({
        histories: historiesData?.map((v, i) => {
          return v.toMapForFireBase();
        }),
        id: id,
      });

    return true;
  } catch (error) {
    return false;
  }
};

const testReadData: (
  typeId: string,
  id: string,
) => Promise<NfcUserInfo | null> = async (typeId: string, id: string) => {
  const stationRef = doc(fireStore, 'categories', typeId, 'products', id);
  const docSnap = await getDoc(stationRef);

  if (docSnap.exists()) {
    return NfcUserInfo.fromData(id, typeId, docSnap.data());
  } else {
    return null;
  }
};

export const testUpdateData: (
  uid: string,
  id: string,
  newHistoryData: OneHistory,
) => Promise<boolean> = async (
  uid: string,
  id: string,
  newHistoryData: OneHistory,
) => {
  try {
    const previousData = await testReadData(uid, id);
    console.log(
      previousData?.histories.map((v, _) => {
        return v.updateTime;
      }),
    );

    const historiesData = previousData?.histories;

    historiesData?.push(newHistoryData);

    await fireStore
      .collection('categories')
      .doc(uid)
      .collection('products')
      .doc(id)
      .update({
        histories: historiesData?.map((v, i) => {
          return v.toMapForFireBase();
        }),
      });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// };
// const deleteFood = async (name: string) => {
//   await deleteDoc(doc(fireStore, 'info', `food${name}`));
// };
export { fireStore, testSetData, testReadData };
