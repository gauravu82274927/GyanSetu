import { CalendarDays, Check, X } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { attendance } from "../../data/mockData";

function StudentAttendance() {
    const presentCount = attendance.filter(
        (record) => record.status === "Present"
    ).length;

    const absentCount = attendance.filter(
        (record) => record.status === "Absent"
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

                <section className="page-content">
                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Academic Record</p>
                            <h1>Attendance</h1>
                            <p>
                                Track your attendance record and class participation.
                            </p>
                        </div>
                    </div>

                    <div className="attendance-overview">
                        <div className="attendance-main">
                            <span>Overall attendance</span>
                            <strong>{attendancePercentage}%</strong>
                            <p>Current academic record</p>
                        </div>

                        <div className="attendance-stat">
                            <span>Present</span>
                            <strong>{presentCount}</strong>
                        </div>

                        <div className="attendance-stat">
                            <span>Absent</span>
                            <strong>{absentCount}</strong>
                        </div>

                        <div className="attendance-stat">
                            <span>Total classes</span>
                            <strong>{attendance.length}</strong>
                        </div>
                    </div>

                    <div className="attendance-card">
                        <div className="card-header">
                            <div>
                                <h2>Attendance Record</h2>
                                <p>Recent class attendance</p>
                            </div>

                            <CalendarDays size={18} />
                        </div>

                        <div className="attendance-table-header">
                            <span>Date</span>
                            <span>Class</span>
                            <span>Status</span>
                        </div>

                        {attendance.map((record) => (
                            <div
                                className="attendance-row"
                                key={record.id}
                            >
                                <span>{record.date}</span>

                                <span>{record.className}</span>

                                <span
                                    className={`attendance-status ${
                                        record.status === "Present"
                                            ? "present"
                                            : "absent"
                                    }`}
                                >
                                    {record.status === "Present" ? (
                                        <Check size={13} />
                                    ) : (
                                        <X size={13} />
                                    )}

                                    {record.status}
                                </span>
                            </div>
                        ))}

                        {attendance.length === 0 && (
                            <div className="empty-state">
                                No attendance records available.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default StudentAttendance;