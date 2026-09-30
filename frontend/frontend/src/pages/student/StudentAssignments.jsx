import { useState } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { assignments } from "../../data/mockData";

function StudentAssignments() {
    const [filter, setFilter] = useState("All");

    const filteredAssignments =
        filter === "All"
            ? assignments
            : assignments.filter(
                  (assignment) => assignment.status === filter
              );

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">

                    <div className="page-header">
                        <div>
                            <p className="welcome-label">
                                Academic Work
                            </p>

                            <h1>Assignments</h1>

                            <p>
                                View your assignments, deadlines and submission status.
                            </p>
                        </div>
                    </div>

                    <div className="assignment-toolbar">
                        <div className="assignment-count">
                            {filteredAssignments.length} assignments
                        </div>

                        <div className="filter-group">
                            <Filter size={15} />

                            {["All", "Pending", "Submitted"].map(
                                (option) => (
                                    <button
                                        key={option}
                                        className={
                                            filter === option
                                                ? "filter-button active"
                                                : "filter-button"
                                        }
                                        onClick={() =>
                                            setFilter(option)
                                        }
                                    >
                                        {option}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className="assignment-page-card">

                        <div className="assignment-table-header">
                            <span>Assignment</span>
                            <span>Subject</span>
                            <span>Due date</span>
                            <span>Status</span>
                            <span></span>
                        </div>

                        {filteredAssignments.map(
                            (assignment) => (
                                <div
                                    className="assignment-table-row"
                                    key={assignment.id}
                                >
                                    <div>
                                        <h3>
                                            {assignment.title}
                                        </h3>

                                        <p>
                                            {assignment.description}
                                        </p>
                                    </div>

                                    <span>
                                        {assignment.subject}
                                    </span>

                                    <span>
                                        {assignment.dueDate}
                                    </span>

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

                                    <button className="assignment-open">
                                        Open
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            )
                        )}

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

export default StudentAssignments;