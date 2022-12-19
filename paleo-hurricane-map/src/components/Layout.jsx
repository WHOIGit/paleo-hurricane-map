import * as React from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
// local imports
import Logo from "../assets/WHOI_Primary-Logo.png";
import Copyright from "./Copyright";
import theme from "../theme";

const navLinkSX = {
  my: 1,
  mx: 1.5,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
};

export default function Layout() {
  return (
    <>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            component="img"
            sx={{
              height: 56,
              mr: 4,
            }}
            alt="WHOI logo"
            src={Logo}
          />

          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            PaleoHurdat
          </Typography>
          <nav>
            <Link variant="button" color="#fff" href="/" sx={navLinkSX}>
              Map
            </Link>
            <Link variant="button" color="#fff" href="/about" sx={navLinkSX}>
              About
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container maxWidth="false" component="main" disableGutters>
        <Outlet />
      </Container>
      <Copyright />
    </>
  );
}
