import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { Popup } from "react-map-gl";
// local imports
import useDataSites from "../hooks/useDataSites";
import ChartDepth from "./ChartDepth";
import "./MapPopup.css";
import ChartEventIndex from "./ChartEventIndex";
import ChartAgeModel from "./ChartAgeModel";
import theme from "../theme";
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
        <Box sx={{ p: 1 }}>
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

  console.log(data);

  const renderFilelink = (datafile) => {
    return (
      <Box sx={{ my: 1 }}>
        <Button
          variant="outlined"
          href={datafile.file}
          startIcon={<DownloadIcon />}
        >
          Download Excel File
        </Button>
      </Box>
    );
  };

  if (!data) return null;

  return (
    <Popup
      longitude={Number(feature.geometry.coordinates[0])}
      latitude={Number(feature.geometry.coordinates[1])}
      onClose={() => setPopupFeature(null)}
      focusAfterOpen={false}
      maxWidth="500px"
      className="popup-container"
    >
      <Box sx={{ width: "100%" }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {data.properties.name}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="data tabs">
            <Tab label="Metadata" {...a11yProps(0)} />
            {data?.properties.data.length && (
              <Tab label="Depth/Sand" {...a11yProps(1)} />
            )}
            {data?.properties.data.length && (
              <Tab label="Age of Events" {...a11yProps(2)} />
            )}
            {data?.properties.data.length && (
              <Tab label="Age Model" {...a11yProps(3)} />
            )}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div>
            <Typography variant="body2" gutterBottom>
              Location: {feature.properties.location} (
              {data.geometry.coordinates[1]}&deg;,{" "}
              {data.geometry.coordinates[0]}&deg;)
            </Typography>
            <Typography variant="body2" gutterBottom>
              Publication: {data.properties.authors}. (
              {data.properties.publication_year}).{" "}
              {data.properties.publication_title}.{" "}
              <em>{data.properties.publication_journal}</em>
              {data.properties.publication_volume && ", "}
              {data.properties.publication_volume}
              {data.properties.publication_edition && ", "}
              {data.properties.publication_edition}
              {data.properties.publication_issue && ", "}
              {data.properties.publication_issue}
              {data.properties.publication_report_number && ", "}
              {data.properties.publication_report_number}
              {data.properties.publication_pages && ", "}
              {data.properties.publication_pages}. https://doi.org/
              {data.properties.publication_doi}
            </Typography>

            <Typography variant="body2" gutterBottom>
              Type of Record: {data.properties.proxy_type}
            </Typography>

            {data.properties.compilation && (
              <Typography variant="body2" gutterBottom>
                Compilation: {data.properties.compilation_detail?.location}
              </Typography>
            )}

            {data.properties.compilation && (
              <Typography variant="body2" gutterBottom>
                Compilation Study:{" "}
                {data.properties.compilation_detail?.study_title} (
                <a
                  href={data.properties.compilation_detail?.document}
                  target="_blank"
                >
                  download
                </a>
                )
              </Typography>
            )}

            <Typography variant="body2" gutterBottom>
              Length of Record: {data.properties.record_length}
            </Typography>

            <Typography variant="body2" gutterBottom>
              Resolution: {data.properties.resolution}
            </Typography>
            <hr />
            {data.properties.data_files.map((datafile) =>
              renderFilelink(datafile)
            )}

            <Typography variant="body2" gutterBottom>
              <em>
                Cite the original study and PaleoHurDat when using this data.
              </em>
            </Typography>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {data && (
            <ChartDepth
              data={data.properties.data}
              yAxisLabel={data.properties.depth_y_axis_label}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {data && <ChartEventIndex data={data.properties.data} />}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {data && <ChartAgeModel data={data.properties.data} />}
        </TabPanel>
      </Box>
    </Popup>
  );
}
