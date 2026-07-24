import { useState } from "react";
import "./StudentForm.css";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("A+");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Student name is required.";
    }

    if (!subject.trim()) {
      validationErrors.subject = "Subject is required.";
    }

    if (marks === "") {
      validationErrors.marks = "Marks are required.";
    } else if (Number(marks) < 0 || Number(marks) > 100) {
      validationErrors.marks = "Marks must be between 0 and 100.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newStudent = {
      id: crypto.randomUUID(),
      name: name.trim(),
      subject: subject.trim(),
      marks: Number(marks),
      grade,
    };

    onAddStudent(newStudent);

    setName("");
    setSubject("");
    setMarks("");
    setGrade("A+");
    setErrors({});
  }

  return (
    <section className="student-form-section">
      <h2>Add New Student</h2>

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">
            Student Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={errors.name ? "input-error" : ""}
          />

          {errors.name && (
            <p className="error-text">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="subject">
            Subject
          </label>

          <input
            id="subject"
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className={errors.subject ? "input-error" : ""}
          />

          {errors.subject && (
            <p className="error-text">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="marks">
              Marks
            </label>

            <input
              id="marks"
              type="number"
              min="0"
              max="100"
              placeholder="0 - 100"
              value={marks}
              onChange={(event) => setMarks(event.target.value)}
              className={errors.marks ? "input-error" : ""}
            />

            {errors.marks && (
              <p className="error-text">
                {errors.marks}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="grade">
              Grade
            </label>

            <select
              id="grade"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
            >
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        <button type="submit">
          + Add Student
        </button>
      </form>
    </section>
  );
}

export default StudentForm;