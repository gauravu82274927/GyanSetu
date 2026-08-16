const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    marks: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        enum: ["Submitted", "Graded"],
        default: "Submitted"
    }
});

module.exports = mongoose.model("Submission", submissionSchema);