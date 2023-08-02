import { testReadData, testSetData } from 'apis/firebase/firebase';
import { OneHistory } from 'domain/OneHistory';
import { NfcUserInfo } from 'domain/nfcUserInfo';
import React, { useEffect, useState } from 'react';

import {
  useLocation,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

export default function TestPage() {
  const [serachParams, setSerachParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const testId: string | null = serachParams.get('id');

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

  const _testFunc = async () => {
    // testSetData(testConsole);
    testReadData('삼성핸드폰광고2308', 'eachId1');

    const b = await testReadData('삼성핸드폰광고2308', 'eachId1');

    console.log('dasdasd');
    console.log(b);
    console.log('banggu');
    console.log(b!.toMapForFirebase());
  };

  useEffect(() => {
    _testFunc();
    getLocation();
  }, []);

  return (
    <>
      <h1>테스트페이지</h1>
      <div>테스트중</div>
    </>
  );
}
