import React from "react";
import { Spin, List, Tag } from "antd";

import useUsers from "../../hooks/useUsers";
import AddUserForm from "./AddUserForm";
import RemoveUser from "./RemoveUserForm";
import { User } from "shared/User";
import UpdateUserRole from "./UpdateUserRole";

function Users() {
  const { data, isLoading } = useUsers();
  if (isLoading) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Spin />
      </div>
    );
  }
  return (
    <div style={{ height: "100%", overflowY: "scroll", backgroundColor: "white", padding: 24 }}>
      <List
        itemLayout="horizontal"
        dataSource={data.sort((a: User, b: User) => a.email.localeCompare(b.email))}
        header={<h3>Users</h3>}
        renderItem={(item: User) => (
          <List.Item actions={[<RemoveUser userName={item.username} />]}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <p style={{ marginBottom: 0 }}>{item.email}</p>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 0, alignItems: "center" }}>
                <Tag color={item.userStatus === "CONFIRMED" ? "success" : "warning"}>{item.userStatus}</Tag>
                <UpdateUserRole userName={item.username} userRole={item && item.groups && item.groups[0]} />
              </div>
            </div>
          </List.Item>
        )}
      />
      <AddUserForm />
    </div>
  );
}

export default Users;
