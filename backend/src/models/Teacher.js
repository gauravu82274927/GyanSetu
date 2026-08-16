const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;