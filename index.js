const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/", (req, res) => res.send());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
