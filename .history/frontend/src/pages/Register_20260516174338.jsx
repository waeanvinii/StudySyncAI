import "../styles/login.css";

function Register() {
  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand-box">
          <h1>StudySync AI</h1>

          <p>
            Create your account and
            start managing student life
            smarter.
          </p>
        </div>
      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Create Account</h2>

          <p className="subtitle">
            Join StudySync AI
          </p>

          <form className="login-form">

            <input
              type="text"
              placeholder="Username"
            />

            <input
              type="email"
              placeholder="Email"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button type="submit">
              Register
            </button>

          </form>

          <p className="bottom-text">
            Already have an account?
            <span> Login</span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;