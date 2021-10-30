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
    <div className="login">
      <div className="login-card">
        <p className="login-title">Login to start your session</p>
        <form className="login-form" onSubmit={handleSubmit}>
          {errors && (
            <div style={{ color: "red", textAlign: "center" }}>{errors}</div>
          )}
          <label className="login-username">Username</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter your username"
            ref={user_ref}
          />
          <label className="login-username">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            ref={email_ref}
          />
          <label className="login-username">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            ref={password_ref}
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
