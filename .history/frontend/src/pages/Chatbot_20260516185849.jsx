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
            Ask questions and get
            instant study help.
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
            placeholder="Ask anything..."
            className="chat-input"
          />

          <button
            className="chat-button"
          >
            Ask AI
          </button>

          <div
            style={{
              marginTop: "25px"
            }}
          >
            <h3>AI Response</h3>

            <div
              className="assignment-item"
            >
              Your AI response will
              appear here...
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Chatbot;