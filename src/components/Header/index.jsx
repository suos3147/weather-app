import React, {Component} from "react";
import {Logo} from "../../assets/icon";
import "./style.css";

class Header extends Component {
  render() {
    console.log(this.props.location);
    return (
      <header className="app-header">
        <div className="app-title">
          <Logo className="logo" />
          <h2 className="title">Weather</h2>
        </div>
      </header>
    );
  }
}

export default Header;
