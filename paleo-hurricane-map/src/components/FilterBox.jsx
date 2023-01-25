import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const filterSX = {
  width: 250,
  height: 340,
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 1000,
};

export default function FilterBox({
  proxy,
  setProxy,
  compilation,
  setCompilation,
  timespan,
  setTimespan,
  resolution,
  setResolution,
}) {
  const handleProxyChange = (event) => {
    setProxy(event.target.value);
  };

  const handleCompilationChange = (event) => {
    setCompilation(event.target.value);
  };

  const handleTimespanChange = (event) => {
    setTimespan(event.target.value);
  };

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  console.log(timespan);
  return (
    <Card sx={filterSX}>
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Filter Datasets
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="proxy-label">Proxy</InputLabel>
          <Select
            labelId="proxy-label"
            id="proxy-select"
            value={proxy}
            label="Proxy"
            onChange={handleProxyChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Sediment"}>Sediment</MenuItem>
            <MenuItem value={"Historical Archive"}>Historical Archive</MenuItem>
            <MenuItem value={"Tree Ring"}>Tree Ring</MenuItem>
            <MenuItem value={"Speleothem/Corals"}>Speleothem/Corals</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="compilation-label">Compilation</InputLabel>
          <Select
            labelId="compilation-label"
            id="compilation-select"
            value={compilation}
            label="Compilation"
            onChange={handleCompilationChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Bahamas Compilation"}>
              Bahamas Compilation
            </MenuItem>
            <MenuItem value={"New England Compilation"}>
              New England Compilation
            </MenuItem>
            <MenuItem value={"Florida Gulf of Mexico Compilation"}>
              Florida Gulf of Mexico Compilation
            </MenuItem>
            <MenuItem value={"Mann et al. 2009 Compilation"}>
              Mann et al. 2009 Compilation
            </MenuItem>
            <MenuItem value={"N/A"}>N/A</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="timespan-label">Timespan of Record</InputLabel>
          <Select
            labelId="timespan-label"
            id="timespan-select"
            value={timespan}
            label="Timespan of Record"
            onChange={handleTimespanChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"0,2000"}>0-2000 years</MenuItem>
            <MenuItem value={"2001,6000"}>2001-6000 years</MenuItem>
            <MenuItem value={"6001,100000000000"}>&gt;6000 years</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="timespan-label">Resolution</InputLabel>
          <Select
            labelId="resolution-label"
            id="resolution-select"
            value={resolution}
            label="Resolution"
            onChange={handleResolutionChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"0-20 years"}>0-20 years</MenuItem>
            <MenuItem value={"21-100 years"}>21-100 years</MenuItem>
            <MenuItem value={">100 years"}>&gt;100 years</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
