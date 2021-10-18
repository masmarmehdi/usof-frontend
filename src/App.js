import "./App.css";
import React from "react";
// import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import SinglePage from "./Pages/SinglePage/SinglePage";
import PostCreate from "./Pages/PostCreate/PostCreate";
import Settings from "./Pages/Settings/Settings";

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
