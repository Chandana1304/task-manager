import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Tasks from "./Tasks";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function RoleRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (role !== allowedRole) return <Navigate to="/" replace />;

  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setRole={setRole} />}
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navigate
                to={role === "Admin" ? "/admin/dashboard" : "/member/dashboard"}
                replace
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RoleRoute allowedRole="Admin">
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <RoleRoute allowedRole="Admin">
              <Projects />
            </RoleRoute>
          }
        />
        <Route
          path="/admin/tasks"
          element={
            <RoleRoute allowedRole="Admin">
              <Tasks />
            </RoleRoute>
          }
        />

        <Route
          path="/member/dashboard"
          element={
            <RoleRoute allowedRole="Member">
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/member/projects"
          element={
            <RoleRoute allowedRole="Member">
              <Projects />
            </RoleRoute>
          }
        />
        <Route
          path="/member/tasks"
          element={
            <RoleRoute allowedRole="Member">
              <Tasks />
            </RoleRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
