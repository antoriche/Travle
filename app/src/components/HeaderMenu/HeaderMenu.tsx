import React from "react";
import { Button, Layout, Popover } from "antd";

import UserMenu from "../UserMenu/UserMenu";
import "./HeaderMenu.css";
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined } from "@ant-design/icons";
import { useMatches } from "react-router";
import NewGameForm from "../Game/NewGameForm";

const { Header } = Layout;

type HeaderMenuProps = {};
function HeaderMenu({}: HeaderMenuProps) {
  return (
    <header
      style={{
        padding: "24px",

        backgroundColor: "#00000030",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <a
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          <h1>Travle</h1>
        </a>
        <Popover content={<NewGameForm />}>
          <Button type="primary" shape="round" icon={<PlusOutlined />}>
            New Game
          </Button>
        </Popover>
      </div>
    </header>
  );
}

export default HeaderMenu;
