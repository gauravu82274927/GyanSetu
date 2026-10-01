import { Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { submissions } from "../../data/mockData";

function TeacherSubmissions() {
    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Student Work</p>
                            <h1>Submissions</h1>
                            <p>
                                Review student submissions and assign marks.
                            </p>
                        </div>
                    </div>

                    <div className="submission-summary">
                        <div>
                            <span>Total submissions</span>
                            <strong>{submissions.length}</strong>
                        </div>

                        <div>
                            <span>Graded</span>
                            <strong>
                                {
                                    submissions.filter(
                                        (item) => item.status === "Graded"
                                    ).length
                                }
                            </strong>
                        </div>

                        <div>
                            <span>To review</span>
                            <strong>
                                {
                                    submissions.filter(
                                        (item) => item.status === "Submitted"
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>

                    <div className="submission-page-card">
                        <div className="teacher-submission-header">
                            <span>Student</span>
                            <span>Assignment</span>
                            <span>Subject</span>
                            <span>Submitted</span>
                            <span>Status</span>
                            <span>Marks</span>
                            <span></span>
                        </div>

                        {submissions.map((submission) => (
                            <div
                                className="teacher-submission-row"
                                key={submission.id}
                            >
                                <div className="submission-student">
                                    <div className="mini-avatar">
                                        {submission.studentName
                                            ? submission.studentName.charAt(0)
                                            : "S"}
                                    </div>

                                    <div>
                                        <h3>
                                            {submission.studentName ||
                                                "Test Student"}
                                        </h3>
                                        <p>
                                            {submission.className || "CSE-A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="submission-title">
                                    <FileText size={15} />
                                    <span>{submission.assignmentTitle}</span>
                                </div>

                                <span>{submission.subject}</span>

                                <span>18 Sep 2026</span>

                                <span
                                    className={`status-badge ${
                                        submission.status === "Graded"
                                            ? "success"
                                            : "warning"
                                    }`}
                                >
                                    {submission.status}
                                </span>

                                <strong className="submission-marks">
                                    {submission.marks !== null &&
                                    submission.marks !== undefined
                                        ? `${submission.marks}/10`
                                        : "—"}
                                </strong>

                                <Link
                                    to={`/teacher/submissions/${submission.id}`}
                                    className="submission-view"
                                >
                                    <Eye size={14} />
                                    Review
                                </Link>
                            </div>
                        ))}

                        {submissions.length === 0 && (
                            <div className="empty-state">
                                No submissions available.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TeacherSubmissions;