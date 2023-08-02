import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { fireStore } from 'apis/firebase/firebase';
import {
  collection,
  query,
  getDocs,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';

export default function MainPage() {
  //   const [users, setUsers] = useState<UserInfo[]>([]);
  //   // db의 users 컬렉션을 가져옴
  //   const usersCollectionRef = collection(fireStore, 'info');
  //   function getLocation() {
  //     if (navigator.geolocation) {
  //       // GPS를 지원하면
  //       navigator.geolocation.getCurrentPosition(
  //         function (position) {
  //           console.log(
  //             typeof position.coords.latitude +
  //               ' ' +
  //               typeof position.coords.longitude +
  //               ' ' +
  //               position.timestamp,
  //           );
  //         },
  //         function (error) {
  //           console.error(error);
  //         },
  //         {
  //           enableHighAccuracy: false,
  //           maximumAge: 0,
  //           timeout: Infinity,
  //         },
  //       );
  //     } else {
  //       alert('GPS를 지원하지 않습니다');
  //     }
  //   }
  //   getLocation();
  //   // 시작될때 한번만 실행
  //   useEffect(() => {
  //     // 비동기로 데이터 받을준비
  //     const getUsers = async () => {
  //       // getDocs로 컬렉션안에 데이터 가져오기
  //       const querySnapshot = await getDocs(query(usersCollectionRef));
  //       console.log(querySnapshot);
  //       // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
  //       const data = querySnapshot.docs.map(
  //         (doc: DocumentSnapshot<DocumentData>) => ({
  //           ...doc.data(),
  //         }),
  //       ) as UserInfo[];
  //       console.log(data);
  //       setUsers(data);
  //     };
  //     getUsers();
  //   }, []);
  //   return (
  //     <>
  //       <Link to="/test">겁내지말고이리온</Link>
  //       <br />
  //       <Link to="/layout">Route/Layout</Link>
  //       <br />
  //       <Link to="/files">파일 업로드/다운로드</Link>
  //       <br />
  //       <Link to="/editor">Web Editor(Summernote)</Link>
  //       <br />
  //       {users ? (
  //         users.map((value, i) => (
  //           <div key={`main${i}`}>
  //             <div>{value.desc}</div>
  //             <div>
  //               {value.number
  //                 ? value.number.map((v, i) => <div key={`index${i}`}>{v}</div>)
  //                 : '없음'}
  //             </div>
  //             <div>{value.name}</div>
  //           </div>
  //         ))
  //       ) : (
  //         <div>배열없음</div>
  //       )}
  //       <button
  //         onClick={() => {
  //           initFood({
  //             name: '수박',
  //             desc: '달아요, 빨개요, 씨가있어요',
  //             number: [1],
  //           });
  //         }}
  //       >
  //         추가하기
  //       </button>
  //       <button
  //         onClick={() => {
  //           updataFood([1, 2, 1], '수박');
  //         }}
  //       >
  //         업뎃하기
  //       </button>
  //       <button
  //         onClick={() => {
  //           deleteFood('수박');
  //         }}
  //       >
  //         삭제하기
  //       </button>
  //     </>
  //   );
  // }
  return <div>1</div>;
}
