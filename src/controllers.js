const { readTasks, writeTasks } = require("./db");

function formatTask(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
  };
}

async function getTaskById(req, res) {
  const tasks = await readTasks();
  const currentTasks = tasks.filter((task) => task.isDeleted == false);
  const task = currentTasks.find((task) => task.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(formatTask(task));
}

async function getTasks(req, res) {
  const tasks = await readTasks();
  const currentTasks = tasks.filter((task) => task.isDeleted == false);
  res.json(currentTasks.map(formatTask));
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
  res.status(201).json(formatTask(newTask));
}

async function updateTask(req, res) {
  if (req.body.completed && typeof req.body.completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "Task completed property must be a boolean" });
  }

  const tasks = await readTasks();
  const taskIndex = tasks.findIndex((task) => task.id == req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
    updatedAt: new Date(),
  };

  await writeTasks(tasks);
  res.json(formatTask(tasks[taskIndex]));
}

async function deleteTask(req, res) {
  const tasks = await readTasks();

  const taskToDelete = tasks.find((task) => task.id == req.params.id);
  if (!taskToDelete) {
    return res.status(404).json({ message: "Task not found" });
  }

  taskToDelete.isDeleted = true;

  await writeTasks(tasks);
  res.send(formatTask(taskToDelete));
}

module.exports = {
  createTask,
  getTaskById,
  getTasks,
  updateTask,
  deleteTask,
};
