import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import API from "../services/api";

function Assignments() {
  const [assignments,
    setAssignments] =
    useState([]);

  const [title, setTitle] =
    useState("");

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

  const addAssignment =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/assignments",
          {
            title
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setTitle("");

        fetchAssignments();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="dashboard-page">

      <Sidebar active="assignments" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>
            Assignments 📚
          </h1>

          <p>
            Manage your
            assignments here.
          </p>
        </div>

        <div
          className="recent-card"
          style={{
            marginTop: "30px"
          }}
        >

          <h3>
            Add Assignment
          </h3>

          <input
            className="chat-input"
            type="text"
            placeholder="Enter assignment"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <button
            className="chat-button"
            onClick={
              addAssignment
            }
          >
            Add Assignment
          </button>

          <div
            style={{
              marginTop:
                "30px"
            }}
          >
            <h3>
              Your Assignments
            </h3>

            {assignments.map(
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
            )}
          </div>

        </div>

      </main>

    </div>
  );
}

export default Assignments;