export function getDashboardStats(students) {
    const totalStudents = students.length;

    const totalMarks = students.reduce(
        (sum, student) => sum + student.marks,
        0
    );

    const averageMarks =
        totalStudents > 0
            ? Math.round(totalMarks / totalStudents)
            : 0;

    const totalSubjects = new Set(
        students.map(student => student.subject)
    ).size;

    const highestMarks =
        totalStudents > 0
            ? Math.max(...students.map(student => student.marks))
            : 0;

    const topStudent = students.find(
        student => student.marks === highestMarks
    );

    return {
        totalStudents,
        averageMarks,
        totalSubjects,
        topGrade: topStudent ? topStudent.grade : "N/A"
    };
}