import React from "react";
import "./navbar.css";
import myblog from "../../images/MyBlog.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function NavBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
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
            <Link className="link" to="/post/create">
              Create a post
            </Link>
          </li>
          <li className="nav-link">
            <Link className="link" to="/settings">
              Settings
            </Link>
          </li>
          <i className="search-icon fas fa-search"></i>
        </ul>
      </div>

      {user ? (
        <div className="navlink-right">
          <p className="user-role">{user.user.role}</p>
          <Link className="link" to="/settings">
            <img
              className="user-img"
              src={`http://127.0.0.1:8000/profile_pictures/${user.user.profilePicture}`}
              alt=""
            />
          </Link>
          <p className="username">{user.user.username}</p>
          <button class="logout-btn" onClick={handleLogout}>
            Logout
          </button>
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
