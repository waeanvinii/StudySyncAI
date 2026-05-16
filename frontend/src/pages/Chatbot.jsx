import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../styles/dashboard.css";

function Chatbot() {

  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askAI =
    async () => {

      if (!message.trim()) {
        alert(
          "Please enter a question"
        );
        return;
      }

      try {

        setLoading(true);

        const response =
          await API.post(
            "/chatbot",
            {
              message
            }
          );

        setReply(
          response.data.reply
        );

      } catch (error) {

        console.log(error);

        alert(
          "AI failed. Check backend."
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="dashboard-page">

      <Sidebar active="chatbot" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>
            AI Study Assistant 🤖
          </h1>

          <p>
            Ask anything
            related to studies.
          </p>
        </div>

        <div
          className="recent-card"
          style={{
            marginTop: "30px"
          }}
        >

          <textarea
            className="chat-input"
            rows="5"
            placeholder="Ask AI anything..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
          />

          <button
            className="chat-button"
            style={{
              marginTop: "20px"
            }}
            onClick={askAI}
          >
            {loading
              ? "Thinking..."
              : "Ask AI"}
          </button>

          {reply && (
            <div
              style={{
                marginTop:
                  "30px"
              }}
            >
              <h3>
                AI Response
              </h3>

              <div
                className="assignment-item"
              >
                {reply}
              </div>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default Chatbot;