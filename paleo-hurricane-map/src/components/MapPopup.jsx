import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Popup } from "react-map-gl";
// local imports
import useDataSites from "../hooks/useDataSites";
import ChartDepth from "./ChartDepth";
import "./MapPopup.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function MapPopup({ feature, setPopupFeature }) {
  const [value, setValue] = useState(0);
  const { data, isLoading, isError } = useDataSites(feature.id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Popup
      anchor="top"
      longitude={Number(feature.geometry.coordinates[0])}
      latitude={Number(feature.geometry.coordinates[1])}
      onClose={() => setPopupFeature(null)}
      focusAfterOpen={false}
      maxWidth="500px"
      className="popup-container"
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="data tabs">
            <Tab label="Metadata" {...a11yProps(0)} />
            <Tab label="Data Charts" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div>
            <h2>{feature.properties.name}</h2>
            <p>{feature.properties.location}</p>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {data && <ChartDepth data={data.properties.data} />}
        </TabPanel>
      </Box>
    </Popup>
  );
}
