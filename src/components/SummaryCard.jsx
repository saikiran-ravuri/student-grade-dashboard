import "./SummaryCard.css";

function getIcon(title) {
  switch (title) {
    case "Total Students":
      return "👥";
    case "Average Marks":
      return "📈";
    case "Top Grade":
      return "🏆";
    case "Subjects":
      return "📚";
    default:
      return "📊";
  }
}

function getAccent(title) {
  switch (title) {
    case "Total Students":
      return "blue";
    case "Average Marks":
      return "green";
    case "Top Grade":
      return "orange";
    case "Subjects":
      return "purple";
    default:
      return "blue";
  }
}

function SummaryCard({ title, value }) {
  return (
    <article className={`summary-card ${getAccent(title)}`}>
      <div className="summary-top">
        <div className="summary-icon">{getIcon(title)}</div>

        <div className="summary-content">
          <p className="summary-title">{title}</p>
          <h3 className="summary-value">{value}</h3>
        </div>
      </div>

      <div className="summary-footer">
        <span className="summary-dot"></span>
        Live Statistics
      </div>
    </article>
  );
}

export default SummaryCard;