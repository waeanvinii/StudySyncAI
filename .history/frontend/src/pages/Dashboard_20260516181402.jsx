import "../styles/dashboard.css";
import {
  FaBook,
  FaClipboardList,
  FaRobot,
  FaSignOutAlt
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <h2>StudySync</h2>
        </div>

        <nav className="menu">

          <div className="menu-item active">
            <FaBook />
            <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <FaClipboardList />
            <span>Assignments</span>
          </div>

          <div className="menu-item">
            <FaBook />
            <span>Attendance</span>
          </div>

          <div className="menu-item">
            <FaRobot />
            <span>AI Assistant</span>
          </div>

        </nav>

        <div className="logout">
          <FaSignOutAlt />
          <span>Logout</span>
        </div>

      </aside>

      {/* Main Content */}
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
            <h3>Recent Assignments</h3>

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

            <button>
              Open Assistant
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;