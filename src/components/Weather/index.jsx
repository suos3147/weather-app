import React from "react";
import "./style.css";
import { Sunny } from "../../assets/icon";

const Weather = () => {
  return (
    <div className="main-weather">
      <button>🔺</button>
      <div className="weahter">
        {getWeatherImg()}
        <div className="weather-text">
          <span>6℃ </span>
          <span>맑음</span>
        </div>
      </div>
      <button>🔻</button>
    </div>
  );
};

const getWeatherImg = () => {
  return <Sunny className="weather-icon"></Sunny>;
};

/*
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      return lat, lon;
    });
  }
};


const getWeather = (lat, lon) => {
  fetch(
    ` `
  )
    .then(response => response.json())
    .then(json => {
      console.log(json);
    });
};
*/

export default Weather;
