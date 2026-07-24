import "./StudentRow.css";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StudentRow({ student, onEdit, onDelete }) {
  return (
    <article className="student-card">
      <div className="student-left">
        <div className="student-avatar">
          {getInitials(student.name)}
        </div>

        <div className="student-info">
          <h3>{student.name}</h3>

          <p>{student.subject}</p>

          <div className="student-meta">
            <span className="marks">
              Marks <strong>{student.marks}</strong>
            </span>

            <span className={`grade grade-${student.grade.replace("+", "plus")}`}>
              {student.grade}
            </span>
          </div>
        </div>
      </div>

      <div className="student-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(student)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default StudentRow;