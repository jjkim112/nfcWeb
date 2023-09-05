import {
  testReadData,
  testSetData,
  testUpdateData,
} from 'apis/firebase/firebase';
import { OneHistory } from 'domain/OneHistory';
import { NfcUserInfo } from 'domain/nfcUserInfo';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';

import { useSearchParams } from 'react-router-dom';

export default function TestPage() {
  const [serachParams, setSerachParams] = useSearchParams();
  const [testBool, setTestBool] = useState(false);

  function getPosition(): Promise<any> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject),
    );
  }

  async function getHistoryMapDataToBeUpdate() {
    // const nowTime = Date.now();
    // const nowDate = new Date(nowTime);
    try {
      const data = await getPosition();
      //deviceid가져오는것
      const deviceData = await DeviceInfo.getUniqueId().then((uniqueId) => {
        return uniqueId;
      });
      return {
        lat: data.coords.latitude,
        lon: data.coords.longitude,
        updateTime: Number(data.timestamp),
        deviceId: deviceData,
      };
    } catch (error) {
      //TODO 에러떳을때 처음인 경우 위치수락하시겠습니까? 뜨도록 ->이거불가능해 안해
      return null;
    }
  }

  async function mainFunction() {
    //2.유저가 링크 접속시 id,type,위치,시간 받아서 저장, 위치,시간은 map화한다
    const id: string | null = serachParams.get('id');
    const categoryId: string | null = serachParams.get('categoryId');
    // const deviceId: string | null =

    // if (id === null || categoryId === null) {
    //   return;
    // }

    //->id,categoryId는 read에 사용되고 map화한 위치 및 시간정보는 update할때 쓰임.
    //2-1.id & categoryId 받아오기

    //2-2.위치 & 시간 정보 받아와서 맵핑하기
    const mapData = await getHistoryMapDataToBeUpdate();

    //3.updateHistory 라는 함수를 만들것이다. 인풋은 id,type<경로용> 맵화된 시간,시간 위치정보<데이터용>
    // bool isSuccess = await updateHistory(id, type, mapData);
    //http://localhost:3000/test?id=4981d82551390&typeId=aswaswasw
    //id=4981d82551390 typeId=aswaswasw
    //3-1-a.데이터를 통채로 불러와서 history추가한뒤 set하기

    const newHistoryData: OneHistory = new OneHistory(
      mapData?.lat,
      mapData?.lon,
      new Date(mapData?.updateTime ?? 0),
      mapData?.deviceId ?? 'No device info',
    );

    // const isSuccess = await testSetData(
    //   'aswaswasw',
    //   '4981d82551390',
    //   newHistoryData,
    // );

    //3-1-b.update하기

    const isSuccess = await testUpdateData(
      'nO4H4EPp61LWam9Nsd8t',
      'ssm3-020f268b-a64e-45b3',
      newHistoryData,
    );

    setTestBool(isSuccess);

    //3-2.firebase에서 제공하는 arrayUnion 활용하기

    //4. 리다이렉트 하기
  }

  useEffect(() => {
    mainFunction();
  }, []);

  if (testBool) {
    return <Navigate to="/" replace={true} />;
  }

  return <div>테스트중입니다</div>;
}
