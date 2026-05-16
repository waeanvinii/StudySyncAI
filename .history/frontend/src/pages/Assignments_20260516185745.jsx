import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Assignments() {
  return (
    <div className="dashboard-page">

      <Sidebar active="assignments" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>Assignments 📚</h1>

          <p>
            Manage all your
            assignments in one place.
          </p>
        </div>

        <div
          style={{
            marginTop: "30px"
          }}
        >
          <div className="recent-card">

            <h3>
              Your Assignments
            </h3>

            <div className="assignment-item">
              DBMS Project
            </div>

            <div className="assignment-item">
              React UI Build
            </div>

            <div className="assignment-item">
              OS Notes Submission
            </div>

          </div>
        </div>

      </main>

    </div>
  );
}

export default Assignments;