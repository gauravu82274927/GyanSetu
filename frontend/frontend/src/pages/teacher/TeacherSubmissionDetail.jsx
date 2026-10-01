import { ArrowLeft, FileText } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { submissions } from "../../data/mockData";

function TeacherSubmissionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const submission = submissions.find(
        (item) => String(item.id) === String(id)
    );

    const [marks, setMarks] = useState(
        submission?.marks !== null && submission?.marks !== undefined
            ? submission.marks
            : ""
    );

    const [feedback, setFeedback] = useState("");

    if (!submission) {
        return (
            <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                    <Topbar />

                    <section className="page-content">
                        <div className="empty-state">
                            Submission not found.
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    const handleGrade = (e) => {
        e.preventDefault();

        console.log("Submission graded:", {
            submissionId: submission.id,
            marks,
            feedback
        });

        navigate("/teacher/submissions");
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <Link
                        to="/teacher/submissions"
                        className="back-link"
                    >
                        <ArrowLeft size={15} />
                        Back to submissions
                    </Link>

                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Student Work</p>
                            <h1>Review Submission</h1>
                            <p>
                                Review the student's answer and assign marks.
                            </p>
                        </div>
                    </div>

                    <div className="review-layout">
                        <div>
                            <section className="content-card">
                                <div className="card-header">
                                    <div>
                                        <h2>Submission</h2>
                                        <p>
                                            {submission.assignmentTitle}
                                        </p>
                                    </div>

                                    <FileText size={18} />
                                </div>

                                <div className="student-submission-info">
                                    <div>
                                        <span>Student</span>
                                        <strong>
                                            {submission.studentName ||
                                                "Test Student"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Class</span>
                                        <strong>
                                            {submission.className || "CSE-A"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Subject</span>
                                        <strong>
                                            {submission.subject}
                                        </strong>
                                    </div>
                                </div>

                                <div className="answer-section">
                                    <p className="answer-label">
                                        Student answer
                                    </p>

                                    <div className="student-answer">
                                        {submission.answer ||
                                            "No answer provided."}
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section className="content-card grading-card">
                            <div className="card-header">
                                <div>
                                    <h2>Grade</h2>
                                    <p>Evaluate this submission</p>
                                </div>
                            </div>

                            <form onSubmit={handleGrade}>
                                <div className="form-field">
                                    <label htmlFor="marks">
                                        Marks
                                    </label>

                                    <input
                                        id="marks"
                                        type="number"
                                        min="0"
                                        max="10"
                                        placeholder="0 - 10"
                                        value={marks}
                                        onChange={(e) =>
                                            setMarks(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="feedback">
                                        Feedback
                                    </label>

                                    <textarea
                                        id="feedback"
                                        rows="6"
                                        placeholder="Add feedback for the student..."
                                        value={feedback}
                                        onChange={(e) =>
                                            setFeedback(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="primary-button grade-button"
                                >
                                    Save grade
                                </button>
                            </form>
                        </section>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TeacherSubmissionDetail;