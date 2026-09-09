const express = require("express");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const assignmentRoutes = require("./routes/AssignmentRoutes");
const submissionRoutes = require("./routes/SubmissionRoutes");
const attendanceRoutes = require("./routes/AttendanceRoutes");
const authRoutes = require("./routes/AuthRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();

app.use(express.json());
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/test", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Authentication successful",
        user: req.user
    });
});

module.exports = app;