import "./App.css";
import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import SinglePage from "./Pages/SinglePage/SinglePage";
import PostCreate from "./Pages/PostCreate/PostCreate";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/posts/:post_id">
          <SinglePage />
        </Route>
        <Route path="/post/create">{user ? <PostCreate /> : <Login />}</Route>
        <Route path="/users/:username">
          {user ? <PostCreate /> : <Login />}
        </Route>
        <Route path="/categoroes/:category_id/posts">
          {user ? <PostCreate /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
