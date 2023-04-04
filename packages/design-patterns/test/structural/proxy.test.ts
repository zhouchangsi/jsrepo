import { describe, expect, it } from "vitest";
import { GeoProxy } from "@/structural/proxy";

describe("Proxy Pattern", () => {
  it("cache amount should be 3", () => {
    const geo = new GeoProxy();

    // geolocation requests
    geo.getLatLng("Paris");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");

    expect(geo.cacheAmount).toBe(3);
  });
});
