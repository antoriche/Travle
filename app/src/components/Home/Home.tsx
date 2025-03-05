import React from "react";

import unsplash from "@/assets/unsplash.jpg";
import NewGameForm from "../Game/NewGameForm";

function Home() {
  return (
    <div>
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
