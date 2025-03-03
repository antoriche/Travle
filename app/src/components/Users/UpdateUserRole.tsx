import React from "react";
import { Checkbox } from "antd";

import useUsers from "../../hooks/useUsers";

function UpdateUserRole({ userName, userRole }) {
  const { updateUserRole, isUpdatingRole } = useUsers();
  async function handleUpdateIsAdmin(checked: boolean): Promise<void> {
    if (!checked) {
      await updateUserRole({ userName, role: null });
      return;
    }
    await updateUserRole({ userName, role: "ADMIN" });
    return;
  }
  return (
    <Checkbox checked={userRole === "ADMIN"} disabled={isUpdatingRole} onChange={async (e) => handleUpdateIsAdmin(e.target.checked)}>
      Admin rights
    </Checkbox>
  );
}

export default UpdateUserRole;
