import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useCompilations from "../hooks/useCompilations";

const filterSX = {
  width: 400,
  height: 200,
  position: "absolute",
  bottom: 10,
  left: 10,
  zIndex: 1000,
};

export default function CompilationBox({ compilation }) {
  const { data, isLoading, isError } = useCompilations(compilation);
  console.log(data);

  if (!data) return null;

  return (
    <Card sx={filterSX}>
      <CardContent>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 1 }}
        >
          Compilation Data
        </Typography>

        <Typography variant="body1" gutterBottom>
          Location: {data.location}
        </Typography>

        <Typography variant="body2" gutterBottom>
          {data.study_title}
        </Typography>

        <hr />
        <Box sx={{ my: 1 }}>
          <Button
            variant="outlined"
            href={data.document}
            startIcon={<DownloadIcon />}
          >
            Download Excel File
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
