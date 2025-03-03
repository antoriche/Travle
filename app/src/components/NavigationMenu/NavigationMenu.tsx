import { Menu } from "antd";

import { Link, useLocation } from "react-router-dom";
import { navigationMenuRoutes } from "@/routes";
import React, { useMemo } from "react";
import { useUser } from "../../services/auth";

type NavigationMenuProps = {
  currentPath: string;
  collapsed: boolean;
};

function useRestrictedRoutes() {
  const user = useUser();
  const location = useLocation();
  const restrictedRoutes = useMemo(() => {
    if (!user) {
      return [];
    }
    return navigationMenuRoutes
      .map((route) => ({
        disabled: route.disabled || false,
        key: route.id,
        requiredPermission: route.requiredPermission,
        icon: React.createElement(route.icon, {}),
        label: (
          <Link to={{ pathname: route.path, search: location?.search }}>
            <span>{route.title}</span>
          </Link>
        ),
      }))
      .filter((route) => {
        if (!user) {
          return false;
        }
        if (user.groups && user.groups.includes("ADMIN")) {
          return true;
        }
        if (route.requiredPermission) {
          return user.groups && user.groups.includes(route.requiredPermission);
        }
        return true;
      });
  }, [user, location]);
  return { restrictedRoutes };
}

function NavigationMenu({ currentPath, collapsed }: NavigationMenuProps) {
  const { restrictedRoutes } = useRestrictedRoutes();

  return (
    <Menu
      items={restrictedRoutes}
      mode="inline"
      selectedKeys={[currentPath]}
      style={{ borderRight: collapsed ? "1px solid #e8e8e8" : "none" }} // right border fix
    />
  );
}

export default NavigationMenu;
