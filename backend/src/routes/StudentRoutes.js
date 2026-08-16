const express = require("express");
const {
    registerStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

router.post("/register", registerStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;