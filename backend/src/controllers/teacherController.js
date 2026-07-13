const Teacher = require("../models/Teacher");

const registerTeacher = async (req, res) => {
    try {
        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({
            email: req.body.email
        });

        if (existingTeacher) {
            return res.status(400).json({
                message: "Teacher already exists"
            });
        }

        // Create new teacher
        const teacher = await Teacher.create(req.body);

        res.status(201).json({
            message: "Teacher registered successfully",
            teacher
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});

        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerTeacher,
    getAllTeachers
}