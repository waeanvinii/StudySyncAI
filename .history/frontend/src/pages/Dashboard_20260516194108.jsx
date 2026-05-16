import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const username =
    localStorage.getItem(
      "username"
    );

  return (
    <div className="dashboard-page">

      <Sidebar active="dashboard" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>
            Welcome, 
            {username} 👋
          </h1>

          <p>
            Stay on top of your
            academics with
            StudySync AI.
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

      </main>

    </div>
  );
}

export default Dashboard;