const express = require("express");

const router = express.Router();

const {
    registerTeacher,
    getAllTeachers,
    getTeacherById
} = require("../controllers/teacherController");

router.post("/register", registerTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
module.exports = router;