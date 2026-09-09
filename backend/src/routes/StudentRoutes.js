const express = require("express");
const {
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();
router.get(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    getAllStudents
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    getStudentById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    updateStudent
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    deleteStudent
);

module.exports = router;