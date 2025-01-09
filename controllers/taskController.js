const { tasks } = require('../models/taskModel');

const getTasks = (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(tasks.filter(task => task.status === status));
  }
  res.json(tasks);
};

const createTask = (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    return res.json(tasks[taskIndex]);
  }
  res.status(404).json({ error: 'Task not found' });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    return res.json(deletedTask);
  }
  res.status(404).json({ error: 'Task not found' });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
