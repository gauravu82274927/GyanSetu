const express = require("express");
const cors = require("cors");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const assignmentRoutes = require("./routes/AssignmentRoutes");
const submissionRoutes = require("./routes/SubmissionRoutes");
const attendanceRoutes = require("./routes/AttendanceRoutes");
const authRoutes = require("./routes/AuthRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;