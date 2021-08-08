import React from "react";

import "./CoderInfo.css";

export default function CoderInfo() {
  return (
    <small className="CoderInfo">
      Coded by Anna Knol, open-source on{" "}
      <a
        href="https://github.com/AnnaKnol/weather-react"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>{" "}
      and hosted on{" "}
      <a
        href="https://nervous-spence-f7d166.netlify.app/"
        target="_blank"
        rel="noreferrer"
      >
        Netlify
      </a>
    </small>
  );
}
