import { Box, Typography } from "@mui/material";
import Copyright from "../components/Copyright";

export default function About() {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          About PaleoHurdat
        </Typography>

        <Typography variant="body1" gutterBottom>
          PaleoHurdat is a project from the Woods Hole Oceanographic
          Institution. It's purpose to make paleographic hurricane data
          available to the public and scientific community via a map-based
          interface.
        </Typography>

        <Typography variant="body1" gutterBottom>
          Funding for this project is provided by the NSF.
        </Typography>
      </Box>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Copyright />
      </Box>
    </>
  );
}
