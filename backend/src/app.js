const express = require("express");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const assignmentRoutes = require("./routes/AssignmentRoutes");
const submissionRoutes = require("./routes/SubmissionRoutes");
const app = express();

app.use(express.json());
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);

module.exports = app;