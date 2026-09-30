import { Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { assignments } from "../../data/mockData";

function StudentSubmissions() {
    const submissions = assignments.filter(
        (assignment) => assignment.status === "Submitted"
    );

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Academic Record</p>
                            <h1>Submissions</h1>
                            <p>
                                Review your submitted assignments and grades.
                            </p>
                        </div>
                    </div>

                    <div className="submission-summary">
                        <div>
                            <span>Total submitted</span>
                            <strong>{submissions.length}</strong>
                        </div>

                        <div>
                            <span>Graded</span>
                            <strong>1</strong>
                        </div>

                        <div>
                            <span>Pending review</span>
                            <strong>0</strong>
                        </div>
                    </div>

                    <div className="submission-page-card">
                        <div className="submission-table-header">
                            <span>Assignment</span>
                            <span>Subject</span>
                            <span>Submitted</span>
                            <span>Status</span>
                            <span>Marks</span>
                            <span></span>
                        </div>

                        {submissions.map((submission) => (
                            <div
                                className="submission-table-row"
                                key={submission.id}
                            >
                                <div className="submission-title">
                                    <FileText size={16} />
                                    <div>
                                        <h3>{submission.title}</h3>
                                        <p>{submission.description}</p>
                                    </div>
                                </div>

                                <span>{submission.subject}</span>

                                <span>18 Sep 2026</span>

                                <span className="status-badge success">
                                    Graded
                                </span>

                                <strong className="submission-marks">
                                    7 / 10
                                </strong>

                                <Link
                                    to={`/student/assignments/${submission.id}`}
                                    className="submission-view"
                                >
                                    <Eye size={14} />
                                    View
                                </Link>
                            </div>
                        ))}

                        {submissions.length === 0 && (
                            <div className="empty-state">
                                No submissions yet.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default StudentSubmissions;