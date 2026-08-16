const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    className: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    },
    markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);