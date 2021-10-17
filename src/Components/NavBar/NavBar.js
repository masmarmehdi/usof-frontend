import React from "react";
import "./navbar.css";
import myblog from "../../images/MyBlog.png";
import mmasmar from "../../images/mmasmar.png";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="navlink-left">
        <img className="logo-img" src={myblog} alt="" />
      </div>
      <div className="navlink-center">
        <ul className="nav-list">
          <li className="nav-link">Home</li>
          <li className="nav-link">Posts</li>
          <li className="nav-link">Categories</li>
          <i className="search-icon fas fa-search"></i>
        </ul>
      </div>
      <div className="navlink-right">
        <p className="user-role">Admin</p>
        <img className="user-img" src={mmasmar} alt="" />
        <p className="username">mmasmar</p>
        <button class="logout-btn">Logout</button>
      </div>
    </div>
  );
}
