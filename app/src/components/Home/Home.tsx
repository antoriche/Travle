import React from "react";

import unsplash from "@/assets/unsplash.jpg";
import NewGameForm from "../Game/NewGameForm";

function Home() {
  return (
    <div>
      <h2>Welcome on Travle !</h2>
      <p>The goal of the game is to find the shortest path between two countries / territories.</p>
      <p>Let&apos;s start a game !!!</p>
      <NewGameForm
        style={{
          backgroundColor: "#05050520",
          borderRadius: 10,
        }}
      />
    </div>
  );
}

export default Home;
