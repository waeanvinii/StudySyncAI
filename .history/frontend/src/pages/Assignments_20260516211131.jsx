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
      if (!title.trim()) return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/assignments",
          {
            title: title,
            description:
              "Student Task",
            due_date:
              "2026-05-30",
            status:
              "Pending"
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

  const markComplete =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          `/assignments/${id}`,
          {
            status:
              "Completed"
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchAssignments();

      } catch (error) {
        console.log(error);
      }
    };

  const deleteAssignment =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/assignments/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

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
            assignments.
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
                  style={{
                    background:
                      "#101827",
                    padding:
                      "18px",
                    borderRadius:
                      "18px",
                    marginBottom:
                      "15px"
                  }}
                >
                  <h4>
                    {
                      assignment.title
                    }
                  </h4>

                  <p>
                    Status:
                    {" "}
                    {
                      assignment.status
                    }
                  </p>

                  <button
                    className="chat-button"
                    style={{
                      marginRight:
                        "10px"
                    }}
                    onClick={() =>
                      markComplete(
                        assignment.id
                      )
                    }
                  >
                    Complete
                  </button>

                  <button
                    className="chat-button"
                    onClick={() =>
                      deleteAssignment(
                        assignment.id
                      )
                    }
                  >
                    Delete
                  </button>

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