import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/assignments"
          element={<Assignments />}
        />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/chatbot"
          element={<Chatbot />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;