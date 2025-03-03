import React from "react";
import { FeatureGuardProps, useIsFeatureEnabled } from "./useIsFeatureEnabled";

/**
 * A React functional component that conditionally renders its children
 * based on whether a feature is enabled.
 * Use this component as a wrapper to the SafeGuard wrapper if you need to manage rights.
 *
 * @param {FeatureGuardProps} props - The properties for the component.
 * @param {string} props.name - The name of the feature to check.
 * @param {React.ReactElement} props.children - The children to render if the feature is enabled.
 * @returns {React.ReactElement} - The children if the feature is enabled, otherwise null.
 */
export function FeatureEnabled({ name, children }: FeatureGuardProps): React.ReactElement {
  const isFeatureEnabled = useIsFeatureEnabled()(name);
  if (!isFeatureEnabled) return <>{null}</>;
  return <>{children}</>;
}
