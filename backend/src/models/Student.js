const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Student", studentSchema);