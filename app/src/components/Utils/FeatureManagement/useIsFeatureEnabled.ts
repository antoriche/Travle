import { useCallback } from "react";
import _ from "lodash";

function isFeatureEnabled(featureName: string): boolean {
  const envStyleFeatureName = _(featureName).snakeCase().toUpperCase();
  const fromEnv = process.env[`REACT_APP_FEATURE_${envStyleFeatureName}`];
  const isFeatureEnabled = fromEnv?.toLowerCase() === "true" || fromEnv === "yes" || fromEnv === "1";
  return isFeatureEnabled;
}

/**
 * Custom hook to check if a feature is enabled.
 *
 * @returns A callback function that takes a feature name as a parameter and returns a boolean indicating if the feature is enabled.
 */
export const useIsFeatureEnabled = () => useCallback((featureName: string): boolean => isFeatureEnabled(featureName), []);

export type FeatureGuardProps = {
  name: string;
  children: React.ReactElement;
};
