import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (e) => {
      e.preventDefault();

      try {
        await API.post(
          "/register",
          {
            username,
            email,
            password
          }
        );

        const loginResponse =
          await API.post(
            "/login",
            {
              email,
              password
            }
          );

        localStorage.setItem(
          "token",
          loginResponse.data.token
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

          <h2>Create Account</h2>

          <p className="subtitle">
            Register to continue
          </p>

          <form
            className="login-form"
            onSubmit={
              handleRegister
            }
          >

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />

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
              Register
            </button>

          </form>

          <p className="bottom-text">
            Already have an account?

            <Link to="/">
              <span>
                Login
              </span>
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;