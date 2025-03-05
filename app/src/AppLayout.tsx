import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import Footer from "./components/HeaderMenu/Footer";
import { Colors } from "./constants";

const { Content } = Layout;

function AppLayout() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",

        backgroundColor: Colors.BACKGROUND,
        color: "white",
      }}
    >
      <HeaderMenu />
      <Content
        style={{
          flex: 1,
          color: "white",
          padding: "24px",
        }}
      >
        <div
          style={{
            height: "100%",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default AppLayout;
