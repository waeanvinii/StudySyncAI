import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {
  const username =
    localStorage.getItem(
      "username"
    );

  const [assignments,
    setAssignments] =
    useState([]);

  const fetchAssignments =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/assignments",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setAssignments(
          response.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const totalAssignments =
    assignments.length;

  const pendingAssignments =
    assignments.filter(
      (
        assignment
      ) =>
        assignment.status ===
        "Pending"
    ).length;

  const completedAssignments =
    assignments.filter(
      (
        assignment
      ) =>
        assignment.status ===
        "Completed"
    ).length;

  return (
    <div className="dashboard-page">

      <Sidebar active="dashboard" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>
            Welcome Back,
            {username} 👋
          </h1>

          <p>
            Stay on top of
            your academics
            with StudySync AI.
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>
              Total Tasks
            </h3>

            <p>
              {
                totalAssignments
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Pending Tasks
            </h3>

            <p>
              {
                pendingAssignments
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Completed
            </h3>

            <p>
              {
                completedAssignments
              }
            </p>
          </div>

        </div>

        <div className="recent-card">

          <h3>
            Recent Assignments
          </h3>

          {assignments.length >
          0 ? (
            assignments.map(
              (
                assignment
              ) => (
                <div
                  key={
                    assignment.id
                  }
                  className="assignment-item"
                >
                  {
                    assignment.title
                  }
                </div>
              )
            )
          ) : (
            <p>
              No assignments
              yet.
            </p>
          )}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;