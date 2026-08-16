const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const registerTeacher = async (req, res) => {
    try {
        const { name, email, password, subjects } = req.body;
        const existingTeacher = await Teacher.findOne({ email });

        if (existingTeacher) {
            return res.status(400).json({
                message: "Teacher already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const teacher = await Teacher.create({
            name,
            email,
            password: hashedPassword,
            subjects
        });

        res.status(201).json({
            message: "Teacher registered successfully",
            teacher: {
                id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                subjects: teacher.subjects
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const registerStudent = async (req, res) => {
    try {
        const { name, email, password, className, subjects } = req.body;
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            className,
            subjects
        });

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                className: student.className,
                subjects: student.subjects
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: teacher._id,
                role: "teacher"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Teacher login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: student._id,
                role: "student"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Student login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerTeacher,
    registerStudent,
    loginTeacher,
    loginStudent
};