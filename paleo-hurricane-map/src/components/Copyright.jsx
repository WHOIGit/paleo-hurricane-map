import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Copyright() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 10,
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://www.whoi.edu" target="_blank">
          Woods Hole Oceanographic Institution
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
