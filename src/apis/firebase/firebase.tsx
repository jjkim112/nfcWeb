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
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  apiKey: 'AIzaSyAK4q6l6fMwg9B-9fiYln_F3BX_r73j_Sw',
  authDomain: 'clip-n-go.firebaseapp.com',
  projectId: 'clip-n-go',
  storageBucket: 'clip-n-go.appspot.com',
  messagingSenderId: '1032534954960',
  appId: '1:1032534954960:web:36bed96cac3c2d018d1fd5',
  measurementId: 'G-J1NP0THR92',
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
fireStore.settings({
  experimentalForceLongPolling: true, // this line
  // useFetchStreams: false, // and this line
});

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
      .collection('campaigns')
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
  const stationRef = doc(fireStore, 'campaigns', typeId, 'products', id);
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
      .collection('campaigns')
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
