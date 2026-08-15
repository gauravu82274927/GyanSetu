const express = require("express");
const {
    registerTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher
} = require("../controllers/teacherController");
const router = express.Router();
router.post("/register", registerTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
module.exports = router;