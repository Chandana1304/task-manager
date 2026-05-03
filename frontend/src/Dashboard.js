import { useEffect, useState } from "react";
import API from "./api";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import EmptyState from "./components/EmptyState";
import "./styles.css";

function Dashboard() {
  const [, setData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dash, taskRes, projRes] = await Promise.all([
        API.get("/dashboard"),
        API.get("/tasks"),
        API.get("/projects"),
      ]);

      setData(dash.data || {});
      setTasks(taskRes.data || []);
      setProjects(projRes.data || []);
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
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Project creation failed");
    }
  };

  const createTask = async () => {
    if (!title.trim()) return alert("Enter task title");
    if (!projectId) return alert("Select a project");

    try {
      await API.post("/tasks", {
        title,
        project: projectId,
      });
      setTitle("");
      setProjectId("");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Task creation failed");
    }
  };

  const updateStatus = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "done" });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Task update failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main">
        <Topbar
          title={role === "Admin" ? "Admin Dashboard" : "Member Dashboard"}
          subtitle="Track projects, tasks, and progress in one place."
        />

        <section className="cards">
          <StatCard label="Projects" value={projects.length} />
          <StatCard label="Tasks" value={tasks.length} />
          <StatCard
            label="Completed"
            value={tasks.filter((t) => t.status === "done").length}
            type="success"
          />
          <StatCard
            label="Pending"
            value={tasks.filter((t) => t.status !== "done").length}
            type="warning"
          />
        </section>

        <section className="content-grid">
          {role === "Admin" && (
            <div className="panel">
              <div className="panel-head">
                <h3>Create Project</h3>
                <span className="panel-tag">Admin</span>
              </div>
              <p className="panel-text">Create a new project workspace.</p>
              <input
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <button className="primary-btn" onClick={createProject}>
                Create Project
              </button>
            </div>
          )}

          <div className="panel">
            <div className="panel-head">
              <h3>Create Task</h3>
              <span className="panel-tag">Task</span>
            </div>
            <p className="panel-text">Add a task under a selected project.</p>

            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id || p.id} value={p._id || p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button className="primary-btn" onClick={createTask}>
              Add Task
            </button>
          </div>
        </section>

        <section className="panel task-panel">
          <div className="panel-head">
            <h3>Recent Tasks</h3>
            <span className="panel-tag">{tasks.length} items</span>
          </div>

          {loading ? (
            <EmptyState title="Loading..." text="Fetching tasks for you." />
          ) : tasks.length === 0 ? (
            <EmptyState
              title="No tasks yet"
              text="Create your first task to start tracking work."
            />
          ) : (
            <div className="task-list">
              {tasks.slice(0, 8).map((t) => (
                <div key={t._id || t.id} className="task-item">
                  <div className="task-left">
                    <p
                      className={`task-title ${t.status === "done" ? "done" : ""}`}
                    >
                      {t.title}
                    </p>
                    <span
                      className={`badge ${t.status === "done" ? "success" : "pending"}`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div>
                    {t.status !== "done" ? (
                      <button
                        className="success-btn"
                        onClick={() => updateStatus(t._id || t.id)}
                      >
                        Mark Done
                      </button>
                    ) : (
                      <span className="done-text">Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
