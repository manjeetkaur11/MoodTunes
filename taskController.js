const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const { email } = req.query;
  try {
    const tasks = await Task.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

exports.addTask = async (req, res) => {
  const { email, text } = req.body;
  try {
    const newTask = await Task.create({ email, text });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};

exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling task' });
  }
};
