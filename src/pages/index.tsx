import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import {
  fireStore,
  UserInfo,
  initFood,
  deleteFood,
  updataFood,
} from 'apis/firebase/firebase';
import {
  collection,
  query,
  getDocs,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';

export default function MainPage() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(fireStore, 'info');
  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(
            position.coords.latitude +
              ' ' +
              position.coords.longitude +
              ' ' +
              position.timestamp,
          );
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }
  getLocation();
  // 시작될때 한번만 실행
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const querySnapshot = await getDocs(query(usersCollectionRef));
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      const data = querySnapshot.docs.map(
        (doc: DocumentSnapshot<DocumentData>) => ({
          ...doc.data(),
        }),
      ) as UserInfo[];
      setUsers(data);
    };
    getUsers();
  }, []);
  return (
    <>
      <Link to="/layout">Route/Layout</Link>
      <br />
      <Link to="/files">파일 업로드/다운로드</Link>
      <br />
      <Link to="/editor">Web Editor(Summernote)</Link>
      <br />
      {users.map((value, i) => (
        <div key={`main${i}`}>
          <div>{value.desc}</div>
          <div>
            {value.number
              ? value.number.map((v, i) => <div key={`index${i}`}>{v}</div>)
              : '없음'}
          </div>
          <div>{value.name}</div>
        </div>
      ))}
      <button
        onClick={() => {
          initFood({
            name: '바나나',
            desc: '속살이 하얗다. 껍질은 노랗다',
            number: [1, 2, 3, 4, 5],
          });
        }}
      >
        추가하기
      </button>
      <button
        onClick={() => {
          updataFood(4, '사과');
        }}
      >
        업뎃하기
      </button>
      <button
        onClick={() => {
          deleteFood('사과2');
        }}
      >
        삭제하기
      </button>
    </>
  );
}
