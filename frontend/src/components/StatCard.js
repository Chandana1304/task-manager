function StatCard({ label, value, type = "" }) {
  return (
    <div className={`stat-card ${type}`}>
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default StatCard;
