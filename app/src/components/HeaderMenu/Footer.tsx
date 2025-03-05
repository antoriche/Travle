import { GithubFilled } from "@ant-design/icons";
import React from "react";

function Footer() {
  return (
    <footer style={{ display: "flex", justifyContent: "start", alignItems: "center", padding: "1em", gap: "1em" }}>
      <a
        style={{
          color: "white",
          fontSize: "1.5em",
        }}
        href="https://github.com/antoriche/Travle"
        target="_blank"
        rel="noreferrer"
      >
        <GithubFilled />
      </a>
      <div>
        <small>
          This is a self-made version from{" "}
          <a style={{ color: "white", textDecoration: "underline" }} href="https://travle.earth" target="_blank" rel="noreferrer">
            travle.earth
          </a>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
