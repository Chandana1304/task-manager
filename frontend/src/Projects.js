import { useEffect, useState } from "react";
import API from "./api";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import EmptyState from "./components/EmptyState";
import "./styles.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get("/projects");
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (role !== "Admin") return alert("Only Admin allowed");
    if (!projectName.trim()) return alert("Enter project name");

    try {
      await API.post("/projects", { name: projectName });
      setProjectName("");
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.msg || "Project creation failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main">
        <Topbar
          title="Projects"
          subtitle="Manage all project workspaces from one screen."
        />

        <section className="panel">
          <div className="panel-head">
            <h3>All Projects</h3>
            <span className="panel-tag">{projects.length} total</span>
          </div>

          {role === "Admin" && (
            <div className="inline-form">
              <input
                type="text"
                placeholder="Enter new project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <button className="primary-btn" onClick={createProject}>
                Add Project
              </button>
            </div>
          )}

          {loading ? (
            <EmptyState title="Loading..." text="Fetching projects for you." />
          ) : projects.length === 0 ? (
            <EmptyState
              title="No projects found"
              text="Create a project to organize tasks and teams."
            />
          ) : (
            <div className="project-grid">
              {projects.map((project) => (
                <div key={project._id || project.id} className="project-card">
                  <h4>{project.name}</h4>
                  <p>Project workspace</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Projects;
