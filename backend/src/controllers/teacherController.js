const Teacher = require("../models/Teacher");

const registerTeacher = async (req, res) => {
    try {
        const existingTeacher = await Teacher.findOne({
            email: req.body.email
        });

        if (existingTeacher) {
            return res.status(400).json({
                message: "Teacher already exists"
            });
        }

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

        res.status(200).json({
            count: teachers.length,
            teachers
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTeacherById = async (req, res) => {
    try{
        const teacher = await Teacher.findById(req.params.id);

        if(!teacher){
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json(teacher);
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