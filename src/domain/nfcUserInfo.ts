import { OneHistory } from './OneHistory';

export class NfcUserInfo {
  id: string;
  type: string;
  tagCount: number;
  histories: OneHistory[];

  constructor(
    id: string,
    type: string,
    tagCount: number,
    histories: OneHistory[],
  ) {
    this.id = id;
    this.type = type;
    this.tagCount = tagCount;
    this.histories = histories;
  }
  static fromData(id: string, type: string, data: any): NfcUserInfo | null {
    // [
    //     {
    //         lat: 22.22
    //         lon: 123.32
    //         updateTime: Timestamp {seconds: 1690892078, nanoseconds: 685000000}
    //     },
    //     {
    //         lat: 22.77
    //         lon: 123.56
    //         updateTime: Timestamp {seconds: 1690978574, nanoseconds: 56000000}
    //     }
    //   ]
    try {
      const histories = data['histories'].map((v: any) => {
        return OneHistory.fromData(v);
      });

      return new NfcUserInfo(id, type, histories.length, histories);
    } catch (e) {
      console.log(`[NfcUserInfo.fromData] ${e}`);
      return new NfcUserInfo(id, type, 0, []);
    }
  }

  toMapForFirebase(): Map<string, any> {
    const temporaryMap = new Map();
    temporaryMap.set('id', this.id);
    temporaryMap.set('type', this.type);
    temporaryMap.set('tagCount', this.tagCount);
    temporaryMap.set(
      'histories',
      this.histories.map((v, i) => {
        return v.toMap();
      }),
    );
    return temporaryMap;
  }
}
