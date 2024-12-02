import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

import MyProfile from "./Profile";
import { useContext } from "react";
import { Context } from "../../index";
import { Navigate } from "react-router-dom";

export default function JoyOrderDashboardTemplate() {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: "calc(12px + var(--Header-height))", md: 2 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          <MyProfile />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
