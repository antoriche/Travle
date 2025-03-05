import { FeatureCollection, Geometry } from "geojson";
import worldData from "./data/world.json";

// Ensure the type property is correctly set
(worldData as any).type = "FeatureCollection";

export const world = worldData as FeatureCollection<Geometry, { name: string; border_countries: string[] }>;
