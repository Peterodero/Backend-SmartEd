const express = require("express");
const studentProfileRouter = express.Router();
const User = require("../../models/user.model");

// Get student profile
studentProfileRouter.get("/profile/:studentId", async (req, res) => {
    try {
        const student = await User.findById(req.params.studentId).select("-password");
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update student profile
studentProfileRouter.put("/profile/:studentId", async (req, res) => {
    try {
        const updatedStudent = await User.findByIdAndUpdate(
            req.params.studentId,
            { $set: req.body },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = studentProfileRouter;
