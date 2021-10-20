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
      setErrors(response.data.error);
    } else {
      response.data && window.location.replace("/login");
    }
  };
  return (
    <div className="register">
      <div className="register-card">
        <p className="register-title">Register a new membership</p>
        <form className="register-form" onSubmit={handleSubmit}>
          {errors.username && (
            <div style={{ color: "red" }}>{errors.username[0]}</div>
          )}
          <label className="register-username">Username</label>
          <input
            className="register-input"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setusername(e.target.value)}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name[0]}</div>}
          <label className="register-username">Name</label>
          <input
            className="register-input"
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => setname(e.target.value)}
          />
          {errors.email && (
            <div style={{ color: "red" }}>{errors.email[0]}</div>
          )}
          <label className="register-username">Email</label>
          <input
            className="register-input"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password[0]}</div>
          )}
          <label className="register-username">Password</label>
          <input
            className="register-input"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          />
          {errors.password_confirmation && (
            <div style={{ color: "red" }}>
              {errors.password_confirmation[0]}
            </div>
          )}
          <label className="register-username">Confirm password</label>
          <input
            className="register-input"
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => setconfirmpassword(e.target.value)}
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
