import { useEffect, useRef, useState } from "react";

import "./Dashboard.css";

import ConfirmModal from "./ConfirmModal";
import StudentForm from "./StudentForm";
import StudentRow from "./StudentRow";
import SummaryCard from "./SummaryCard";

import initialStudents from "../data/students";
import { getDashboardStats } from "../utils/statistics";

const GRADE_ORDER = {
  "A+": 5,
  A: 4,
  "B+": 3,
  B: 2,
  C: 1,
};

function Dashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [sortOption, setSortOption] = useState("marks-desc");

  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const formSectionRef = useRef(null);

  useEffect(() => {
    if (!editingStudent) {
      return;
    }

    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [editingStudent]);

  function handleAddStudent(newStudent) {
    setStudents((currentStudents) => [
      ...currentStudents,
      newStudent,
    ]);
  }

  function handleEditStudent(student) {
    setEditingStudent(student);
  }

  function handleUpdateStudent(updatedStudent) {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    );

    setEditingStudent(null);
  }

  function handleCancelEdit() {
    setEditingStudent(null);
  }

  function handleDeleteStudent(student) {
    setStudentToDelete(student);
  }

  function confirmDeleteStudent() {
    if (!studentToDelete) {
      return;
    }

    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) => student.id !== studentToDelete.id
      )
    );

    if (editingStudent?.id === studentToDelete.id) {
      setEditingStudent(null);
    }

    setStudentToDelete(null);
  }

  function cancelDeleteStudent() {
    setStudentToDelete(null);
  }

  const filteredStudents = students.filter((student) => {
    const normalizedSearchTerm = searchTerm
      .trim()
      .toLowerCase();

    const matchesSearch =
      normalizedSearchTerm === "" ||
      student.name
        .toLowerCase()
        .includes(normalizedSearchTerm) ||
      student.subject
        .toLowerCase()
        .includes(normalizedSearchTerm);

    const matchesGrade =
      selectedGrade === "All" ||
      student.grade === selectedGrade;

    return matchesSearch && matchesGrade;
  });

  const sortedStudents = [...filteredStudents].sort(
    (firstStudent, secondStudent) => {
      switch (sortOption) {
        case "marks-asc":
          return firstStudent.marks - secondStudent.marks;

        case "marks-desc":
          return secondStudent.marks - firstStudent.marks;

        case "name-asc":
          return firstStudent.name.localeCompare(
            secondStudent.name
          );

        case "name-desc":
          return secondStudent.name.localeCompare(
            firstStudent.name
          );

        case "grade-desc":
          return (
            GRADE_ORDER[secondStudent.grade] -
            GRADE_ORDER[firstStudent.grade]
          );

        default:
          return 0;
      }
    }
  );

  const {
    totalStudents,
    averageMarks,
    totalSubjects,
    topGrade,
  } = getDashboardStats(students);

  return (
    <main className="dashboard">
      <section className="summary-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              Performance
            </span>

            <h2>Overview</h2>
          </div>

          <p>
            Monitor the latest academic performance
            statistics.
          </p>
        </div>

        <div className="summary-container">
          <SummaryCard
            title="Total Students"
            value={totalStudents}
          />

          <SummaryCard
            title="Average Marks"
            value={`${averageMarks}%`}
          />

          <SummaryCard
            title="Top Grade"
            value={topGrade}
          />

          <SummaryCard
            title="Subjects"
            value={totalSubjects}
          />
        </div>
      </section>

      <div
        className="student-form-wrapper"
        ref={formSectionRef}
      >
        <StudentForm
          key={editingStudent?.id ?? "new-student"}
          onAddStudent={handleAddStudent}
          editingStudent={editingStudent}
          onUpdateStudent={handleUpdateStudent}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <section className="students-section-wrapper">
        <div className="students-panel">
          <div className="students-panel-header">
            <div className="students-title-row">
              <div className="section-heading students-heading">
                <div>
                  <span className="section-label">
                    Records
                  </span>

                  <h2>Students</h2>
                </div>

                <p>
                  Showing {sortedStudents.length} of{" "}
                  {students.length} students
                </p>
              </div>
            </div>

            <div className="controls">
              <div className="control-group search-box">
                <label
                  htmlFor="student-search"
                  className="sr-only"
                >
                  Search students
                </label>

                <input
                  id="student-search"
                  type="search"
                  placeholder="Search by name or subject"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
              </div>

              <div className="control-group">
                <label
                  htmlFor="grade-filter"
                  className="sr-only"
                >
                  Filter by grade
                </label>

                <select
                  id="grade-filter"
                  value={selectedGrade}
                  onChange={(event) =>
                    setSelectedGrade(event.target.value)
                  }
                >
                  <option value="All">All Grades</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>

              <div className="control-group">
                <label
                  htmlFor="student-sort"
                  className="sr-only"
                >
                  Sort students
                </label>

                <select
                  id="student-sort"
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(event.target.value)
                  }
                >
                  <option value="marks-desc">
                    Marks: High to Low
                  </option>

                  <option value="marks-asc">
                    Marks: Low to High
                  </option>

                  <option value="name-asc">
                    Name: A to Z
                  </option>

                  <option value="name-desc">
                    Name: Z to A
                  </option>

                  <option value="grade-desc">
                    Grade: Highest First
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="students-section">
            {sortedStudents.length > 0 ? (
              sortedStudents.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              ))
            ) : (
              <div className="empty-message">
                <div
                  className="empty-icon"
                  aria-hidden="true"
                >
                  ⌕
                </div>

                <h3>No students found</h3>

                <p>
                  Try changing your search term, grade
                  filter, or sorting option.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ConfirmModal
        isOpen={Boolean(studentToDelete)}
        title="Delete Student"
        message={
          studentToDelete
            ? `Are you sure you want to delete "${studentToDelete.name}"? This action cannot be undone.`
            : ""
        }
        onCancel={cancelDeleteStudent}
        onConfirm={confirmDeleteStudent}
      />
    </main>
  );
}

export default Dashboard;