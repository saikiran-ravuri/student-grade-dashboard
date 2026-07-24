import "./Header.css";

function Header() {
  return (
    <header className="dashboard-header">
      <div className="header-badge">
        <span className="badge-dot"></span>
        React Dashboard
      </div>

      <h1>Student Grade Dashboard</h1>

      <p>
        Manage, track and analyze student academic performance
        through a clean, modern dashboard with powerful CRUD
        operations and real-time statistics.
      </p>
    </header>
  );
}

export default Header;
