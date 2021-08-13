import React from "react";

export default function MaxAndMin(props) {
  return (
    <div className="MaxAndMin">
      <strong>{props.maxTemperature}°</strong>/{props.minTemperature}°
    </div>
  );
}
