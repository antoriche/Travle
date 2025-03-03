import React from "react";
import { Popconfirm } from "antd";
import useUsers from "../../hooks/useUsers";
import { User } from "shared/User";

interface RemoveUserProps {
  userName: string;
}

function RemoveUser({ userName }: RemoveUserProps) {
  const { data: users, deleteUser } = useUsers();
  const email = users.find((user: User) => user.username === userName)?.email;
  return (
    <Popconfirm
      title={`Are you sure you want to delete user ${email || userName}? This cannot be undone`}
      okText="Yes, I know what I'm doing"
      cancelText="Hell no, cancel"
      onConfirm={() => deleteUser(userName)}
    >
      <a href="#">Remove user</a>
    </Popconfirm>
  );
}

export default RemoveUser;
