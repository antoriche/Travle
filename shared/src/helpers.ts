import { FeatureCollection, Geometry } from "geojson";

export function getCountryName(id: string, map: FeatureCollection<Geometry, { name: string }>): string | null {
  return map.features.find((f) => f.id === id)?.properties.name ?? null;
}
