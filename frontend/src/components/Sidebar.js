import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Tasks", path: "/admin/tasks" },
  ];

  const memberMenu = [
    { name: "Dashboard", path: "/member/dashboard" },
    { name: "Projects", path: "/member/projects" },
    { name: "Tasks", path: "/member/tasks" },
  ];

  const menu = role === "Admin" ? adminMenu : memberMenu;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">Workspace</h2>

        <div className="menu-list">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <p className="role-text">Logged in as: {role}</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
