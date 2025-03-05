import { FeatureCollection, Geometry } from "geojson";
import worldData from "./data/world.json";
import usaData from "./data/usa.json";

export const world = worldData as FeatureCollection<Geometry, { name: string; border_countries: string[] }>;
export const usa = usaData as FeatureCollection<Geometry, { name: string; border_countries: string[] }>;
