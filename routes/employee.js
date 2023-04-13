const express = require("express");
const { getEmployeeByID, getEmployees } = require("../services/employee");

const router = express.Router();

// Add New Employee -- CREATE
router.post("/", async (req, res) => {
  const data = req.body;
  // TODO
  return res.status(200).json(data);
});

// Get Employee Info -- READ
router.get("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const data = await getEmployeeByID(employee_id);
  // check if data is empty
  if (!data) {
    return res.status(404).json({
      message: `No employee found with id ${employee_id}`,
    });
  }
  return res.status(200).json(data);
});

// List Employees (with Pagination) -- READ
router.get("/", async (req, res) => {
  const { page_size, page_no } = req.body;
  const [data, total_pages] = await getEmployees(page_size, page_no);
  // validate data
  if (data === "Out of bounds") {
    return res.status(400).json({
      message: `Invalid Page Number. Please enter between 1 to ${total_pages}`,
    });
  }
  return res.status(200).json(data);
});

// Update Employee by id -- UPDATE
router.put("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const data = employee_id;
  // TODO
  return res.status(200).json(data);
});

// Delete Employee by id -- DELETE
router.delete("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const data = employee_id;
  // TODO
  return res.status(200).json(data);
});

module.exports = router;
