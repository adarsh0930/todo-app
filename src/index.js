require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes");

const app = express();

app.use(bodyParser.json());

app.use("/tasks", tasksRouter);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
