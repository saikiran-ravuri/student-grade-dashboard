import "./StudentRow.css";

function StudentRow({ student }) {

    const getBadgeColor = (marks) => {

        if (marks >= 90) return "excellent";

        if (marks >= 80) return "good";

        if (marks >= 70) return "average";

        return "poor";
    };

    return (

        <div className="student-row">

            <div className="student-header">

                <h3>{student.name}</h3>

                <span
                    className={`grade-badge ${getBadgeColor(student.marks)}`}
                >
                    {student.grade}
                </span>

            </div>

            <div className="student-info">

                <span>{student.subject}</span>

                <span>{student.marks} Marks</span>

            </div>

        </div>

    );

}

export default StudentRow;