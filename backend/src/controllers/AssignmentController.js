const Assignment = require("../models/Assignment");
const createAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.create(req.body);

        res.status(201).json({
            message: "Assignment created successfully",
            assignment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();

        res.status(200).json({
            count: assignments.length,
            assignments
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAssignmentsByClass = async (req, res) => {
    try {
        const className = req.params.className;
        if (req.user.role === "student") {
            const Student = require("../models/Student");

            const student = await Student.findById(req.user.id);

            if (!student) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            if (student.className !== className) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }
        }

        const assignments = await Assignment.find({
            className: className
        });

        res.status(200).json({
            count: assignments.length,
            assignments
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.status(200).json(assignment);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        if (assignment.teacherId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedAssignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Assignment updated successfully",
            assignment: updatedAssignment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        if (assignment.teacherId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await Assignment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Assignment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createAssignment,
    getAllAssignments,
    getAssignmentsByClass,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
};