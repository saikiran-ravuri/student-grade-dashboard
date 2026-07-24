import { useState } from "react";

import "./Dashboard.css";

import initialStudents from "../data/students";
import StudentForm from "./StudentForm";
import SummaryCard from "./SummaryCard";
import StudentRow from "./StudentRow";
import { getDashboardStats } from "../utils/statistics";

function Dashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [sortOption, setSortOption] = useState("marks-desc");

  function handleAddStudent(newStudent) {
    setStudents((currentStudents) => [
      ...currentStudents,
      newStudent,
    ]);
  }

  const filteredStudents = students.filter((student) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchesSearch =
      normalizedSearch === "" ||
      student.name.toLowerCase().includes(normalizedSearch) ||
      student.subject.toLowerCase().includes(normalizedSearch);

    const matchesGrade =
      selectedGrade === "All" ||
      student.grade === selectedGrade;

    return matchesSearch && matchesGrade;
  });

  const sortedStudents = [...filteredStudents].sort(
    (studentA, studentB) => {
      switch (sortOption) {
        case "name-asc":
          return studentA.name.localeCompare(studentB.name);

        case "name-desc":
          return studentB.name.localeCompare(studentA.name);

        case "marks-asc":
          return studentA.marks - studentB.marks;

        case "marks-desc":
          return studentB.marks - studentA.marks;

        case "grade-desc": {
          const gradeOrder = {
            "A+": 5,
            A: 4,
            "B+": 3,
            B: 2,
            C: 1,
          };

          return (
            (gradeOrder[studentB.grade] ?? 0) -
            (gradeOrder[studentA.grade] ?? 0)
          );
        }

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
        <h2>Overview</h2>

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

      <StudentForm onAddStudent={handleAddStudent} />

      <section className="students-section-wrapper">
        <div className="students-section-header">
          <div>
            <h2>Students</h2>

            <p>
              Showing {sortedStudents.length} of {students.length} students
            </p>
          </div>

          <div className="controls">
            <div className="search-box">
              <label htmlFor="student-search" className="sr-only">
                Search students
              </label>

              <input
                id="student-search"
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search by name or subject"
              />
            </div>

            <div className="filter-box">
              <label htmlFor="grade-filter" className="sr-only">
                Filter students by grade
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

            <div className="filter-box sort-box">
              <label htmlFor="student-sort" className="sr-only">
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
              />
            ))
          ) : (
            <div className="empty-message">
              <h3>No students found</h3>
              <p>
                Try changing the search text or selected grade.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;