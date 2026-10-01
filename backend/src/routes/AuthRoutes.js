const express = require("express");
const router = express.Router();

const {
    registerTeacher,
    registerStudent,
    loginTeacher,
    loginStudent,
    getCurrentStudent
} = require("../controllers/AuthController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/register/teacher", registerTeacher);
router.post("/register/student", registerStudent);

router.post("/login/teacher", loginTeacher);
router.post("/login/student", loginStudent);

router.get(
    "/me/student",
    authMiddleware,
    roleMiddleware("student"),
    getCurrentStudent
);

module.exports = router;