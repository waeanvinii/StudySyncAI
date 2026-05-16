import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Chatbot() {
  return (
    <div className="dashboard-page">

      <Sidebar active="chatbot" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>StudySync AI 🤖</h1>

          <p>
            Ask questions and
            get study help instantly.
          </p>
        </div>

        <div
          className="recent-card"
          style={{
            marginTop: "30px"
          }}
        >

          <h3>Ask AI</h3>

          <input
            type="text"
            placeholder="Ask something..."
            style={{
              width: "100%",
              padding: "16px",
              background: "#0f141b",
              border:
                "1px solid #262c36",
              borderRadius: "14px",
              color: "white",
              marginTop: "15px"
            }}
          />

        </div>

      </main>

    </div>
  );
}

export default Chatbot;