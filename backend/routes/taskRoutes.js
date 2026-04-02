const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// CREATE
router.post('/add', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

// READ
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;