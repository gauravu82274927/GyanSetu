const express = require("express");
const {
    createSubmission,
    getAllSubmissions,
    getSubmissionsByStudent,
    getSubmissionById,
    updateSubmission,
    deleteSubmission
} = require("../controllers/SubmissionController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();
router.post(
    "/",
    authMiddleware,
    roleMiddleware("student"),
    createSubmission
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    getAllSubmissions
);

router.get(
    "/student/:studentId",
    authMiddleware,
    roleMiddleware("student"),
    getSubmissionsByStudent
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    getSubmissionById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    updateSubmission
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    deleteSubmission
);

module.exports = router;