import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.whoi.edu" target="_blank">
        Woods Hole Oceanographic Institution
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
