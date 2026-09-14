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
    const [assignmentForm, setAssignmentForm] = useState({
        title: "",
        description: "",
        subject: "",
        className: "",
        dueDate: ""
    });

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

                const attendanceResponse = await axios.get(
                    "http://localhost:3000/api/attendance",
                    config
                );

                setAssignments(
                    assignmentResponse.data.assignments
                );

                setSubmissions(
                    submissionResponse.data.submissions
                );

                setStudents(studentResponse.data.students);

                const today = new Date().toISOString().split("T")[0];

                const todayAttendance = attendanceResponse.data.attendance.filter(
                    (record) =>
                        new Date(record.date).toISOString().split("T")[0] === today
                );

                const attendanceMap = {};

                todayAttendance.forEach((record) => {
                    attendanceMap[record.studentId?._id || record.studentId] =
                        record.status;
                });

                setAttendanceStatus(attendanceMap);

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
    
    const createAssignment = async () => {
    try {
        if (
            !assignmentForm.title ||
            !assignmentForm.description ||
            !assignmentForm.subject ||
            !assignmentForm.className ||
            !assignmentForm.dueDate
        ) {
            setError("Please fill all assignment fields.");
            return;
        }

        const teacherId = JSON.parse(
            atob(token.split(".")[1])
        ).id;

        const response = await axios.post(
            "http://localhost:3000/api/assignments",
            {
                ...assignmentForm,
                teacherId
            },
            config
        );

        setAssignments([
            ...assignments,
            response.data.assignment
        ]);

        setAssignmentForm({
            title: "",
            description: "",
            subject: "",
            className: "",
            dueDate: ""
        });

        setMessage("Assignment created successfully!");
        setError("");

    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Failed to create assignment"
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

            <h2>Create Assignment</h2>

<div>
    <input
        type="text"
        placeholder="Assignment title"
        value={assignmentForm.title}
        onChange={(e) =>
            setAssignmentForm({
                ...assignmentForm,
                title: e.target.value
            })
        }
    />

    <br /><br />

    <textarea
        placeholder="Assignment description"
        value={assignmentForm.description}
        onChange={(e) =>
            setAssignmentForm({
                ...assignmentForm,
                description: e.target.value
            })
        }
    />

    <br /><br />

    <input
        type="text"
        placeholder="Subject"
        value={assignmentForm.subject}
        onChange={(e) =>
            setAssignmentForm({
                ...assignmentForm,
                subject: e.target.value
            })
        }
    />

    <br /><br />

    <input
        type="text"
        placeholder="Class (e.g. CSE-A)"
        value={assignmentForm.className}
        onChange={(e) =>
            setAssignmentForm({
                ...assignmentForm,
                className: e.target.value
            })
        }
    />

    <br /><br />

    <input
        type="date"
        value={assignmentForm.dueDate}
        onChange={(e) =>
            setAssignmentForm({
                ...assignmentForm,
                dueDate: e.target.value
            })
        }
    />

    <br /><br />

    <button onClick={createAssignment}>
        Create Assignment
    </button>
</div>

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