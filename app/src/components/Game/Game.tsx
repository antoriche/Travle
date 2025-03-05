import React, { useMemo, useState } from "react";
import { GameEngine } from "shared/GameEngine";
import { getCountryName } from "shared/helpers";
import Map from "./Map";
import { Colors } from "@/constants";
import { AutoComplete, Button, Checkbox, Col, Input, Row, Tag } from "antd";
import WinScreen from "./WinScreen";

function Game({ gameEngine, setGameEngine }: { gameEngine: GameEngine; setGameEngine: (gameEngine: GameEngine) => void }) {
  const [showWireframe, setShowWireframe] = React.useState(false);
  const autocompleteOptions = useMemo(
    () =>
      gameEngine.map.features
        .map((f) => ({
          value: f.properties.name,
          label: f.properties.name,
        }))
        .filter((o) => !gameEngine.guesses.map((g) => g.name).includes(o.value))
        .filter((d) => d.value !== getCountryName(gameEngine.from, gameEngine.map) && d.value !== getCountryName(gameEngine.to, gameEngine.map)),
    [gameEngine.map, gameEngine.guesses, gameEngine.to, gameEngine.from],
  );
  const [input, setInput] = useState("");
  return (
    <div>
      <h2>
        I want to go from{" "}
        <span
          style={{
            fontWeight: "bold",
            fontSize: "1.2em",
            color: Colors.FROM_COUNTRY,
          }}
        >
          {getCountryName(gameEngine.from, gameEngine.map)}
        </span>{" "}
        to{" "}
        <span
          style={{
            fontWeight: "bold",
            fontSize: "1.2em",
            color: Colors.TO_COUNTRY,
          }}
        >
          {getCountryName(gameEngine.to, gameEngine.map)}
        </span>
      </h2>
      <Map gameEngine={gameEngine} showWireframe={showWireframe || !!gameEngine.won} />
      {gameEngine.won ? (
        <div style={{ marginTop: "1em" }}>
          <WinScreen gameEngine={gameEngine} />
        </div>
      ) : (
        <>
          <div style={{ padding: "1em" }}>
            <Checkbox checked={showWireframe} onChange={(e) => setShowWireframe(e.target.checked)}>
              Show wireframe
            </Checkbox>
          </div>
          <div style={{ padding: "1em" }}>
            <AutoComplete
              style={{ width: "100%" }}
              value={input}
              onChange={setInput}
              options={autocompleteOptions}
              filterOption={(inputValue, option) => option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1}
            >
              <Input.Search
                size="large"
                placeholder="Select a country, territory..."
                enterButton={<Button type="primary">Guess</Button>}
                disabled={autocompleteOptions.map((d) => d.value).includes(input)}
                onSearch={(guessValue) => {
                  const id = `${gameEngine.map.features.find((f) => f.properties.name === guessValue)?.id}`;
                  try {
                    gameEngine.guess(id);
                    const clone = Object.assign({}, gameEngine);
                    Object.setPrototypeOf(clone, GameEngine.prototype);
                    setGameEngine(clone);
                    setInput("");
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            </AutoComplete>
          </div>
          <div style={{ padding: "1em" }}>
            {gameEngine.guesses.map((guess) => (
              <Tag key={guess.id} color={guess.correct ? "green" : guess.mostly_correct ? "orange" : "red"}>
                {guess.name}
              </Tag>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
