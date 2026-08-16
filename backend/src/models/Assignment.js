const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
});

module.exports = mongoose.model("Assignment", assignmentSchema);