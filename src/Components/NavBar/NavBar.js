import React, { useEffect, useState } from "react";
import "./navbar.css";
import myblog from "../../images/MyBlog.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function NavBar() {
  const { user, dispatch } = useContext(Context);

  const [result, setResult] = useState(null);
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users").then((response) => {
      console.log(response.data);
      
      setUsers(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  function search(value) {
    if (value.length > 0) {
      value = value.toUpperCase();
      const pages = {
        home: (
          <Link className="link" to="/">
            Home
          </Link>
        ),
      };
      if (posts) {
        posts.forEach((post) => {
          pages[post.title] = (
            <Link
              className="link"
              to={`/posts/${post.id}`}
              onClick={() => (window.location.href = `/posts/${post.id}`)}
            >
              {post.title} (post)
            </Link>
          );
        });
      }
      if (users) {
        users.forEach((user) => {
          pages[user.username] = (
            <Link
              className="link"
              to={`/users/${user.id}`}
              onClick={() => (window.location.href = `/users/${user.id}`)}
            >
              {user.username} (user profile)
            </Link>
          );
        });
      }
      if (categories) {
        categories.forEach((category) => {
          pages[category.title] = (
            <Link
              className="link"
              to={`/categories/${category.id}`}
              onClick={() =>
                (window.location.href = `/categories/${category.id}/posts`)
              }
            >
              {category.title} (category)
            </Link>
          );
        });
      }
      setResult(
        Object.keys(pages).map((key) =>
          key.toUpperCase().indexOf(value) > -1 ? (
            <li key={key} className="search-result-list">
              {pages[key]}
            </li>
          ) : null
        )
      );
    } else {
      setResult(null);
    }
  }
  return (
    <div className="nav-bar">
      <div className="navlink-left">
        <Link className="link" to="/">
          <img className="logo-img" src={myblog} alt="myblog" />
        </Link>
      </div>
      <div className="navlink-center">
        <ul className="nav-list">
          <li>
            <Link className="nav-link" to="/">
              Posts
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/post/create">
              Create a post
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/categories">
              Categories
            </Link>
          </li>
          {user && (
            <li>
              <Link className="nav-link" to={`/users/${user.id}/posts`}>
                My posts
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link className="nav-link" to="/settings">
                Settings
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navlink-search">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon-input"></i>
          <input
            type="search"
            className="search-input"
            onChange={(e) => search(e.target.value)}
            placeholder="Search..."
          />
          {result && result.length > 0 && (
            <div className="search-bar">
              <ul className="search-result">{result}</ul>
            </div>
          )}
        </div>
      </div>
      {user ? (
        <div className="navlink-right">
          <p className="user-role">
            {user.role === "admin" ? (
              <a
                className="link nav-link"
                href="http://127.0.0.1:8000/admin"
                target="_blank"
                rel="noreferrer"
              >
                {user.role}
              </a>
            ) : (
              <span>{user.role}</span>
            )}
          </p>
          <Link className="link" to={`/users/${user.id}`}>
            <img
              className="user-img"
              src={`http://127.0.0.1:8000/profile_pictures/${user.profilePicture}`}
              alt={user.profilePicture}
            />
          </Link>
          <Link className="link nav-link" to={`/users/${user.id}`}>
            <span>{user.username}</span>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="navlink-right">
          <Link className="link" to="/login">
            <button className="login-btn">Login</button>
          </Link>
          <Link className="link" to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      )}
    </div>
  );
}
