import { CalendarCheck, Check, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { attendance, student } from "../../data/mockData";

function TeacherAttendance() {
    const [selectedDate, setSelectedDate] = useState("30 Sep 2026");

    const classRecords = attendance.filter(
        (record) => record.date === selectedDate
    );

    const presentCount = classRecords.filter(
        (record) => record.status === "Present"
    ).length;

    const absentCount = classRecords.filter(
        (record) => record.status === "Absent"
    ).length;

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Class Management</p>
                            <h1>Attendance</h1>
                            <p>
                                Record and review student attendance.
                            </p>
                        </div>
                    </div>

                    <div className="teacher-attendance-toolbar">
                        <div className="attendance-date">
                            <CalendarCheck size={16} />

                            <div>
                                <span>Attendance date</span>

                                <input
                                    type="date"
                                    value="2026-09-30"
                                    onChange={() =>
                                        setSelectedDate("30 Sep 2026")
                                    }
                                />
                            </div>
                        </div>

                        <div className="attendance-class">
                            <span>Class</span>
                            <strong>CSE-A</strong>
                        </div>
                    </div>

                    <div className="attendance-overview">
                        <div className="attendance-main">
                            <span>Class attendance</span>
                            <strong>
                                {classRecords.length > 0
                                    ? Math.round(
                                          (presentCount /
                                              classRecords.length) *
                                              100
                                      )
                                    : 0}
                                %
                            </strong>
                            <p>{selectedDate}</p>
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
                            <span>Total</span>
                            <strong>{classRecords.length}</strong>
                        </div>
                    </div>

                    <div className="teacher-attendance-card">
                        <div className="card-header">
                            <div>
                                <h2>Student Attendance</h2>
                                <p>
                                    Mark attendance for students in CSE-A.
                                </p>
                            </div>
                        </div>

                        <div className="teacher-attendance-header">
                            <span>Student</span>
                            <span>Class</span>
                            <span>Status</span>
                            <span>Action</span>
                        </div>

                        <div className="teacher-attendance-row">
                            <div className="student-row-name">
                                <div className="mini-avatar">
                                    {student.name.charAt(0)}
                                </div>

                                <div>
                                    <h3>{student.name}</h3>
                                    <p>{student.email}</p>
                                </div>
                            </div>

                            <span>{student.className}</span>

                            <span className="attendance-status present">
                                <Check size={13} />
                                Present
                            </span>

                            <div className="attendance-actions">
                                <button className="attendance-action active">
                                    Present
                                </button>

                                <button className="attendance-action">
                                    Absent
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TeacherAttendance;