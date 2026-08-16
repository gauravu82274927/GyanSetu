const express = require("express");
const {
    registerTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacherController");
const router = express.Router();
router.post("/register", registerTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
module.exports = router;