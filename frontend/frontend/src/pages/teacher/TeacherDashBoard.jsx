import { ArrowUpRight, ClipboardList, Users, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { assignments, submissions, student } from "../../data/mockData";
function TeacherDashboard() {
    const pendingGrading = submissions.filter(
        (submission) => submission.status === "Submitted"
    );

    const gradedSubmissions = submissions.filter(
        (submission) => submission.status === "Graded"
    );

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="dashboard-content">
                    <div className="welcome-section">
                        <p className="welcome-label">Teacher Overview</p>
                        <h1>Welcome back</h1>
                        <p>Manage your classes, assignments and student work.</p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <p className="stat-title">Assignments</p>
                            <h3>{assignments.length}</h3>
                            <p className="stat-description">
                                Created assignments
                            </p>
                        </div>

                        <div className="stat-card">
                            <p className="stat-title">Students</p>
                            <h3>{student ? 1 : 0}</h3>
                            <p className="stat-description">
                                Active students
                            </p>
                        </div>

                        <div className="stat-card">
                            <p className="stat-title">To Grade</p>
                            <h3>{pendingGrading.length}</h3>
                            <p className="stat-description">
                                Awaiting review
                            </p>
                        </div>

                        <div className="stat-card">
                            <p className="stat-title">Graded</p>
                            <h3>{gradedSubmissions.length}</h3>
                            <p className="stat-description">
                                Completed reviews
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <section className="content-card">
                            <div className="card-header">
                                <div>
                                    <h2>Recent Assignments</h2>
                                    <p>Your latest academic work</p>
                                </div>

                                <Link
                                    to="/teacher/assignments"
                                    className="view-link"
                                >
                                    View all
                                    <ArrowUpRight size={15} />
                                </Link>
                            </div>

                            <div className="assignment-list">
                                {assignments.slice(0, 4).map((assignment) => (
                                    <div
                                        className="assignment-row"
                                        key={assignment.id}
                                    >
                                        <div>
                                            <h3>{assignment.title}</h3>
                                            <p>
                                                {assignment.subject} ·{" "}
                                                {assignment.className}
                                            </p>
                                        </div>

                                        <span className="status-badge success">
                                            Active
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}
                        >
                            <section className="content-card">
                                <div className="card-header">
                                    <div>
                                        <h2>Quick Actions</h2>
                                        <p>Common teacher tasks</p>
                                    </div>
                                </div>

                                <Link
                                    to="/teacher/assignments/create"
                                    className="teacher-action"
                                >
                                    <ClipboardList size={16} />
                                    <span>Create assignment</span>
                                    <ArrowUpRight size={14} />
                                </Link>

                                <Link
                                    to="/teacher/students"
                                    className="teacher-action"
                                >
                                    <Users size={16} />
                                    <span>View students</span>
                                    <ArrowUpRight size={14} />
                                </Link>

                                <Link
                                    to="/teacher/submissions"
                                    className="teacher-action"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>Review submissions</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            </section>

                            <section className="content-card">
                                <div className="card-header">
                                    <div>
                                        <h2>Grading</h2>
                                        <p>Submission overview</p>
                                    </div>
                                </div>

                                <div className="summary-item">
                                    <span>Awaiting review</span>
                                    <strong>{pendingGrading.length}</strong>
                                </div>

                                <div className="summary-item">
                                    <span>Graded</span>
                                    <strong>{gradedSubmissions.length}</strong>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TeacherDashboard;