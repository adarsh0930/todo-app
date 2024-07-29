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
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  const tasks = await readTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).json(newTask);
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
