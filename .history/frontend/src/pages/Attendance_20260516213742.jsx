import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../styles/dashboard.css";

function Attendance() {
  const [subject, setSubject] =
    useState("");

  const [status, setStatus] =
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

  const handleSave =
    async () => {
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
        setStatus(
          "Present"
        );

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
            attendance smartly.
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
            type="text"
            placeholder="Subject"
            className="chat-input"
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
            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>
          </select>

          <button
            className="chat-button"
            onClick={
              handleSave
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
            ).length === 0 ? (
              <p>
                No attendance
                records yet.
              </p>
            ) : (
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
                        data.percentage
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
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Attendance;