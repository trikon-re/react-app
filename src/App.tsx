import React, { lazy } from "react";

import theme from "@styles/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const BaseRoutes = lazy(() => import("./routes"));

const query = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={query}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: theme.palette.primary.main,
                  borderRadius: 4,
                  fontFamily: theme.typography.fontFamily,
                },
              }}
            >
              <BaseRoutes />
            </ConfigProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
