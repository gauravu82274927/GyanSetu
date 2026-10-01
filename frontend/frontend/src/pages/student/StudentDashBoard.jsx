import { useEffect, useState } from "react";
import api from "../../api";

import {
    ArrowUpRight
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";

function StudentDashboard() {
    const [studentData, setStudentData] = useState(null);
    const [assignmentData, setAssignmentData] = useState([]);
    const [submissionData, setSubmissionData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const studentResponse = await api.get(
                    "/auth/me/student"
                );

                const currentStudent = studentResponse.data;

                setStudentData(currentStudent);

                const [
                    assignmentResponse,
                    submissionResponse,
                    attendanceResponse
                ] = await Promise.all([
                    api.get(
                        `/assignments/class/${currentStudent.className}`
                    ),
                    api.get(
                        `/submissions/student/${currentStudent._id}`
                    ),
                    api.get(
                        `/attendance/student/${currentStudent._id}`
                    )
                ]);

                // Make sure every piece of data is stored as an array
                setAssignmentData(
                    Array.isArray(assignmentResponse.data)
                        ? assignmentResponse.data
                        : assignmentResponse.data?.assignments || []
                );

                setSubmissionData(
                    Array.isArray(submissionResponse.data)
                        ? submissionResponse.data
                        : submissionResponse.data?.submissions || []
                );

                setAttendanceData(
                    Array.isArray(attendanceResponse.data)
                        ? attendanceResponse.data
                        : attendanceResponse.data?.attendance || []
                );

            } catch (error) {
                console.error(
                    "Dashboard loading failed:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="page-content">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    const totalAssignments = assignmentData.length;

    const submittedAssignmentIds = new Set(
        submissionData.map(
            (submission) =>
                submission.assignmentId?._id ||
                submission.assignmentId
        )
    );

    const submittedCount = assignmentData.filter(
        (assignment) =>
            submittedAssignmentIds.has(assignment._id)
    ).length;

    const pendingCount =
        totalAssignments - submittedCount;

    const attendancePercentage =
        attendanceData.length > 0
            ? Math.round(
                  (attendanceData.filter(
                      (record) =>
                          record.status === "Present"
                  ).length /
                      attendanceData.length) *
                      100
              )
            : 0;

    const upcomingAssignments = [...assignmentData]
        .filter(
            (assignment) =>
                new Date(assignment.dueDate) >= new Date()
        )
        .sort(
            (a, b) =>
                new Date(a.dueDate) -
                new Date(b.dueDate)
        )
        .slice(0, 3);

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
                            {studentData?.name || "Student"}
                        </h1>

                        <p>
                            {studentData?.className || "—"}{" "}
                            · Computer Science Engineering
                        </p>
                    </div>

                    {/* Academic Summary */}

                    <div className="stats-grid">

                        <div className="stat-card">
                            <p className="stat-title">
                                Assignments
                            </p>

                            <h3>
                                {totalAssignments}
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
                                {pendingCount}
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
                                {submittedCount}
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

                                {assignmentData.length === 0 ? (
                                    <p
                                        style={{
                                            color: "#858984",
                                            fontSize: "12px",
                                            paddingTop: "15px"
                                        }}
                                    >
                                        No assignments available.
                                    </p>
                                ) : (
                                    assignmentData
                                        .slice(0, 4)
                                        .map((assignment) => {
                                            const isSubmitted =
                                                submittedAssignmentIds.has(
                                                    assignment._id
                                                );

                                            return (
                                                <div
                                                    className="assignment-row"
                                                    key={assignment._id}
                                                >
                                                    <div>
                                                        <h3>
                                                            {assignment.title}
                                                        </h3>

                                                        <p>
                                                            {assignment.subject}
                                                            {" · "}
                                                            Due{" "}
                                                            {new Date(
                                                                assignment.dueDate
                                                            ).toLocaleDateString(
                                                                "en-GB",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                }
                                                            )}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`status-badge ${
                                                            isSubmitted
                                                                ? "success"
                                                                : "warning"
                                                        }`}
                                                    >
                                                        {isSubmitted
                                                            ? "Submitted"
                                                            : "Pending"}
                                                    </span>
                                                </div>
                                            );
                                        })
                                )}

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
                                                key={assignment._id}
                                                className="summary-item"
                                            >
                                                <span>
                                                    {assignment.title}
                                                </span>

                                                <strong>
                                                    {new Date(
                                                        assignment.dueDate
                                                    ).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "2-digit",
                                                            month: "short"
                                                        }
                                                    )}
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

                                {submissionData.length === 0 ? (
                                    <div className="summary-item">
                                        <span>
                                            No submissions yet
                                        </span>

                                        <strong>
                                            —
                                        </strong>
                                    </div>
                                ) : (
                                    submissionData
                                        .slice(0, 3)
                                        .map((submission) => (
                                            <div
                                                className="summary-item"
                                                key={submission._id}
                                            >
                                                <span>
                                                    {submission.assignmentId?.title ||
                                                        "Assignment"}
                                                </span>

                                                <strong>
                                                    {submission.status ===
                                                    "Graded"
                                                        ? `Graded · ${
                                                              submission.marks ??
                                                              0
                                                          }/10`
                                                        : "Submitted"}
                                                </strong>
                                            </div>
                                        ))
                                )}

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