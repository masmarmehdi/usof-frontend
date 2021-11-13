import "./App.css";
import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import SinglePage from "./Pages/SinglePage/SinglePage";
import PostCreate from "./Pages/PostCreate/PostCreate";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import UserProfile from "./Pages/UserProfile/UserProfile";

import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from "./context/Context";
import PostsByCategory from "./Pages/PostsByCategory/PostsByCategory";
import Categories from "./Pages/Categories/Categories";
import UserPosts from "./Pages/UserPosts/UserPosts";

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
        <Route exact path="/users/:user_id">
          {user && <UserProfile />}
        </Route>
        <Route path="/users/:user_id/posts">{user && <UserPosts />}</Route>
        <Route path="/categories/:category_id/posts">
          <PostsByCategory />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
