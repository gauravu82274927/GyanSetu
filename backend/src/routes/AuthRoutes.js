const express = require("express");
const {
    registerTeacher,
    registerStudent,
    loginTeacher,
    loginStudent
} = require("../controllers/AuthController");

const router = express.Router();

router.post("/register/teacher", registerTeacher);
router.post("/register/student", registerStudent);

router.post("/login/teacher", loginTeacher);
router.post("/login/student", loginStudent);

module.exports = router;