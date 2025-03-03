import React, { useState } from "react";
import { Avatar, Popover } from "antd";
import * as Auth from "aws-amplify/auth";
import { useUser } from "@/services/auth";
import classNames from "./UserMenu.module.css";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const email = user?.email;
  const logout = () => Auth.signOut();
  // TODO do we want to display the full email? Just the part before the @? Something else?
  const userDisplay = email ? email.split("@")[0] : "";
  if (userDisplay) {
    return (
      <Popover
        className={classNames.userMenuPopover}
        trigger="click"
        placement="bottomRight"
        content={
          <div role="button" tabIndex={0} className={classNames.userMenuMenuItem} onClick={logout} onKeyDown={logout}>
            <LogoutOutlined style={{ marginRight: 8 }} />
            Log out
          </div>
        }
        open={open}
        onOpenChange={setOpen}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginBottom: 0, marginRight: 8 }}>{userDisplay}</p>
          <Avatar icon={<UserOutlined />} size="large" />
        </div>
      </Popover>
    );
  }
  return null;
}

export default UserMenu;
