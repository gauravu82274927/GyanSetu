import { Search, UserRound } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { student } from "../../data/mockData";

function TeacherStudents() {
    const [search, setSearch] = useState("");

    const students = [
        student,
        {
            id: 2,
            name: "Aarav Sharma",
            email: "aarav@gyansetu.com",
            className: "CSE-A",
            isActive: true
        },
        {
            id: 3,
            name: "Priya Singh",
            email: "priya@gyansetu.com",
            className: "CSE-A",
            isActive: true
        },
        {
            id: 4,
            name: "Rohan Verma",
            email: "rohan@gyansetu.com",
            className: "CSE-A",
            isActive: false
        }
    ];

    const filteredStudents = students.filter((item) => {
        const query = search.toLowerCase();

        return (
            item.name.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query)
        );
    });

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Class Management</p>
                            <h1>Students</h1>
                            <p>
                                View and manage students in your classes.
                            </p>
                        </div>
                    </div>

                    <div className="student-toolbar">
                        <div className="student-count">
                            {filteredStudents.length} students
                        </div>

                        <div className="student-search">
                            <Search size={15} />

                            <input
                                type="text"
                                placeholder="Search students..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="students-page-card">
                        <div className="students-table-header">
                            <span>Student</span>
                            <span>Email</span>
                            <span>Class</span>
                            <span>Status</span>
                        </div>

                        {filteredStudents.map((item) => (
                            <div
                                className="students-table-row"
                                key={item.id}
                            >
                                <div className="student-row-name">
                                    <div className="mini-avatar">
                                        {item.name.charAt(0)}
                                    </div>

                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>Student</p>
                                    </div>
                                </div>

                                <span>{item.email}</span>

                                <span>{item.className}</span>

                                <span
                                    className={
                                        item.isActive
                                            ? "student-active"
                                            : "student-inactive"
                                    }
                                >
                                    <UserRound size={13} />
                                    {item.isActive
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>
                        ))}

                        {filteredStudents.length === 0 && (
                            <div className="empty-state">
                                No students found.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TeacherStudents;