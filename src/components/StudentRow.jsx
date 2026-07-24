import "./StudentRow.css";

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function StudentRow({ student, onEdit, onDelete }) {
  const { name, subject, marks, grade } = student;

  return (
    <article className="student-row">
      <div className="student-profile">
        <div className="student-avatar" aria-hidden="true">
          {getInitials(name)}
        </div>

        <div className="student-details">
          <h3>{name}</h3>
          <p>{subject}</p>
        </div>
      </div>

      <div className="student-performance">
        <div className="marks-block">
          <span className="student-field-label">Marks</span>
          <strong>{marks}%</strong>
        </div>

        <div className="grade-block">
          <span className="student-field-label">Grade</span>
          <span
            className={`grade-badge grade-${grade
              .toLowerCase()
              .replace("+", "-plus")}`}
          >
            {grade}
          </span>
        </div>
      </div>

      <div className="student-actions">
        <button
          type="button"
          className="student-action-button edit-button"
          onClick={() => onEdit(student)}
          aria-label={`Edit ${name}`}
        >
          Edit
        </button>

        <button
          type="button"
          className="student-action-button delete-button"
          onClick={() => onDelete(student)}
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default StudentRow;