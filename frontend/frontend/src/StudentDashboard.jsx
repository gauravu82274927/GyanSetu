import { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [answers, setAnswers] = useState({});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const getStudentId = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));

        return payload.id;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const studentId = getStudentId();

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const assignmentResponse = await axios.get(
                    "http://localhost:3000/api/assignments/class/CSE-A",
                    config
                );

                const submissionResponse = await axios.get(
                    `http://localhost:3000/api/submissions/student/${studentId}`,
                    config
                );

                const attendanceResponse = await axios.get(
                    `http://localhost:3000/api/attendance/student/${studentId}`,
                    config
                );

                setAssignments(assignmentResponse.data.assignments);
                setSubmissions(submissionResponse.data.submissions);
                setAttendance(attendanceResponse.data.attendance);
                
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard data"
                );
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (assignmentId) => {
        try {
            const token = localStorage.getItem("token");
            const answer = answers[assignmentId];

            if (!answer || answer.trim() === "") {
                setError("Please enter an answer before submitting.");
                return;
            }

            const response = await axios.post(
                "http://localhost:3000/api/submissions",
                {
                    assignmentId,
                    answer
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSubmissions([
                ...submissions,
                response.data.submission
            ]);

            setAnswers({
                ...answers,
                [assignmentId]: ""
            });

            setMessage("Assignment submitted successfully!");
            setError("");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to submit assignment"
            );
        }
    };

    const getSubmission = (assignmentId) => {
        return submissions.find(
            (submission) =>
                submission.assignmentId === assignmentId ||
                submission.assignmentId?._id === assignmentId
        );
    };

    return (
        <div>
            <h1>GyanSetu Student Dashboard</h1>

            <h2>My Assignments</h2>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            {assignments.length === 0 ? (
                <p>No assignments available.</p>
            ) : (
                assignments.map((assignment) => {
                    const submission = getSubmission(assignment._id);

                    return (
                        <div key={assignment._id}>
                            <h3>{assignment.title}</h3>

                            <p>{assignment.description}</p>

                            <p>
                                Subject: {assignment.subject}
                            </p>

                            <p>
                                Due Date:{" "}
                                {new Date(
                                    assignment.dueDate
                                ).toLocaleDateString()}
                            </p>

                            {submission ? (
                                <div>
                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {submission.status}
                                    </p>

                                    <p>
                                        <strong>Submitted:</strong>{" "}
                                        {new Date(
                                            submission.submittedAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <strong>Marks:</strong>{" "}
                                        {submission.marks === null
                                            ? "Not graded yet"
                                            : submission.marks}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <textarea
                                        placeholder="Write your answer..."
                                        value={
                                            answers[assignment._id] || ""
                                        }
                                        onChange={(e) =>
                                            setAnswers({
                                                ...answers,
                                                [assignment._id]:
                                                    e.target.value
                                            })
                                        }
                                    />

                                    <br />

                                    <button
                                        onClick={() =>
                                            handleSubmit(assignment._id)
                                        }
                                    >
                                        Submit Assignment
                                    </button>
                                </div>
                            )}

                            <hr />
                        </div>
                    );
                })
            )}
            <h2>My Attendance</h2>

        {attendance.length === 0 ? (
            <p>No attendance records available.</p>
        ) : (
            attendance.map((record) => (
                <div key={record._id}>
                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(record.date).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Class:</strong> {record.className}
                    </p>

                    <p>
                        <strong>Status:</strong> {record.status}
                    </p>

                    <hr />
                </div>
            ))
        )}
        </div>
    );
}

export default StudentDashboard;