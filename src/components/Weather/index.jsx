import React, { Component } from "react";
import "./style.css";
//import { Sunny, Cloudy, Wind } from "../../assets/icon";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      weather: [],
      isLoading: false,
      error: null
    };
  }

  getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forcast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          weather: data.list[0].weather,
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

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.getPosition(this.getWeather);
  }

  render() {
    const { weather, isLoading } = this.state;
    console.log(weather);
    if (isLoading) {
      return <p className="app-main">Loading...</p>;
    }
    return (
      <ul className="app-main">
        {weather.map(({ id, main }) => (
          <li key={id}>{main}</li>
        ))}
      </ul>
    );
  }
}

export default Weather;

/*class Weather extends Component {
  construructor(props){
    super(props);
    this.state = {
      data: ""
    }
  }
  componentWiiMount
  let city_name = "Seoul";
  const API_KEY = "33837eaf6c75e69f8d053726644db6e0";
  const URL = `api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;

  const [weather, setWeather] = useState("");
  const getWeatherImg = forecast => {
    console.log(forecast);
    switch (forecast) {
      case 1:
        setWeather(<Sunny className="weather-icon"></Sunny>);
        break;
      case 2:
        setWeather(<Cloudy className="weather-icon"></Cloudy>);
        break;
      case 3:
        setWeather(<Wind className="weather-icon"></Wind>);
        break;
      default:
        return console.error(forecast);
    }
  };

  render(){return (
    <div className="app-main main-weather">
      <button onClick={() => getWeatherImg(1)}>🔺</button>
      <div className="weather">
        {weather}
        <div className="weather-text">
          <span>오늘 날씨</span>
          <span>6℃ </span>
          <span>맑음</span>
        </div>
      </div>
      <button onClick={() => getWeatherImg(2)}>🔻</button>
    </div>
  );}
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


export default Weather;
*/
