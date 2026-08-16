const express = require("express");
const {
    createAssignment,
    getAllAssignments,
    getAssignmentsByClass,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
} = require("../controllers/AssignmentController");

const router = express.Router();

router.post("/", createAssignment);
router.get("/", getAllAssignments);
router.get("/class/:className", getAssignmentsByClass);
router.get("/:id", getAssignmentById);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

module.exports = router;