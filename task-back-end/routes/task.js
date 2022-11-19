const express = require("express");
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const Task = require("../models/Tasks");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }));

// Get all the tasks of a user
router.get("/fetchtasks", fetchuser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

// Add a new task
router.post("/addtask", fetchuser, [
    body('taskData', 'Task cannot be empty').exists()
], async (req, res) => {

    try {

        const { taskData } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const task = new Task({
            taskData, user: req.user.id
        });

        const savedTask = await task.save();
        res.json(savedTask);

    } catch (error) {
        console.error(error);
        res.status(500).send("Some error occured");
    }
});

// Update an existing task
router.put("/updatetask/:id", fetchuser, async (req, res) => {
    const { taskData } = req.body;
    const newtask = {};
    if (taskData) {
        newtask.taskData = taskData;
    }

    let task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(401).send("Not found");
    }

    if (task.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }

    task = await Task.findByIdAndUpdate(req.params.id, { $set: newtask }, { new: true });
    res.json({ task });

});

// Delete a task
router.delete("/deletetask/:id", fetchuser, async (req, res) => {

    let task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(401).send("Not found");
    }

    if (task.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }

    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ Success: "Task deleted successfully", task: task });

});

module.exports = router;