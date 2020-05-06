import React, {useState} from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import "./App.css";

const App = () => {
  const [location, setLocation] = useState("");
  return (
    <div className="App">
      <section className="wrapper">
        <Header location={location}></Header>
        <Weather setLocation={setLocation}></Weather>
      </section>
    </div>
  );
};

export default App;
