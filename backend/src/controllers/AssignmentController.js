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
        const assignments = await Assignment.find({
            className: req.params.className
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
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.status(200).json({
            message: "Assignment updated successfully",
            assignment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(
            req.params.id
        );

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

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