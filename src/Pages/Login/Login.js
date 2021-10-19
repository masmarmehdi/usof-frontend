import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="login-card">
        <p className="login-title">Login to start your session</p>
        <form className="login-form">
          <label className="login-username">Username</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter your username"
          />
          <label className="login-username">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
          />
          <label className="login-username">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
          />
          <button className="login-submit" type="submit">
            Login
          </button>
          <span className="anchor-login">
            Not a user yet?{" "}
            <Link className="create-account" to="/register">
              Register!
            </Link>
          </span>
          <span className="anchor-login">
            Forgot your password?{" "}
            <a className="forgot-password" href="#">
              Request a password reset mail here!
            </a>
          </span>
        </form>
      </div>
    </div>
  );
}
