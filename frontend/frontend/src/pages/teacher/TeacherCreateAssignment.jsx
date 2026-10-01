import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function TeacherCreateAssignment() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "Java",
        className: "CSE-A",
        dueDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend demo mode
        console.log("Assignment created:", formData);

        navigate("/teacher/assignments");
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <Link
                        to="/teacher/assignments"
                        className="back-link"
                    >
                        <ArrowLeft size={15} />
                        Back to assignments
                    </Link>

                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Academic Work</p>
                            <h1>Create Assignment</h1>
                            <p>
                                Create a new assignment for your students.
                            </p>
                        </div>
                    </div>

                    <form
                        className="assignment-form-card"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-section">
                            <div className="form-section-heading">
                                <h2>Assignment details</h2>
                                <p>
                                    Provide the basic information students
                                    need.
                                </p>
                            </div>

                            <div className="form-field">
                                <label htmlFor="title">
                                    Assignment title
                                </label>

                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="e.g. Java OOP Assignment"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="description">
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    rows="6"
                                    placeholder="Describe the assignment and what students need to complete."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-heading">
                                <h2>Class information</h2>
                                <p>
                                    Select the subject and class receiving
                                    this assignment.
                                </p>
                            </div>

                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="subject">
                                        Subject
                                    </label>

                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="Java">Java</option>
                                        <option value="DBMS">DBMS</option>
                                        <option value="Data Structures">
                                            Data Structures
                                        </option>
                                        <option value="Operating Systems">
                                            Operating Systems
                                        </option>
                                    </select>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="className">
                                        Class
                                    </label>

                                    <select
                                        id="className"
                                        name="className"
                                        value={formData.className}
                                        onChange={handleChange}
                                    >
                                        <option value="CSE-A">CSE-A</option>
                                        <option value="CSE-B">CSE-B</option>
                                        <option value="10th">10th</option>
                                    </select>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="dueDate">
                                        Due date
                                    </label>

                                    <div className="input-with-icon">
                                        <CalendarDays size={15} />

                                        <input
                                            id="dueDate"
                                            name="dueDate"
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Link
                                to="/teacher/assignments"
                                className="secondary-button"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Create assignment
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default TeacherCreateAssignment;