import React from "react";
import { Marker, Source, Layer } from "react-map-gl";
// local imports
import useDataSites from "../hooks/useDataSites";
import MapPopup from "./MapPopup";
import FilterBox from "./FilterBox";
import { useEffect } from "react";

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
  const [proxy, setProxy] = React.useState("");
  const [compilation, setCompilation] = React.useState("");
  const [timespan, setTimespan] = React.useState("");
  const [resolution, setResolution] = React.useState("");
  const [mapData, setMapData] = React.useState(null);
  const { data, isLoading, isError } = useDataSites();
  const [popupFeature, setPopupFeature] = React.useState(null);

  useEffect(() => {
    // filter results by form inputs
    if (data) {
      // check if any filters are set
      if (proxy || compilation || timespan || resolution) {
        console.log("filter set");
        const newFeatures = data.features.filter((item) => {
          let proxyCheck = true;
          let compilationCheck = true;
          let timespanCheck = true;
          let resolutionCheck = true;

          if (proxy) {
            proxyCheck = item.properties.proxy_type === proxy;
          }

          if (compilation) {
            compilationCheck = item.properties.compilation === compilation;
          }

          if (timespan) {
            console.log(timespan.split(","));
            const timeArray = timespan.split(",");
            timespanCheck =
              item.properties.timespan >= timeArray[0] &&
              item.properties.timespan <= timeArray[1];
          }

          if (resolution) {
            resolutionCheck = item.properties.resolution === resolution;
          }

          return (
            proxyCheck && compilationCheck && timespanCheck & resolutionCheck
          );
        });

        const newData = { type: "FeatureCollection", features: newFeatures };
        console.log("NEW DATA", newData);
        setMapData(newData);
      } else {
        setMapData(data);
      }
    }
  }, [data, proxy, compilation, timespan, resolution]);

  if (isLoading) return null;
  if (isError) return null;
  return (
    <div>
      <FilterBox
        proxy={proxy}
        setProxy={setProxy}
        compilation={compilation}
        setCompilation={setCompilation}
        timespan={timespan}
        setTimespan={setTimespan}
        resolution={resolution}
        setResolution={setResolution}
      />

      {mapData &&
        mapData.features.map((item) => (
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
