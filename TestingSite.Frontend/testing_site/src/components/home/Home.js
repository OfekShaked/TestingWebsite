import React, { useState } from "react";
import MainRouter from "../routers/MainRouter";
import "./Home.css";
import {
  AppBar,
  Box,
  Typography,
} from "@mui/material";

const Home = () => {
  const [title, setTitle] = useState("Administration System - Test");
  return (
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar position="static">
          <Typography
            variant="h4"
            component="div"
            className="center-typography"
          >
            {title}
          </Typography>
        </AppBar>
        <Box className="center">
          <MainRouter />
        </Box>
      </Box>
  );
};
export default Home;


