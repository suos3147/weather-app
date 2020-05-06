import React, {Component} from "react";
import "./style.css";

const API_WEATHER = process.env.REACT_APP_WEATHER_API_KEY;
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: {},
      isLoading: false,
      error: null,
    };
  }

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

  componentDidUpdate() {
    const name = this.state.currentWeather.name;
    if (!name) return;
    this.props.setLocation(name);
  }

  render() {
    const {currentWeather, isLoading} = this.state;
    if (isLoading) {
      return <p className="main">Loading...</p>;
    }

    const {
      weather: [{description, icon}],
      main: {temp, temp_max, temp_min, feels_like},
      dt,
    } = currentWeather;

    const date = new Date(dt * 1000);

    return (
      <main className="main">
        <section className="weather-conditions">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
          />
          <span className="weather-text">{description}</span>
        </section>
        <section className="weather-temp-main">
          <span className="temp-main">{`${Math.floor(temp - 273.15)}°C`}</span>
          <span className="temp-feels">
            Feels Like {`${Math.floor(feels_like - 273.15)}°C`}
          </span>
        </section>
        <section className="weather-temp">
          <span className="temp">{`${Math.floor(temp_max - 273.15)}°C`}</span>
          <div className="temp-line"></div>
          <span className="temp">{`${Math.floor(temp_min - 273.15)}°C`}</span>
        </section>
        <section className="weather-update-time">
          <span className="update-time">
            {`Update weather [${
              date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            }:${
              date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()
            }:${
              date.getSeconds() < 10
                ? `0${date.getSeconds()}`
                : date.getSeconds()
            }]`}
          </span>
        </section>
      </main>
    );
  }
}

export default Weather;
