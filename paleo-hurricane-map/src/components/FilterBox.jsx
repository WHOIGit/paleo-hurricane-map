import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import useCompilations from "../hooks/useCompilations";

const filterSX = {
  width: 250,
  height: 380,
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
  const { data, isLoading, isError } = useCompilations();
  console.log(data);

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

  const clearFilters = () => {
    setProxy("");
    setCompilation("");
    setTimespan("");
    setResolution("");
  };

  if (!data) return null;

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
            {/*
            <MenuItem value={"Tree Ring"}>Tree Ring</MenuItem>
            <MenuItem value={"Speleothem/Corals"}>Speleothem/Corals</MenuItem>
            */}
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
            {data?.map((item) => {
              return <MenuItem value={item.id}>{item.location}</MenuItem>;
            })}
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
            <MenuItem value={"0-3 years"}>0-3 years</MenuItem>
            <MenuItem value={"3-30 years"}>3-30 years</MenuItem>
            <MenuItem value={">30 years"}>&gt;30 years</MenuItem>
          </Select>
        </FormControl>

        <Button size="small" startIcon={<ClearIcon />} onClick={clearFilters}>
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
