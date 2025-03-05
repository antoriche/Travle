import { getAllShortestPaths } from "./algo";
import { FeatureCollection, Geometry } from "geojson";

export class GameEngine {
  readonly all_shortest_path: string[][];

  private guesses_: string[] = [];

  get guesses() {
    return this.guesses_.map((id) => ({
      id,
      name: this.map.features.find((f) => f.id === id)?.properties.name,
      correct: this.all_shortest_path.flat().includes(id),
      mostly_correct: this.map.features.find((f) => f.id === id)?.properties.border_countries.some((b) => this.all_shortest_path.flat().includes(b)), //TODO: watchout heavy operation in a getter
    }));
  }

  get won() {
    for (let i = 0; i < this.all_shortest_path.length; i++) {
      const checking_path = [...this.all_shortest_path[i]];
      // remove head and tail
      checking_path.pop();
      checking_path.shift();

      if (checking_path.every((c) => this.guesses_.includes(c))) {
        return {
          perfect: this.guesses_.length == checking_path.length,
          attempt: this.guesses_.length,
        };
      }
    }
    return false;
  }

  constructor(
    readonly map: FeatureCollection<
      Geometry,
      {
        name: string;
        border_countries: string[];
      }
    >,
    readonly from: string,
    readonly to: string,
  ) {
    this.all_shortest_path = getAllShortestPaths(
      map.features.map((f) => ({
        id: `${f.id}`,
        neighbors: f.properties.border_countries,
      })),
      from,
      to,
    );
  }

  guess(country: string) {
    if (!this.map.features.find((f) => f.id === country)) {
      throw new Error(`Invalid country ${country}`);
    }
    this.guesses_.push(country);
  }
}
