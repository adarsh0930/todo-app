const fs = require("node:fs/promises");
const path = require("node:path");

const tasksFilePath = path.join(__dirname, "../tasks.json");

// Read all tasks from a JSON file
async function readTasks() {
  try {
    const data = await fs.readFile(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Write the list of tasks to a JSON file
async function writeTasks(tasks) {
  try {
    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error(err);
  }
}

module.exports = { readTasks, writeTasks };
