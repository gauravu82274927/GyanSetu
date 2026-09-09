const express = require("express");
const {
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacherController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();
router.get(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    getAllTeachers
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    getTeacherById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    updateTeacher
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    deleteTeacher
);
module.exports = router;