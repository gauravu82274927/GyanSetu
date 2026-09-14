import { useEffect, useState } from "react";
import axios from "axios";

function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [attendanceMessage, setAttendanceMessage] = useState("");
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [marks, setMarks] = useState({});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignmentResponse = await axios.get(
                    "http://localhost:3000/api/assignments",
                    config
                );

                const submissionResponse = await axios.get(
                    "http://localhost:3000/api/submissions",
                    config
                );

                const studentResponse = await axios.get(
                    "http://localhost:3000/api/students",
                    config
                );

                setAssignments(
                    assignmentResponse.data.assignments
                );

                setSubmissions(
                    submissionResponse.data.submissions
                );

                setStudents(studentResponse.data.students);

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load teacher dashboard"
                );
            }
        };

        

        fetchData();
    }, []);

    const handleGrade = async (submissionId) => {
        try {
            const mark = marks[submissionId];

            if (
                mark === undefined ||
                mark === "" ||
                Number(mark) < 0 ||
                Number(mark) > 100
            ) {
                setError("Enter marks between 0 and 100.");
                return;
            }

            const response = await axios.put(
                `http://localhost:3000/api/submissions/${submissionId}`,
                {
                    marks: Number(mark),
                    status: "Graded"
                },
                config
            );

            setSubmissions(
                submissions.map((submission) =>
                    submission._id === submissionId
                        ? response.data.submission
                        : submission
                )
            );

            setMarks({
                ...marks,
                [submissionId]: ""
            });

            setMessage("Submission graded successfully!");
            setError("");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to grade submission"
            );
        }
    };
        const markAttendance = async (studentId, status) => {
        try {
            await axios.post(
                "http://localhost:3000/api/attendance",
                {
                    studentId,
                    className: student.className,
                    date: new Date().toISOString(),
                    status,
                    markedBy: JSON.parse(
                        atob(token.split(".")[1])
                    ).id
                },
                config
            );

            setAttendanceStatus({
                ...attendanceStatus,
                [studentId]: status
            });

            setAttendanceMessage(
                "Attendance marked successfully!"
            );

        } catch (error) {
            setAttendanceMessage(
                error.response?.data?.message ||
                "Failed to mark attendance"
            );
        }
    };

    return (
        <div>
            <h1>GyanSetu Teacher Dashboard</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <h2>My Assignments</h2>

            {assignments.length === 0 ? (
                <p>No assignments found.</p>
            ) : (
                assignments.map((assignment) => (
                    <div key={assignment._id}>
                        <h3>{assignment.title}</h3>

                        <p>{assignment.description}</p>

                        <p>
                            Subject: {assignment.subject}
                        </p>

                        <p>
                            Class: {assignment.className}
                        </p>

                        <p>
                            Due Date:{" "}
                            {new Date(
                                assignment.dueDate
                            ).toLocaleDateString()}
                        </p>

                        <hr />
                    </div>
                ))
            )}

            <h2>Student Submissions</h2>

            {submissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                submissions.map((submission) => (
                    <div key={submission._id}>
                        <p>
                            <strong>Assignment:</strong>{" "}
                            {submission.assignmentId?.title ||
                                "Unknown Assignment"}
                        </p>

                        <p>
                            <strong>Student:</strong>{" "}
                            {submission.studentId?.name ||
                                "Unknown Student"}
                        </p>

                        <p>
                            <strong>Class:</strong>{" "}
                            {submission.studentId?.className ||
                                "Unknown Class"}
                        </p>
                        <p>
                            <strong>Answer:</strong>{" "}
                            {submission.answer}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {submission.status}
                        </p>

                        <p>
                            <strong>Marks:</strong>{" "}
                            {submission.marks === null
                                ? "Not graded"
                                : submission.marks}
                        </p>

                        {submission.status !== "Graded" && (
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="Enter marks"
                                    value={
                                        marks[submission._id] || ""
                                    }
                                    onChange={(e) =>
                                        setMarks({
                                            ...marks,
                                            [submission._id]:
                                                e.target.value
                                        })
                                    }
                                />

                                <button
                                    onClick={() =>
                                        handleGrade(
                                            submission._id
                                        )
                                    }
                                >
                                    Grade
                                </button>
                            </div>
                        )}

                        <hr />
                    </div>
                ))
                        )}

            <h2>Mark Attendance</h2>

            {attendanceMessage && (
                <p>{attendanceMessage}</p>
            )}

            {students.length === 0 ? (
                <p>No students available.</p>
            ) : (
                students.map((student) => (
                    <div key={student._id}>
                        <h3>{student.name}</h3>

                        <p>
                            Class: {student.className}
                        </p>

                        <button
                            onClick={() =>
                                markAttendance(
                                    student._id,
                                    "Present"
                                )
                            }
                        >
                            Present
                        </button>

                        <button
                            onClick={() =>
                                markAttendance(
                                    student._id,
                                    "Absent"
                                )
                            }
                        >
                            Absent
                        </button>

                        {attendanceStatus[student._id] && (
                            <p>
                                Status:{" "}
                                {attendanceStatus[student._id]}
                            </p>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default TeacherDashboard;