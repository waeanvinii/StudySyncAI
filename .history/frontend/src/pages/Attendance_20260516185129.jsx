import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Attendance() {
  return (
    <div className="dashboard-page">

      <Sidebar active="attendance" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>Attendance 📅</h1>

          <p>
            Track your
            attendance percentage.
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>DBMS</h3>
            <p>85%</p>
          </div>

          <div className="stat-card">
            <h3>Python</h3>
            <p>92%</p>
          </div>

          <div className="stat-card">
            <h3>OS</h3>
            <p>74%</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Attendance;