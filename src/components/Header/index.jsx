import React from "react";
import { Logo } from "../../assets/icon";
import "./style.css";

const Header = () => {
  return (
    <header class="app-header">
      <div className="app-title">
        <Logo className="logo" />
        <h2 className="title">Weather</h2>
      </div>
    </header>
  );
};

export default Header;
