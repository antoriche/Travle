import React from "react";

import unsplash from "@/assets/unsplash.jpg";

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${unsplash})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          position: "relative",
          top: -32,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "white",
            textShadow: "1px 1px gray",
            letterSpacing: "0.2em",
          }}
        >
          boilerplate
        </h1>
      </div>
    </div>
  );
}

export default Home;
