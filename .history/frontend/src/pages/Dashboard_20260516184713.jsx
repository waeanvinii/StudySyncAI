import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  FaBook,
  FaClipboardList,
  FaRobot,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div>

          <div className="logo">
            <h2>StudySync AI</h2>
          </div>

          <nav className="menu">

            <div
              className="menu-item active"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              <FaHome />
              <span>Dashboard</span>
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/assignments")
              }
            >
              <FaClipboardList />
              <span>Assignments</span>
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/attendance")
              }
            >
              <FaBook />
              <span>Attendance</span>
            </div>

            <div
              className="menu-item"
              onClick={() =>
                navigate("/chatbot")
              }
            >
              <FaRobot />
              <span>AI Assistant</span>
            </div>

          </nav>
        </div>

        <div
          className="logout"
          onClick={() => navigate("/")}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>

      </aside>

      {/* Main */}
      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>Welcome Back 👋</h1>

          <p>
            Stay on top of your
            academics with StudySync AI.
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Attendance</h3>
            <p>85%</p>
          </div>

          <div className="stat-card">
            <h3>Pending Tasks</h3>
            <p>4</p>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <p>12</p>
          </div>

        </div>

        <div className="bottom-grid">

          <div className="recent-card">
            <h3>
              Recent Assignments
            </h3>

            <div className="assignment-item">
              DBMS Project
            </div>

            <div className="assignment-item">
              React Mini Project
            </div>

            <div className="assignment-item">
              OS Notes Submission
            </div>
          </div>

          <div className="ai-card">
            <h3>StudySync AI</h3>

            <p>
              Need help with
              studies? Ask AI.
            </p>

            <button
              onClick={() =>
                navigate("/chatbot")
              }
            >
              Open Assistant
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;