export function getDashboardStats(students) {
  const totalStudents = students.length;

  const totalSubjects = new Set(students.map((student) => student.subject))
    .size;

  const averageMarks =
    totalStudents === 0
      ? 0
      : Math.round(
          students.reduce((sum, student) => sum + student.marks, 0) /
            totalStudents,
        );

  const gradePriority = ["A+", "A", "B+", "B", "C"];

  let topGrade = "-";

  for (const grade of gradePriority) {
    if (students.some((student) => student.grade === grade)) {
      topGrade = grade;
      break;
    }
  }

  return {
    totalStudents,
    averageMarks,
    totalSubjects,
    topGrade,
  };
}
