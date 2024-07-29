const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes");

const app = express();

app.use(bodyParser.json());

app.use("/tasks", tasksRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
