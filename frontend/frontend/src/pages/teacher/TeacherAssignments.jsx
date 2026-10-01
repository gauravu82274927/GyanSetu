import { useState } from "react";
import { ArrowUpRight, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { assignments } from "../../data/mockData";

function TeacherAssignments() {
    const [filter, setFilter] = useState("All");

    const filteredAssignments =
        filter === "All"
            ? assignments
            : assignments.filter(
                  (assignment) => assignment.subject === filter
              );

    const subjects = [
        "All",
        ...new Set(assignments.map((assignment) => assignment.subject))
    ];

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <div className="page-header teacher-page-header">
                        <div>
                            <p className="welcome-label">Academic Work</p>
                            <h1>Assignments</h1>
                            <p>
                                Create, manage and review assignments for your
                                students.
                            </p>
                        </div>

                        <Link
                            to="/teacher/assignments/create"
                            className="primary-button create-assignment-button"
                        >
                            <Plus size={15} />
                            Create assignment
                        </Link>
                    </div>

                    <div className="assignment-toolbar">
                        <div className="assignment-count">
                            {filteredAssignments.length} assignments
                        </div>

                        <div className="filter-group">
                            <Filter size={15} />

                            {subjects.map((subject) => (
                                <button
                                    key={subject}
                                    className={
                                        filter === subject
                                            ? "filter-button active"
                                            : "filter-button"
                                    }
                                    onClick={() => setFilter(subject)}
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="assignment-page-card">
                        <div className="teacher-assignment-header">
                            <span>Assignment</span>
                            <span>Subject</span>
                            <span>Class</span>
                            <span>Due date</span>
                            <span></span>
                        </div>

                        {filteredAssignments.map((assignment) => (
                            <div
                                className="teacher-assignment-row"
                                key={assignment.id}
                            >
                                <div>
                                    <h3>{assignment.title}</h3>
                                    <p>{assignment.description}</p>
                                </div>

                                <span>{assignment.subject}</span>

                                <span>{assignment.className}</span>

                                <span>{assignment.dueDate}</span>

                                <Link
                                    to={`/teacher/assignments/${assignment.id}`}
                                    className="assignment-open"
                                >
                                    Open
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        ))}

                        {filteredAssignments.length === 0 && (
                            <div className="empty-state">
                                No assignments found.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TeacherAssignments;