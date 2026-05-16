import { useNavigate } from "react-router-dom";

import {
  FaBook,
  FaClipboardList,
  FaRobot,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";

function Sidebar({ active }) {
  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "username"
      );

      navigate("/");
    };

  return (
    <aside className="sidebar">

      <div>

        <div className="logo">
          <h2>
            StudySync AI
          </h2>
        </div>

        <nav className="menu">

          <div
            className={`menu-item ${
              active ===
              "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
          >
            <FaHome />
            <span>
              Dashboard
            </span>
          </div>

          <div
            className={`menu-item ${
              active ===
              "assignments"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(
                "/assignments"
              )
            }
          >
            <FaClipboardList />
            <span>
              Assignments
            </span>
          </div>

          <div
            className={`menu-item ${
              active ===
              "attendance"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(
                "/attendance"
              )
            }
          >
            <FaBook />
            <span>
              Attendance
            </span>
          </div>

          <div
            className={`menu-item ${
              active ===
              "chatbot"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(
                "/chatbot"
              )
            }
          >
            <FaRobot />
            <span>
              AI Assistant
            </span>
          </div>

        </nav>
      </div>

      <div
        className="logout"
        onClick={
          handleLogout
        }
      >
        <FaSignOutAlt />
        <span>
          Logout
        </span>
      </div>

    </aside>
  );
}

export default Sidebar;