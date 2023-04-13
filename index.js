const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const employee = require("./routes/employee");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api/employee", employee);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
