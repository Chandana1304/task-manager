import { useEffect, useMemo, useState } from "react";
import API from "./api";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import EmptyState from "./components/EmptyState";
import "./styles.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "done" });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.msg || "Task update failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" ? true : task.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [tasks, search, statusFilter]);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main">
        <Topbar
          title="Tasks"
          subtitle="Search, filter, and update all task items."
        />

        <section className="panel">
          <div className="filters">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>

          {loading ? (
            <EmptyState title="Loading..." text="Fetching tasks for you." />
          ) : filteredTasks.length === 0 ? (
            <EmptyState
              title="No matching tasks"
              text="Try changing the filter or create a new task."
            />
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <div key={task._id || task.id} className="task-item">
                  <div className="task-left">
                    <p
                      className={`task-title ${task.status === "done" ? "done" : ""}`}
                    >
                      {task.title}
                    </p>
                    <span
                      className={`badge ${
                        task.status === "done" ? "success" : "pending"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div>
                    {task.status !== "done" ? (
                      <button
                        className="success-btn"
                        onClick={() => updateStatus(task._id || task.id)}
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

export default Tasks;
