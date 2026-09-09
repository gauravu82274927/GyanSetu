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
router.post(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    createAttendance
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    getAllAttendance
);

router.get(
    "/student/:studentId",
    authMiddleware,
    roleMiddleware("teacher"),
    getAttendanceByStudent
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    getAttendanceById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    updateAttendance
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    deleteAttendance
);

module.exports = router;