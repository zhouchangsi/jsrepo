/**
 * real subject
 */
class GeoCoder {
  // get latitude and longitude
  getLatLng(address: string) {
    if (address === "Amsterdam") {
      return "52.3700° N, 4.8900° E";
    } else if (address === "London") {
      return "51.5171° N, 0.1062° W";
    } else if (address === "Paris") {
      return "48.8742° N, 2.3470° E";
    } else if (address === "Berlin") {
      return "52.5233° N, 13.4127° E";
    } else {
      return "";
    }
  }
}

/**
 * @description proxyer of real subject, if data store in cache, then get data in cache, else return value of real subject
 */
export class GeoProxy {
  private geocoder: GeoCoder;
  private geocache: Record<string, unknown>;
  public constructor() {
    this.geocoder = new GeoCoder();
    this.geocache = {};
  }

  public getLatLng(address: string) {
    if (!this.geocache[address]) {
      this.geocache[address] = this.geocoder.getLatLng(address);
    }
    return this.geocache[address];
  }
  public get cacheAmount() {
    let count = 0;
    for (let code in this.geocache) {
      count++;
    }
    return count;
  }
}
