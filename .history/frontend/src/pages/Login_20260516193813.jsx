import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    try {
      const response =
        await API.post(
          "/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "username",
        response.data.user.username
      );

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand-box">

          <h1>
            StudySync AI
          </h1>

          <p>
            Smarter student life.
            Better productivity.
          </p>

        </div>
      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>
            Welcome Back
          </h2>

          <p className="subtitle">
            Login to continue
          </p>

          <form
            className="login-form"
            onSubmit={
              handleLogin
            }
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              type="submit"
            >
              Login
            </button>

          </form>

          <p className="bottom-text">
            Don’t have an account?

            <Link to="/register">
              <span>
                Register
              </span>
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;