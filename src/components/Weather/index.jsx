import React, { Component } from "react";
import "./style.css";
import {
  Sunny,
  Cloudy,
  Rainy,
  Snow,
  Storm,
  Thermometer
} from "../../assets/icon";
const API_KEY = "33837eaf6c75e69f8d053726644db6e0";
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      isLoading: false,
      error: null
    };
  }

  getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          current: data,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };

  getPosition = cb => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        cb(latitude, longitude);
      });
    } else {
      alert("GPS를 사용할 수 없습니다.");
    }
  };

  async componentWillMount() {
    this.setState({ isLoading: true });
    await this.getPosition(this.getWeather);
  }

  render() {
    const { current, isLoading } = this.state;
    if (isLoading) {
      return <p className="app-main">Loading...</p>;
    }

    const {
      main: { temp, temp_max, temp_min, feels_like },
      weather: [{ id, description, icon }]
    } = current;

    // let icon = "";
    // switch (id) {
    //   case id < 300:
    //     icon = <Storm className="weather-icon"></Storm>;
    //     break;
    //   case id < 600:
    //     icon = <Rainy className="weather-icon"></Rainy>;
    //     break;
    //   case id < 700:
    //     icon = <Snow className="weather-icon"></Snow>;
    //     break;
    //   case 800:
    //     icon = <Sunny className="weather-icon"></Sunny>;
    //     break;
    //   case id < 900:
    //     icon = <Cloudy className="weather-icon"></Cloudy>;
    //     break;

    //   default:
    //     icon = "";
    // }

    return (
      <div className="app-main main-weather">
        <div className="current-weather">
          <div className="icon-box">
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" />
            {console.log(id)}
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
