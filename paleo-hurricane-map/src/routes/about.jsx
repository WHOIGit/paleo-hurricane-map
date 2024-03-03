import { Box, Typography } from "@mui/material";
import Copyright from "../components/Copyright";

export default function About() {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome! The PaleoHURDAT database is a central repository for
          paleotempestological proxies and compilations from around the world.
          Our database seeks to include all natural archives (e.g. tree rings,
          shallow marine/terrestrial sediments, historical archives) that
          preserve signatures of tropical cyclone landfalls. We provide all data
          and metadata needed for third party usage including publication
          information, proxy indicator data, age model information, and tropical
          cyclone event dates. Our goal is to improve the accessibility and
          availability of paleotempestological records to allow for advances in
          data-model comparison, regional and basin-scale compilations, and risk
          assessments.
        </Typography>
        <Typography variant="body1" paragraph>
          The PaleoHURDAT database relies on the engagement of the wider
          community! We welcome your ideas and feedback. This is a dynamic
          database, meaning that new datasets that meet the criteria for
          inclusion (see below) can be added and included in subsequent
          versions.
        </Typography>
        <Typography variant="body1" paragraph>
          When using data from this database, please cite the original
          publication detailed in the metadata tab(s).
        </Typography>
        <Typography variant="h5" gutterBottom>
          Criteria for inclusion
        </Typography>
        <Typography variant="body1" paragraph>
          To be included in the PaleoHURDAT database, a dataset must have:
        </Typography>
        <ol>
          <li>
            <strong>Storm proxy criteria.</strong> Clearly defined criteria for
            what constitutes a storm indicator (e.g. grain size cutoff) and
            associated data
          </li>
          <li>
            {" "}
            <strong>Modern calibration.</strong> Site sensitivity (distance +
            intensity criteria) defined by attribution/calibration to modern
            tropical cyclones
          </li>
          <li>
            {" "}
            <strong>Age control.</strong> The age of each paleo tropical cyclone
            or the start/end years of the event bound, including age model
            information.{" "}
          </li>
          <li>
            <strong>Peer-review.</strong> Only records described in manuscripts
            that have undergone peer-review are included. For new records, a
            dataset can be admitted upon acceptance of the paper.
          </li>
        </ol>

        <Typography variant="body1" paragraph>
          Funding for the database comes from the US National Science
          Foundation.
        </Typography>
      </Box>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Copyright />
      </Box>
    </>
  );
}
