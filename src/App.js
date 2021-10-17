import "./App.css";
import React from "react";
// import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Pages/Home/Home";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Home />
      </div>
    );
  }
}

export default App;
