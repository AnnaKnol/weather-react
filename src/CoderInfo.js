import React from "react";

import "./CoderInfo.css";

export default function CoderInfo() {
  return (
    <small className="CoderInfo">
      Coded by Anna Knol, open-source on{" "}
      <a
        href="https://github.com/AnnaKnol/wonderful-weather-app"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>{" "}
      and hosted on{" "}
      <a
        href="https://priceless-bose-84ce7a.netlify.app"
        target="_blank"
        rel="noreferrer"
      >
        Netlify
      </a>
    </small>
  );
}
