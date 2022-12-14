import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#041e42",
    },
    secondary: {
      main: "#00a9e0",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
