import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Weather from "./components/Weather";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Weather />
      <Footer></Footer>
    </div>
  );
};

export default App;
