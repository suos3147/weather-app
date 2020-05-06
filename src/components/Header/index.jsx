import React, {Component} from "react";
import "./style.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {now: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.setState({now: new Date()}), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    const location = this.props.location;
    const {now} = this.state;
    return (
      <header className="header">
        <section className="title">
          <span className="location">{location}</span>
          <div className="line"></div>
        </section>
        <section className="date">
          <span>{month[now.getMonth()]} </span>
          <span>{now.getDate()}, </span>
          <span>{now.getFullYear()}</span>
        </section>
        <section className="time">
          <span>
            {now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()}
          </span>
          :
          <span>
            {now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}
          </span>
          :
          <span>
            {now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()}
          </span>
        </section>
      </header>
    );
  }
}

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default Header;
