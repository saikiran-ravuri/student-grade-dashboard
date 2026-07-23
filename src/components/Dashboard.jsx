import "./Dashboard.css";
import SummaryCard from "./SummaryCard";

function Dashboard() {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>

      <div className="summary-cards">
        <SummaryCard title="Total Students" value="120" />
        <SummaryCard title="Average Marks" value="86%" />
        <SummaryCard title="Top Grade" value="A+" />
        <SummaryCard title="Subjects" value="8" />
      </div>
    </section>
  );
}

export default Dashboard;