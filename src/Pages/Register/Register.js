import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  return (
    <div className="register">
      <div className="register-card">
        <p className="register-title">Register a new membership</p>
        <form className="register-form">
          <label className="register-username">Username</label>
          <input
            className="register-input"
            type="text"
            placeholder="Enter your username"
          />
          <label className="register-username">Name</label>
          <input
            className="register-input"
            type="text"
            placeholder="Enter your username"
          />
          <label className="register-username">Email</label>
          <input
            className="register-input"
            type="email"
            placeholder="Enter your email"
          />
          <label className="register-username">Password</label>
          <input
            className="register-input"
            type="password"
            placeholder="Enter your password"
          />
          <label className="register-username">Confirm password</label>
          <input
            className="register-input"
            type="password"
            placeholder="Confirm your password"
          />
          <button className="register-submit" type="submit">
            Register
          </button>
          <span class="anchor-register">
            Already have an account?{" "}
            <Link className="create-account" to="/login">
              Log in!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
