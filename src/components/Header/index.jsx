import React, {Component} from "react";
import "./style.css";

class Header extends Component {
  render() {
    const location = this.props.location;
    const date = new Date();
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
    return (
      <header className="header">
        <section className="title">
          <span className="location">{location}</span>
          <div className="line"></div>
        </section>

        <section className="date">
          <span>{month[date.getMonth()]} </span>
          <span>{date.getDate()}, </span>
          <span>{date.getFullYear()}</span>
        </section>
        <section className="time">
          <span>{date.getHours()}</span>
          <span>:</span>
          <span>
            {date.getMinutes() < 10
              ? `0${date.getMinutes()}`
              : date.getMinutes()}
          </span>
        </section>
      </header>
    );
  }
}

export default Header;
