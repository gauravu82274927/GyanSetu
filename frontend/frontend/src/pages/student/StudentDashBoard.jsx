import {
    ClipboardList,
    Clock3,
    CheckCircle2,
    CalendarDays,
    ArrowUpRight
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { assignments, attendance, student } from "../../data/mockData";
import { Link } from "react-router-dom";

function StudentDashboard() {
    const pendingAssignments = assignments.filter(
        (assignment) => assignment.status === "Pending"
    );

    const submittedAssignments = assignments.filter(
        (assignment) => assignment.status === "Submitted"
    );

    const upcomingAssignments = [...pendingAssignments]
        .slice(0, 3);

    const presentCount = attendance.filter(
        (record) => record.status === "Present"
    ).length;

    const attendancePercentage =
        attendance.length > 0
            ? Math.round((presentCount / attendance.length) * 100)
            : 0;

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="dashboard-content">

                    {/* Header */}

                    <div className="welcome-section">
                        <p className="welcome-label">
                            Student Overview
                        </p>

                        <h1>
                            {student.name}
                        </h1>

                        <p>
                            {student.className} · Computer Science Engineering
                        </p>
                    </div>

                    {/* Academic Summary */}

                    <div className="stats-grid">

                        <div className="stat-card">
                            <p className="stat-title">
                                Assignments
                            </p>

                            <h3>
                                {assignments.length}
                            </h3>

                            <p className="stat-description">
                                Total assigned
                            </p>
                        </div>

                        <div className="stat-card">
                            <p className="stat-title">
                                Pending
                            </p>

                            <h3>
                                {pendingAssignments.length}
                            </h3>

                            <p className="stat-description">
                                Need your attention
                            </p>
                        </div>

                        <div className="stat-card">
                            <p className="stat-title">
                                Submitted
                            </p>

                            <h3>
                                {submittedAssignments.length}
                            </h3>

                            <p className="stat-description">
                                Completed
                            </p>
                        </div>

                        <div className="stat-card">
                            <p className="stat-title">
                                Attendance
                            </p>

                            <h3>
                                {attendancePercentage}%
                            </h3>

                            <p className="stat-description">
                                Current record
                            </p>
                        </div>

                    </div>

                    {/* Main Grid */}

                    <div className="dashboard-grid">

                        {/* Assignments */}

                        <section className="content-card">

                            <div className="card-header">

                                <div>
                                    <h2>
                                        Assignments
                                    </h2>

                                    <p>
                                        Your current academic tasks
                                    </p>
                                </div>

                                <Link
                                    to="/student/assignments"
                                    className="view-link"
                                >
                                    View all
                                    <ArrowUpRight size={15} />
                                </Link>

                            </div>

                            <div className="assignment-list">

                                {assignments.map((assignment) => (
                                    <div
                                        className="assignment-row"
                                        key={assignment.id}
                                    >

                                        <div>
                                            <h3>
                                                {assignment.title}
                                            </h3>

                                            <p>
                                                {assignment.subject}
                                                {" · "}
                                                Due {assignment.dueDate}
                                            </p>
                                        </div>

                                        <span
                                            className={`status-badge ${
                                                assignment.status ===
                                                "Submitted"
                                                    ? "success"
                                                    : "warning"
                                            }`}
                                        >
                                            {assignment.status}
                                        </span>

                                    </div>
                                ))}

                            </div>

                        </section>

                        {/* Right Column */}

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}
                        >

                            {/* Upcoming */}

                            <section className="content-card">

                                <div className="card-header">

                                    <div>
                                        <h2>
                                            Upcoming
                                        </h2>

                                        <p>
                                            Deadlines to keep in mind
                                        </p>
                                    </div>

                                </div>

                                {upcomingAssignments.length === 0 ? (
                                    <p
                                        style={{
                                            color: "#858984",
                                            fontSize: "12px",
                                            paddingTop: "15px"
                                        }}
                                    >
                                        No upcoming assignments.
                                    </p>
                                ) : (
                                    upcomingAssignments.map(
                                        (assignment) => (
                                            <div
                                                key={assignment.id}
                                                className="summary-item"
                                            >
                                                <span>
                                                    {assignment.title}
                                                </span>

                                                <strong>
                                                    {assignment.dueDate}
                                                </strong>
                                            </div>
                                        )
                                    )
                                )}

                            </section>

                            {/* Recent Activity */}

                            <section className="content-card">

                                <div className="card-header">

                                    <div>
                                        <h2>
                                            Recent Activity
                                        </h2>

                                        <p>
                                            Latest academic updates
                                        </p>
                                    </div>

                                </div>

                                <div className="summary-item">
                                    <span>
                                        Java Basics
                                    </span>

                                    <strong>
                                        Graded · 7/10
                                    </strong>
                                </div>

                                <div className="summary-item">
                                    <span>
                                        DBMS Assignment
                                    </span>

                                    <strong>
                                        Pending
                                    </strong>
                                </div>

                                <div className="summary-item">
                                    <span>
                                        Attendance
                                    </span>

                                    <strong>
                                        {attendancePercentage}%
                                    </strong>
                                </div>

                            </section>

                        </div>

                    </div>

                </section>
            </main>
        </div>
    );
}

export default StudentDashboard;