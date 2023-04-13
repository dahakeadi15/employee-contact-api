const express = require("express");
const { getEmployeeByID } = require("../services/employee");

const router = express.Router();

// Add New Employee -- CREATE
router.post("/", async (req, res) => {
  const data = req.body;

  res.json(data);
});

// Get Employee Info -- READ
router.get("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const data = employee_id;

  res.json(data);
});

// List Employees (with Pagination) -- READ
router.get("/", async (req, res) => {
  const data = req.body;

  res.json(data);
});

// Update Employee by id -- UPDATE
router.put("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const data = employee_id;

  res.json(data);
});

// Delete Employee by id -- DELETE
router.delete("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const data = employee_id;

  res.json(data);
});

module.exports = router;
