const express = require("express");
const teacherRoutes = require("./routes/teacherRoutes");
const app = express();

app.use(express.json());
app.use("/api/teachers", teacherRoutes);

module.exports = app;