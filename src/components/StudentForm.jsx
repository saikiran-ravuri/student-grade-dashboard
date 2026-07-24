import { useState } from "react";

import "./StudentForm.css";

function createInitialForm(editingStudent) {
  if (editingStudent) {
    return {
      name: editingStudent.name,
      subject: editingStudent.subject,
      marks: String(editingStudent.marks),
      grade: editingStudent.grade,
    };
  }

  return {
    name: "",
    subject: "",
    marks: "",
    grade: "",
  };
}

function StudentForm({
  onAddStudent,
  editingStudent,
  onUpdateStudent,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(() =>
    createInitialForm(editingStudent)
  );

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const validationErrors = {};
    const normalizedName = formData.name.trim();
    const normalizedSubject = formData.subject.trim();
    const numericMarks = Number(formData.marks);

    if (!normalizedName) {
      validationErrors.name = "Student name is required.";
    } else if (normalizedName.length < 2) {
      validationErrors.name =
        "Student name must contain at least 2 characters.";
    }

    if (!normalizedSubject) {
      validationErrors.subject = "Subject is required.";
    }

    if (formData.marks === "") {
      validationErrors.marks = "Marks are required.";
    } else if (
      Number.isNaN(numericMarks) ||
      numericMarks < 0 ||
      numericMarks > 100
    ) {
      validationErrors.marks =
        "Marks must be between 0 and 100.";
    }

    if (!formData.grade) {
      validationErrors.grade = "Grade is required.";
    }

    return validationErrors;
  }

  function resetForm() {
    setFormData(createInitialForm(null));
    setErrors({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const studentData = {
      name: formData.name.trim(),
      subject: formData.subject.trim(),
      marks: Number(formData.marks),
      grade: formData.grade,
    };

    if (editingStudent) {
      onUpdateStudent({
        ...studentData,
        id: editingStudent.id,
      });
    } else {
      onAddStudent({
        ...studentData,
        id: crypto.randomUUID(),
      });

      resetForm();
    }
  }

  function handleCancel() {
    resetForm();
    onCancelEdit();
  }

  return (
    <section className="student-form-section">
      <h2>
        {editingStudent ? "Update Student" : "Add Student"}
      </h2>

      <form
        className="student-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="student-name">
              Student Name
            </label>

            <input
              id="student-name"
              name="name"
              type="text"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? "student-name-error" : undefined
              }
            />

            {errors.name && (
              <span
                id="student-name-error"
                className="form-error"
              >
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="student-subject">
              Subject
            </label>

            <input
              id="student-subject"
              name="subject"
              type="text"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={
                errors.subject
                  ? "student-subject-error"
                  : undefined
              }
            />

            {errors.subject && (
              <span
                id="student-subject-error"
                className="form-error"
              >
                {errors.subject}
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="student-marks">
              Marks
            </label>

            <input
              id="student-marks"
              name="marks"
              type="number"
              min="0"
              max="100"
              placeholder="Enter marks"
              value={formData.marks}
              onChange={handleChange}
              aria-invalid={Boolean(errors.marks)}
              aria-describedby={
                errors.marks
                  ? "student-marks-error"
                  : undefined
              }
            />

            {errors.marks && (
              <span
                id="student-marks-error"
                className="form-error"
              >
                {errors.marks}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="student-grade">
              Grade
            </label>

            <select
              id="student-grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              aria-invalid={Boolean(errors.grade)}
              aria-describedby={
                errors.grade
                  ? "student-grade-error"
                  : undefined
              }
            >
              <option value="">Select grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>

            {errors.grade && (
              <span
                id="student-grade-error"
                className="form-error"
              >
                {errors.grade}
              </span>
            )}
          </div>
        </div>

        <div className="form-actions">
          {editingStudent && (
            <button
              className="secondary-btn"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}

          <button className="primary-btn" type="submit">
            {editingStudent
              ? "Update Student"
              : "Add Student"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default StudentForm;