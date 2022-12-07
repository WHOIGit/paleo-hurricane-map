import React, { useState } from "react";
import { Marker } from "react-map-gl";
// local imports
import useDataSites from "../hooks/useDataSites";
import MapPopup from "./MapPopup";

export default function MapMarkers() {
  const { data, isLoading, isError } = useDataSites();
  const [popupFeature, setPopupFeature] = useState(null);

  console.log(data, isError);

  if (isLoading) return null;
  if (isError) return null;
  return (
    <div>
      {data &&
        data.features.map((item) => (
          <Marker
            longitude={item.geometry.coordinates[0]}
            latitude={item.geometry.coordinates[1]}
            color="red"
            key={`marker-${item.id}`}
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupFeature(item);
            }}
          />
        ))}

      {popupFeature && (
        <MapPopup feature={popupFeature} setPopupFeature={setPopupFeature} />
      )}
    </div>
  );
}
