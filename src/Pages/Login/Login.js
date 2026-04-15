import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const user_ref = useRef();
  const email_ref = useRef();
  const password_ref = useRef();
  const { dispatch } = useContext(Context);
  const [errors, setErrors] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(false);

    dispatch({
      type: "START_LOGIN_SESSION",
    });
    const response = await axios.post("http://localhost:8000/api/auth/login/", {
      username: user_ref.current.value,
      email: email_ref.current.value,
      password: password_ref.current.value,
    });
    if (response.data.error) {
      setErrors(response.data.error);
    } else {
      dispatch({
        type: "SUCCESS_LOGIN",
        payload: response.data.user,
      });
      response.data && window.location.replace("/");
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <i className="fas fa-sign-in-alt"></i>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Login to start your session</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {errors && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <i className="fas fa-user"></i> Username
              </label>
              <input
                id="username"
                className="form-input"
                type="text"
                placeholder="Enter your username"
                ref={user_ref}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Email
              </label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="Enter your email"
                ref={email_ref}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Enter your password"
                ref={password_ref}
                required
              />
            </div>

            <button className="btn-submit" type="submit">
              <i className="fas fa-sign-in-alt"></i> Login
            </button>

            <div className="form-footer">
              <span className="footer-text">
                Not a user yet?{" "}
                <Link className="footer-link" to="/register">
                  Register here!
                </Link>
              </span>
              <span className="footer-text">
                <a className="footer-link" href="#">
                  <i className="fas fa-key"></i> Forgot password?
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
