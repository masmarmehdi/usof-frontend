import React from "react";
import "./navbar.css";
import myblog from "../../images/MyBlog.png";
import mmasmar from "../../images/mmasmar.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  const user = false;
  return (
    <div className="nav-bar">
      <div className="navlink-left">
        <img className="logo-img" src={myblog} alt="" />
      </div>
      <div className="navlink-center">
        <ul className="nav-list">
          <li className="nav-link">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-link">
            <Link className="link" to="/">
              Posts
            </Link>
          </li>
          <li className="nav-link">
            <Link className="link" to="/">
              Categories
            </Link>
          </li>
          <i className="search-icon fas fa-search"></i>
        </ul>
      </div>

      {user ? (
        <div className="navlink-right">
          <p className="user-role">Admin</p>
          <Link className="link" to="/settings">
            <img className="user-img" src={mmasmar} alt="" />
          </Link>
          <p className="username">mmasmar</p>
          <button class="logout-btn">Logout</button>
        </div>
      ) : (
        <div className="navlink-right">
          <Link className="link" to="/login">
            <button class="login-btn">Login</button>
          </Link>
          <Link className="link" to="/register">
            <button class="register-btn">Register</button>
          </Link>
        </div>
      )}
    </div>
  );
}
