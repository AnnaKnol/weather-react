import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import Form from "./Form";
import FormattedTime from "./FormattedTime";
import CurrentState from "./CurrentState";
import TempMaxAndMin from "./TempMaxAndMin.js";
import CurrentExtra from "./CurrentExtra";
import Tomorrow from "./Tomorrow";
import WeatherForecast from "./WeatherForecast";

import "./Weather.css";

export default function Weather(props) {
  const apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";

  const [city, setCity] = useState(props.defaultCity);
  const [unit, setUnit] = useState("metric");
  const [APIUrl, setAPIUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
  );
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [celsiusState, setCelsiusState] = useState(true);

  useEffect(
    function () {
      function fetchWeatherData(response) {
        setWeatherData({
          ready: true,
          cityName: response.data.name,
          coordinates: response.data.coord,
          date: new Date(response.data.dt * 1000),
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
          temperature: response.data.main.temp,
          minTemperature: response.data.main.temp_min,
          maxTemperature: response.data.main.temp_max,
          humidity: Math.round(response.data.main.humidity),
          feelingTemperature: response.data.main.feels_like,
          wind: response.data.wind.speed,
          rain: response.data.rain,
        });

        setCity(response.data.name);
      }

      return axios
        .get(APIUrl)
        .then(fetchWeatherData)
        .catch(function (error) {
          alert(
            "Please, try typing it correctly or use another place in the area 📍 👍"
          );
        });
    },
    [APIUrl]
  );

  function handleSubmit(event) {
    event.preventDefault();
    resetToCelsius();
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    let searchFormElement = document.querySelector("#search_form");
    searchFormElement.value = "";
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function determinePosition(position) {
    resetToCelsius();
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(determinePosition);
  }

  function resetToCelsius() {
    setUnit("metric");
    setCelsiusState(true);
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("metric");
    setCelsiusState(true);
  }
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("imperial");
    setCelsiusState(false);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="row">
          <div className="col-md-5">
            <Form
              handleSubmit={handleSubmit}
              handleCityChange={handleCityChange}
              getCurrentLocation={getCurrentLocation}
            />
          </div>
          <div className="col-md-7">
            <h1>{weatherData.cityName}</h1>
          </div>
        </div>
        <small className="updated">Last updated:</small>
        <FormattedTime data={weatherData.date} />
        <br />
        <div className="row">
          <div className="col-7 col-sm-7 col-md-5 col-lg current-state">
            <CurrentState data={weatherData} />
          </div>
          <div className="col-8 col-sm-7 col-md-5 col-lg-4 current">
            <TempMaxAndMin
              data={weatherData}
              unit={unit}
              celsiusState={celsiusState}
              showCelsius={showCelsius}
              showFahrenheit={showFahrenheit}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-3 current-extra">
            <CurrentExtra data={weatherData} unit={unit} />
          </div>
          <hr className="d-block d-lg-none" />
          <div className="col col-lg-3 tomorrow">
            <Tomorrow coordinates={weatherData.coordinates} unit={unit} />
          </div>
        </div>
        <hr className="d-none d-lg-block" />
        <WeatherForecast coordinates={weatherData.coordinates} unit={unit} />
      </div>
    );
  } else {
    return (
      <div className="Weather">
        <div className="row">
          <div className="col-md-5">
            <Form
              handleSubmit={handleSubmit}
              handleCityChange={handleCityChange}
              getCurrentLocation={getCurrentLocation}
            />
          </div>
          <div className="col-md-7">
            <h1>Brussels</h1>
          </div>
        </div>
        <div className="loader">
          <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        </div>
      </div>
    );
  }
}
