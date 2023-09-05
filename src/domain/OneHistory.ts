import { Timestamp } from 'firebase/firestore';

export class OneHistory {
  lat: number | null;
  lon: number | null;
  updateTime: Date | null;
  deviceInfo: string | null;
  deviceHash: string | null;

  constructor(
    lat: number | null,
    lon: number | null,
    updateTime: Date | null,
    deviceInfo: string | null,
    deviceHash: string | null,
  ) {
    this.lat = lat;
    this.lon = lon;
    this.updateTime = updateTime;
    this.deviceInfo = deviceInfo;
    this.deviceHash = deviceHash;
  }
  static fromData(data: any): OneHistory | null {
    try {
      return new OneHistory(
        data['coordinate']['lat'] ?? 0,
        data['coordinate']['lon'] ?? 0,
        (data['updateTime'] as Timestamp).toDate(),
        data['deviceInfo'],
        data['deviceHash'],
      );
    } catch (e) {
      console.log(`[OneHistory.fromData] ${e}`);
      return new OneHistory(0, 0, new Date(0), '', '');
    }
  }
  // Firestore data converter

  toMapForFireBase(): any {
    return {
      coordinate: { lat: this.lat, lon: this.lon },
      updateTime: this.updateTime,
      deviceInfo: this.deviceInfo,
      deviceHash: this.deviceHash,
    };
  }
}
