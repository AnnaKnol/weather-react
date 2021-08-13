import React from "react";

export default function FormattedTime(props) {
  let day = props.data.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = props.data.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = props.data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (
    <h5>
      {days[day]} {hours}:{minutes}
    </h5>
  );
}
