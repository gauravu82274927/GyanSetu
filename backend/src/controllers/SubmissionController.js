const Submission = require("../models/Submission");
const createSubmission = async (req, res) => {
    try {
        const { assignmentId, answer } = req.body;
        const submission = await Submission.create({
            studentId: req.user.id,
            assignmentId,
            answer
        });
        res.status(201).json({
            message: "Submission created successfully",
            submission
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find();

        res.status(200).json({
            count: submissions.length,
            submissions
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSubmissionsByStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        if (req.user.id !== studentId) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const submissions = await Submission.find({
            studentId: studentId
        });

        res.status(200).json({
            count: submissions.length,
            submissions
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        res.status(200).json(submission);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        res.status(200).json({
            message: "Submission updated successfully",
            submission
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(
            req.params.id
        );

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        res.status(200).json({
            message: "Submission deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createSubmission,
    getAllSubmissions,
    getSubmissionsByStudent,
    getSubmissionById,
    updateSubmission,
    deleteSubmission
};