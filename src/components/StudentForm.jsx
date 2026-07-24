import { useState } from "react";

import "./StudentForm.css";

function createInitialForm() {
  return {
    id: crypto.randomUUID(),
    name: "",
    subject: "",
    marks: "",
    grade: "A",
  };
}

function StudentForm({
  onAddStudent,
  editingStudent,
  onUpdateStudent,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(() =>
    editingStudent
      ? {
          ...editingStudent,
          marks: String(editingStudent.marks),
        }
      : createInitialForm(),
  );

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function validateForm() {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Student name is required.";
    }

    if (!formData.subject.trim()) {
      validationErrors.subject = "Subject is required.";
    }

    if (formData.marks === "") {
      validationErrors.marks = "Marks are required.";
    } else {
      const numericMarks = Number(formData.marks);

      if (
        Number.isNaN(numericMarks) ||
        numericMarks < 0 ||
        numericMarks > 100
      ) {
        validationErrors.marks = "Marks must be between 0 and 100.";
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }

  function resetForm() {
    setFormData(createInitialForm());
    setErrors({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const student = {
      ...formData,
      marks: Number(formData.marks),
    };

    if (editingStudent) {
      onUpdateStudent(student);
    } else {
      onAddStudent(student);
    }

    resetForm();
  }

  return (
    <section className="student-form-section">
      <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>

      <form className="student-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
            />

            {errors.subject && <p className="form-error">{errors.subject}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="marks">Marks</label>

            <input
              id="marks"
              type="number"
              name="marks"
              placeholder="0 - 100"
              min="0"
              max="100"
              value={formData.marks}
              onChange={handleChange}
            />

            {errors.marks && <p className="form-error">{errors.marks}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade</label>

            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          {editingStudent && (
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                onCancelEdit();
                resetForm();
              }}
            >
              Cancel
            </button>
          )}

          <button type="submit" className="primary-btn">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default StudentForm;
