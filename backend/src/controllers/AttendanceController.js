const Attendance = require("../models/Attendance");
const createAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();

        res.status(200).json({
            count: attendance.length,
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAttendanceByStudent = async (req, res) => {
    try {
        const attendance = await Attendance.find({
            studentId: req.params.studentId
        });

        res.status(200).json({
            count: attendance.length,
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json(attendance);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            message: "Attendance updated successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(
            req.params.id
        );

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            message: "Attendance deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createAttendance,
    getAllAttendance,
    getAttendanceByStudent,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
};