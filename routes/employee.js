const express = require("express");
const { getEmployeeByID } = require("../services/employee");

const router = express.Router();

// Get Employee Info
router.get("/:id", async (req, res) => {
  const data = await getEmployeeByID(req.params.id);
  res.json(data);
});

module.exports = router;
