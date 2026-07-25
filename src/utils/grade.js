export const calculateGrade = (marks) => {
  const numericMarks = Number(marks);

  if (Number.isNaN(numericMarks)) {
    return "";
  }

  if (numericMarks >= 90) {
    return "A+";
  }

  if (numericMarks >= 80) {
    return "A";
  }

  if (numericMarks >= 70) {
    return "B+";
  }

  if (numericMarks >= 60) {
    return "B";
  }

  return "C";
};