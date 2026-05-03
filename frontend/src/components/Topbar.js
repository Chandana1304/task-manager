function Topbar({ title, subtitle }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-user">
        <span>{user.name || "User"}</span>
      </div>
    </div>
  );
}

export default Topbar;
