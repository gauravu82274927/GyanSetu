const express = require("express");
const {
    createAssignment,
    getAllAssignments,
    getAssignmentsByClass,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
} = require("../controllers/AssignmentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();
router.post(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    createAssignment
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("teacher"),
    getAllAssignments
);

router.get(
    "/class/:className",
    authMiddleware,
    roleMiddleware("student"),
    getAssignmentsByClass
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    getAssignmentById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    updateAssignment
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher"),
    deleteAssignment
);

module.exports = router;