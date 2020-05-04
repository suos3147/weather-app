import React, {useState} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Weather from "./components/Weather";
import "./App.css";

const App = () => {
  const [location, setLocation] = useState("");
  return (
    <div className="App">
      <Header location={location} className="app-header"></Header>
      <Weather setLocation={setLocation} className="app-main"></Weather>
      <Footer className="app-footer"></Footer>
    </div>
  );
};

export default App;

//      <Weather className="app-main"></Weather>
