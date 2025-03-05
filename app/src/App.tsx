import React from "react";

import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import configureAuth from "./configureEnvironment/configureAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import "antd/dist/reset.css";
import { routes } from "./routes";
import { ConfigProvider } from "antd";
import { Colors } from "./constants";

export const shouldSkipAuth = () => process.env.REACT_APP_SKIP_AUTH === "SKIP";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

if (!shouldSkipAuth()) {
  configureAuth();
}

const router = createBrowserRouter(routes as RouteObject[]);

function App() {
  return (
    <ConfigProvider
      theme={{
        token: { colorText: Colors.TEXT, colorTextPlaceholder: Colors.TEXT, colorPrimary: Colors.PRIMARY_COLOR, colorBgBase: Colors.BACKGROUND },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {window.location.hostname === "localhost" && <ReactQueryDevtools />}
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
