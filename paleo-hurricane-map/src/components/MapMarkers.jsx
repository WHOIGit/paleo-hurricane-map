import React from "react";
import { Marker, Source, Layer } from "react-map-gl";
// local imports
import useDataSites from "../hooks/useDataSites";
import MapPopup from "./MapPopup";
import FilterBox from "./FilterBox";
import CompilationBox from "./CompilationBox";
import { useEffect } from "react";
import LegendBox from "./LegendBox";

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
  const [length, setLength] = React.useState("");
  const [resolution, setResolution] = React.useState("");
  const [mapData, setMapData] = React.useState(null);
  const { data, isLoading, isError } = useDataSites();
  const [popupFeature, setPopupFeature] = React.useState(null);

  console.log(mapData);

  useEffect(() => {
    // filter results by form inputs
    if (data) {
      // check if any filters are set
      if (proxy || compilation || length || resolution) {
        console.log("filter set");
        const newFeatures = data.features.filter((item) => {
          let proxyCheck = true;
          let compilationCheck = true;
          let lengthCheck = true;
          let resolutionCheck = true;

          if (proxy) {
            proxyCheck = item.properties.proxy_type === proxy;
          }

          if (compilation) {
            compilationCheck = item.properties.compilation === compilation;
          }

          if (length) {
            console.log(length.split(","));
            const timeArray = length.split(",");
            lengthCheck =
              item.properties.record_length >= timeArray[0] &&
              item.properties.record_length <= timeArray[1];
          }

          if (resolution) {
            resolutionCheck = item.properties.resolution === resolution;
          }

          return (
            proxyCheck && compilationCheck && lengthCheck & resolutionCheck
          );
        });

        const newData = { type: "FeatureCollection", features: newFeatures };
        console.log("NEW DATA", newData);
        setMapData(newData);
      } else {
        setMapData(data);
      }
    }
  }, [data, proxy, compilation, length, resolution]);

  const renderMarker = (item) => {
    let markerColor = "blue";
    // set marker color to match Compilation
    if (item.properties.proxy_type == "Sediment") {
      markerColor = "orange";
    } else if (item.properties.proxy_type == "Historical Archive") {
      markerColor = "green";
    }

    return (
      <div key={`marker-${item.id}`}>
        <Marker
          longitude={item.geometry.coordinates[0]}
          latitude={item.geometry.coordinates[1]}
          color={markerColor}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupFeature(item);
          }}
        />
        {/*<GeoShape item={item} /> */}
      </div>
    );
  };

  if (isLoading) return null;
  if (isError) return null;
  return (
    <div>
      <FilterBox
        proxy={proxy}
        setProxy={setProxy}
        compilation={compilation}
        setCompilation={setCompilation}
        length={length}
        setLength={setLength}
        resolution={resolution}
        setResolution={setResolution}
      />

      {compilation && <CompilationBox compilation={compilation} />}

      {mapData && mapData.features.map((item) => renderMarker(item))}

      {popupFeature && (
        <MapPopup feature={popupFeature} setPopupFeature={setPopupFeature} />
      )}
      <LegendBox />
    </div>
  );
}
