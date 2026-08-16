const express = require("express");
const {
    createAttendance,
    getAllAttendance,
    getAttendanceByStudent,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
} = require("../controllers/AttendanceController");

const router = express.Router();

router.post("/", createAttendance);
router.get("/", getAllAttendance);
router.get("/student/:studentId", getAttendanceByStudent);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;