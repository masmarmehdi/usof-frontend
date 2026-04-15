import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirmation, setconfirmpassword] = useState("");
  const [errors, setErrors] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(false);
    const response = await axios.post(
      "http://localhost:8000/api/auth/register/",
      {
        username,
        name,
        email,
        password,
        password_confirmation,
      }
    );

    if (response.data.error) {
      console.log(response.data)
      setErrors(response.data.error);
    } else {
      response.data && window.location.replace("/login");
    }
  };
  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="register-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Register a new membership</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {errors.username && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors.username[0]}
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
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>

            {errors.name && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors.name[0]}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <i className="fas fa-id-card"></i> Full Name
              </label>
              <input
                id="name"
                className="form-input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>

            {errors.email && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors.email[0]}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Email
              </label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>

            {errors.password && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors.password[0]}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>

            {errors.password_confirmation && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors.password_confirmation[0]}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password_confirmation" className="form-label">
                <i className="fas fa-lock"></i> Confirm Password
              </label>
              <input
                id="password_confirmation"
                className="form-input"
                type="password"
                placeholder="Confirm your password"
                value={password_confirmation}
                onChange={(e) => setconfirmpassword(e.target.value)}
                required
              />
            </div>

            <button className="btn-submit" type="submit">
              <i className="fas fa-user-plus"></i> Create Account
            </button>

            <div className="form-footer">
              <span className="footer-text">
                Already have an account?{" "}
                <Link className="footer-link" to="/login">
                  Log in here!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
