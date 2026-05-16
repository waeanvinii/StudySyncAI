import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import API from "../services/api";

function Attendance() {
  const [subject,
    setSubject] =
    useState("");

  const [status,
    setStatus] =
    useState("Present");

  const [attendance,
    setAttendance] =
    useState({});

  const fetchAttendance =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/attendance/percentage",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setAttendance(
          response.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const markAttendance =
    async () => {
      if (!subject.trim())
        return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/attendance",
          {
            subject,
            status
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setSubject("");

        fetchAttendance();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="dashboard-page">

      <Sidebar active="attendance" />

      <main className="dashboard-content">

        <div className="welcome-card">
          <h1>
            Attendance 📅
          </h1>

          <p>
            Track your
            attendance.
          </p>
        </div>

        <div
          className="recent-card"
          style={{
            marginTop: "30px"
          }}
        >

          <h3>
            Mark Attendance
          </h3>

          <input
            className="chat-input"
            type="text"
            placeholder="Subject Name"
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
          />

          <select
            className="chat-input"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
          >
            <option>
              Present
            </option>

            <option>
              Absent
            </option>
          </select>

          <button
            className="chat-button"
            onClick={
              markAttendance
            }
          >
            Save Attendance
          </button>

          <div
            style={{
              marginTop:
                "30px"
            }}
          >
            <h3>
              Attendance %
            </h3>

            {Object.keys(
              attendance
            ).length > 0 ? (

              Object.entries(
                attendance
              ).map(
                ([
                  subject,
                  data
                ]) => (
                  <div
                    key={
                      subject
                    }
                    className="assignment-item"
                  >
                    <h4>
                      {subject}
                    </h4>

                    <p>
                      {
                        data
                          .percentage
                      }
                      %
                    </p>

                    <p>
                      Present:
                      {" "}
                      {
                        data.present_count
                      }

                      /
                      {
                        data.total_days
                      }
                    </p>

                  </div>
                )
              )

            ) : (
              <p>
                No attendance
                yet.
              </p>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Attendance;