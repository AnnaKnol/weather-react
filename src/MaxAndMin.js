import React from "react";

export default function MaxAndMin(props) {
  let minTemperature =
    props.unit === "metric"
      ? Math.round(props.data.minTemperature)
      : Math.round((props.data.minTemperature * 9) / 5 + 32);
  let maxTemperature =
    props.unit === "metric"
      ? Math.round(props.data.maxTemperature)
      : Math.round((props.data.maxTemperature * 9) / 5 + 32);
  return (
    <div className="MaxAndMin max-and-min">
      <strong>{maxTemperature}°</strong>/{minTemperature}°
    </div>
  );
}
