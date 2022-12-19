import React, { useState } from "react";
import { Marker, Source, Layer } from "react-map-gl";
// local imports
import useDataSites from "../hooks/useDataSites";
import MapPopup from "./MapPopup";

const GeoShape = ({ item }) => {
  // render any Geo shapes attached to this location
  const layerStyle = {
    id: `geoshape-${item.id}`,
    type: "fill",
    paint: {
      "fill-color": "orange",
      "fill-opacity": 0.5,
      "fill-outline-color": "#fc4e2a",
    },
  };

  let geojson = item.properties.geom_polygon;

  if (geojson === null) geojson = item.properties.geom_line;

  if (geojson === null) {
    return null;
  }
  return (
    <Source id={`geoshape-${item.id}`} type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  );
};

export default function MapMarkers() {
  const { data, isLoading, isError } = useDataSites();
  const [popupFeature, setPopupFeature] = useState(null);

  if (isLoading) return null;
  if (isError) return null;
  return (
    <div>
      {data &&
        data.features.map((item) => (
          <div key={`marker-${item.id}`}>
            <Marker
              longitude={item.geometry.coordinates[0]}
              latitude={item.geometry.coordinates[1]}
              color="red"
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupFeature(item);
              }}
            />
            <GeoShape item={item} />
          </div>
        ))}

      {popupFeature && (
        <MapPopup feature={popupFeature} setPopupFeature={setPopupFeature} />
      )}
    </div>
  );
}
