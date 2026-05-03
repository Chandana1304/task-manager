import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Login({ setToken, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const userRole = res.data.user?.role || res.data.role;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      setToken(res.data.token);
      setRole(userRole);

      if (userRole === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/member/dashboard");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(
        err.response?.data?.msg || err.response?.data?.error || "Login failed",
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
