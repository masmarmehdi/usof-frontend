import "./App.css";
import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import SinglePage from "./Pages/SinglePage/SinglePage";
import PostCreate from "./Pages/PostCreate/PostCreate";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    const user = false; // Testing Link component in the condditional statement for now
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/settinga">{user ? <Settings /> : <Login />}</Route>
          <Route path="/login">{user ? <Home /> : <Login />}</Route>
          <Route path="/register">{user ? <Home /> : <Register />}</Route>
          <Route path="/posts/:post_id">
            <SinglePage />
          </Route>
          <Route path="/post/create">{user ? <PostCreate /> : <Login />}</Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
