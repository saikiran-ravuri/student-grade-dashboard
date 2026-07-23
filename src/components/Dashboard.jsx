import "./Dashboard.css";

import students from "../data/students";

import SummaryCard from "./SummaryCard";
import StudentRow from "./StudentRow";

import { getDashboardStats } from "../utils/statistics";

function Dashboard() {

    const {
        totalStudents,
        averageMarks,
        totalSubjects,
        topGrade
    } = getDashboardStats(students);

    return (
        <main className="dashboard">

            <section>

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

            <section>

                <h2>Students</h2>

                <div className="students-section">

                    {
                        students.length > 0 ?

                            students.map(student => (

                                <StudentRow
                                    key={student.id}
                                    student={student}
                                />

                            ))

                            :

                            <p className="empty-message">

                                No students available.

                            </p>

                    }

                </div>

            </section>

        </main>
    );

}

export default Dashboard;