import "../styles/login.css";

function Login() {
  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand-box">
          <h1>StudySync AI</h1>

          <p>
            Smarter student life.
            Better productivity.
          </p>
        </div>
      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Login to continue
          </p>

          <form className="login-form">

            <input
              type="email"
              placeholder="Email"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p className="bottom-text">
            Don’t have an account?
            <span> Register</span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;