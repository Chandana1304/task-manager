import { Link } from "react-router-dom";
import "./styles.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-card">
        <p className="home-badge">Project & Task Management</p>
        <h1>Welcome to Workspace Manager</h1>
        <p className="home-text">
          Admins can create projects. Members can view assigned projects and add
          related tasks.
        </p>

        <div className="home-actions">
          <Link to="/login" className="link-btn primary-link">
            Login
          </Link>
          <Link to="/register" className="link-btn secondary-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
