import * as React from "react";
import Map, { NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// local import
import MapMarkers from "../components/MapMarkers";
export default function Root() {
  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 7,
      }}
      mapLib={maplibregl}
      style={{ height: "100vh", width: "100%" }}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    >
      <NavigationControl />
      <MapMarkers />
    </Map>
  );
}
