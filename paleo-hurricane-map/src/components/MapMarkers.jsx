import React from "react";
import { Marker } from "react-map-gl";

import useDataSites from "../hooks/useDataSites";

export default function MapMarkers() {
  const { data, isLoading, isError } = useDataSites();
  console.log(data, isError);

  return <Marker longitude={-122.4} latitude={37.8} color="red" />;
}
