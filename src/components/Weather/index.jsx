import React from "react";
import "./style.css";

const Weather = () => {
  return (
    <div>
      <div>test</div>
      <div>test</div>
    </div>
  );
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
