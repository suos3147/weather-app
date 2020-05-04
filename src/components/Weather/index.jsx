import React, {Component} from "react";
import "./style.css";
import {Thermometer} from "../../assets/icon";

const API_WEATHER = process.env.REACT_APP_WEATHER_API_KEY;
const API_KAKAO = process.env.REACT_APP_KAKAO_MAP_KEY;
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: {},
      isLoading: false,
      error: null,
    };
  }

  getAddress = (lat, lon) => {
    fetch(`
    http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ko
    `)
      .then((response) => response.json())
      .then((data) => data);
  };

  getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_WEATHER}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          currentWeather: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({error, isLoading: false}));
  };

  getPosition = (cb) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          cb(latitude, longitude);
        },
        (error) => console.log("error", error)
      );
    } else {
      alert("GPS를 사용할 수 없습니다.");
    }
  };

  async componentWillMount() {
    this.setState({isLoading: true});
    await this.getPosition(this.getWeather);
  }

  render() {
    const {currentWeather, isLoading} = this.state;
    if (isLoading) {
      return <p className="app-main">Loading...</p>;
    }

    const {
      main: {temp, temp_max, temp_min, feels_like},
      weather: [{id, description, icon}],
    } = currentWeather;

    return (
      <div className="app-main">
        <div className="current-weather">
          <div className="icon-box">
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt={description}
            />
            <span className="weather-text">{description}</span>
          </div>
          <div className="temp current-temp">
            <Thermometer className="temp-icon"></Thermometer>
            <span className="temp-main">{Math.floor(temp - 273.15)}°C</span>
            <span className="small">
              {`/${Math.floor(((temp - 273.15) * 9) / 5 + 32)}°F`}
            </span>
          </div>
        </div>
        <div className="temp-box">
          <div className="temp">
            <span className="temp-feels">
              {`체감온도:  ${Math.floor(feels_like - 273.15)}°C`}
            </span>
            <span className="temp-feels small">
              {`/${Math.floor(((feels_like - 273.15) * 9) / 5 + 32)}°F`}
            </span>
          </div>
          <div className="temp">
            <span className="temp-max">{`최고기온:  ${Math.floor(
              temp_max - 273.15
            )}°C`}</span>
            <span className="temp-max small">{`/${Math.floor(
              ((temp_max - 273.15) * 9) / 5 + 32
            )}°F`}</span>
          </div>
          <div className="temp">
            <span className="temp-min">{`최저기온:  ${Math.floor(
              temp_min - 273.15
            )}°C`}</span>
            <span className="temp-min small">{`/${Math.floor(
              ((temp_min - 273.15) * 9) / 5 + 32
            )}°F`}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
