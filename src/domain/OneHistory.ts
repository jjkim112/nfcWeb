export class OneHistory {
  lat: number | null;
  lon: number | null;
  updateTime: Date;

  constructor(lat: number | null, lon: number | null, updateTime: Date) {
    this.lat = lat;
    this.lon = lon;
    this.updateTime = updateTime;
  }
  static fromData(data: any): OneHistory | null {
    try {
      return new OneHistory(
        data['lat'],
        data['lon'],
        new Date(Number(data['updateTime']) * 1000),
      );
    } catch (e) {
      console.log(`[OneHistory.fromData] ${e}`);
      return new OneHistory(0, 0, new Date(0));
    }
  }

  toMap(): Map<string, any> {
    const temporaryInTempMap = new Map();
    temporaryInTempMap.set('lat', this.lat);
    temporaryInTempMap.set('lon', this.lon);
    temporaryInTempMap.set('updateTime', this.updateTime);

    return temporaryInTempMap;
  }
}
