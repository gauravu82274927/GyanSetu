const express = require("express");

const {
    createAttendance,
    getAllAttendance,
    getAttendanceByStudent,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
} = require("../controllers/AttendanceController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Teacher: mark attendance
router.post(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    createAttendance
);

// Teacher: view all attendance
router.get(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    getAllAttendance
);

// Student: view own attendance
router.get(
    "/student/:studentId",
    authMiddleware,
    roleMiddleware("student"),
    getAttendanceByStudent
);

// Teacher: view attendance record
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    getAttendanceById
);

// Teacher: update attendance
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    updateAttendance
);

// Teacher: delete attendance
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    deleteAttendance
);

module.exports = router;