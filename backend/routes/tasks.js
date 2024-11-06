// const express = require('express');
// const Task = require('../models/Task');
// const router = express.Router();

// // Add a new task
// router.post('/', async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Update task status
// router.patch('/:id', async (req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//     res.json(task);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get tasks with filtering
// router.get('/', async (req, res) => {
//   const { status, propertyId } = req.query;
//   const filter = {};
//   if (status) filter.status = status;
//   if (propertyId) filter.propertyId = propertyId;
//   const tasks = await Task.find(filter).populate('propertyId');
//   res.json(tasks);
// });

// // Get overdue tasks
// router.get('/overdue', async (req, res) => {
//   const overdueTasks = await Task.find({ dueDate: { $lt: new Date() }, status: { $ne: 'Completed' } });
//   res.json(overdueTasks);
// });

// module.exports = router;


// routes/tasks.js
// const express = require('express');
// const router = express.Router();
// const Task = require('../models/Task'); // Ensure you have a Task model

// // POST route to create a new task
// router.post('/', async (req, res) => {
//   try {
//     const newTask = new Task(req.body); // Assuming your Task model is set up to handle the body correctly
//     await newTask.save();
//     res.status(201).json(newTask); // Send back the created task
//   } catch (error) {
//     console.error("Error creating task:", error);
//     res.status(500).json({ message: 'Error creating task', error });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Ensure you have a Task model

// GET route to fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.status(200).json(tasks); // Send back the fetched tasks
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// POST route to create a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body); // Assuming your Task model is set up to handle the body correctly
    await newTask.save();
    res.status(201).json(newTask); // Send back the created task
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: 'Error creating task', error });
  }
});

module.exports = router;
