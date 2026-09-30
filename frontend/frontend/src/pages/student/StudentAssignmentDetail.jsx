import { ArrowLeft, CalendarDays, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { assignments } from "../../data/mockData";

function StudentAssignmentDetail() {
    const { id } = useParams();

    const assignment = assignments.find(
        (item) => String(item.id) === String(id)
    );

    if (!assignment) {
        return (
            <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                    <Topbar />

                    <section className="page-content">
                        <div className="empty-state">
                            Assignment not found.
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    const isSubmitted = assignment.status === "Submitted";

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <Link to="/student/assignments" className="back-link">
                        <ArrowLeft size={15} />
                        Back to assignments
                    </Link>

                    <div className="assignment-detail-header">
                        <div>
                            <p className="welcome-label">Assignment</p>
                            <h1>{assignment.title}</h1>
                            <p>{assignment.subject} · {assignment.className}</p>
                        </div>

                        <span
                            className={`status-badge ${
                                isSubmitted ? "success" : "warning"
                            }`}
                        >
                            {assignment.status}
                        </span>
                    </div>

                    <div className="assignment-detail-grid">
                        <section className="content-card assignment-description-card">
                            <div className="card-header">
                                <div>
                                    <h2>Instructions</h2>
                                    <p>Assignment details</p>
                                </div>
                                <FileText size={18} />
                            </div>

                            <p className="assignment-description">
                                {assignment.description}
                            </p>
                        </section>

                        <aside className="content-card assignment-info-card">
                            <div className="card-header">
                                <div>
                                    <h2>Details</h2>
                                    <p>Submission information</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <span>Subject</span>
                                <strong>{assignment.subject}</strong>
                            </div>

                            <div className="detail-item">
                                <span>Class</span>
                                <strong>{assignment.className}</strong>
                            </div>

                            <div className="detail-item">
                                <span>Due date</span>
                                <strong>
                                    <CalendarDays size={14} />
                                    {assignment.dueDate}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Status</span>
                                <strong>{assignment.status}</strong>
                            </div>
                        </aside>
                    </div>

                    <section className="content-card submission-card">
                        <div className="card-header">
                            <div>
                                <h2>{isSubmitted ? "Submission" : "Submit Assignment"}</h2>
                                <p>
                                    {isSubmitted
                                        ? "Your response has already been submitted."
                                        : "Submit your answer before the deadline."}
                                </p>
                            </div>
                        </div>

                        {isSubmitted ? (
                            <div className="submission-result">
                                <div>
                                    <span>Grade</span>
                                    <strong>7 / 10</strong>
                                </div>

                                <div>
                                    <span>Status</span>
                                    <strong>Graded</strong>
                                </div>
                            </div>
                        ) : (
                            <div className="submission-form">
                                <textarea
                                    placeholder="Write your answer here..."
                                    rows="7"
                                />

                                <div className="submission-actions">
                                    <button className="primary-button">
                                        Submit Assignment
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </section>
            </main>
        </div>
    );
}

export default StudentAssignmentDetail;