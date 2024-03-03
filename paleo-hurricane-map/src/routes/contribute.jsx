import { Box, Typography } from "@mui/material";
import Copyright from "../components/Copyright";

export default function Contribute() {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Contribute your data
        </Typography>
        <Typography variant="body1" paragraph>
          If you're interested in adding a dataset to the PaleoHURDAT database,
          whether it's a new study you're involved with, or an older record that
          was previously overlooked or unavailable, follow these steps:
        </Typography>

        <ol>
          <li>
            Check that the data meet the{" "}
            <a href="/about">criteria for inclusion</a>.
          </li>
          <li>
            Format the data according to our{" "}
            <a href="/Site_Example.xlsm" target="_blank">
              excel template
            </a>
            .
          </li>
          <li>
            Please send your completed data excel template as an email
            attachment to{" "}
            <a href="mailto:jdonnelly@whoi.edu">jdonnelly@whoi.edu</a> and{" "}
            <a href="mailto:ejwallac@odu.edu">ejwallac@odu.edu</a>{" "}
          </li>
        </ol>
      </Box>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Copyright />
      </Box>
    </>
  );
}
