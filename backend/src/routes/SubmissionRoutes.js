const express = require("express");
const {
    createSubmission,
    getAllSubmissions,
    getSubmissionById,
    updateSubmission,
    deleteSubmission
} = require("../controllers/SubmissionController");

const router = express.Router();

router.post("/", createSubmission);
router.get("/", getAllSubmissions);
router.get("/:id", getSubmissionById);
router.put("/:id", updateSubmission);
router.delete("/:id", deleteSubmission);

module.exports = router;