import React from "react";

import "./CurrentState.css";

export default function CurrentState(props) {
  return (
    <div className="CurrentState">
      <ul>
        <li className="current-icon">
          <img
            src={`https://openweathermap.org/img/wn/${props.data.icon}@2x.png`}
            alt={props.data.icon}
          />
        </li>
        <li className="description">{props.data.description}</li>
      </ul>
    </div>
  );
}
