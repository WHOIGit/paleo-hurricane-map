import * as React from "react";
import Map, { NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// local import
import MapMarkers from "../components/MapMarkers";

export default function Root() {
  return (
    <>
      <Map
        initialViewState={{
          latitude: 17.3,
          longitude: -87.5,
          zoom: 2,
        }}
        mapLib={maplibregl}
        style={{ height: "92vh", width: "100%" }}
        mapStyle="https://api.maptiler.com/maps/satellite/style.json?key=TmZ9aal6ExudHs1hVtCW"
      >
        <NavigationControl />
        <MapMarkers />
      </Map>
    </>
  );
}
