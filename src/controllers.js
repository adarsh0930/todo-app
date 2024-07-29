const { readTasks, writeTasks } = require("./db");

async function getTaskById(req, res) {
  const tasks = await readTasks();
  const currentTasks = tasks.filter((task) => task.isDeleted == false);
  const task = currentTasks.find((task) => task.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
}

async function getTasks(req, res) {
  const tasks = await readTasks();
  const currentTasks = tasks.filter((task) => task.isDeleted == false);
  res.json(currentTasks);
}

async function createTask(req, res) {
  res.send();
}

async function updateTask(req, res) {
  res.send();
}

async function deleteTask(req, res) {
  res.send();
}

module.exports = {
  createTask,
  getTaskById,
  getTasks,
  updateTask,
  deleteTask,
};
