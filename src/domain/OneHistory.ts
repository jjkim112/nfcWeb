import { Timestamp } from 'firebase/firestore';

export class OneHistory {
  lat: number | null;
  lon: number | null;
  updateTime: Date | null;

  constructor(lat: number | null, lon: number | null, updateTime: Date | null) {
    this.lat = lat;
    this.lon = lon;
    this.updateTime = updateTime;
  }
  static fromData(data: any): OneHistory | null {
    try {
      return new OneHistory(
        data['lat'],
        data['lon'],
        (data['updateTime'] as Timestamp).toDate(),
      );
    } catch (e) {
      console.log(`[OneHistory.fromData] ${e}`);
      return new OneHistory(0, 0, new Date(0));
    }
  }
  // Firestore data converter

  toMapForFireBase(): any {
    return {
      lat: this.lat,
      lon: this.lon,
      updateTime: this.updateTime,
    };
  }
}
