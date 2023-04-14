const express = require("express");
const { getEmployeeByID, getEmployees, deleteOneEmployee, createOneEmployee, updateEmployeeByID } = require("../services/employee");

const router = express.Router();

// Add New Employee -- CREATE
router.post("/", async (req, res) => {
  const received_data = req.body;
  const data = await createOneEmployee(received_data);
  return res.status(200).json({
    message: "Successfully added new employee.",
    employee_id: data.insertId,
  });
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
  return res.status(200).json({ data, current_page: page_no, total_pages });
});

// Update Employee by id -- UPDATE
router.put("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const employee_data = req.body;
  const data = await updateEmployeeByID(employee_id, employee_data);
  return res.status(200).json(data);
});

// Delete Employee by id -- DELETE
router.delete("/:id", async (req, res) => {
  const employee_id = req.params.id;
  const data = await deleteOneEmployee(employee_id);

  if (data === "No such employee") {
    return res.status(404).json({
      message: `No employee found with id ${employee_id}.`,
    });
  }
  return res.status(200).json(data);
});

module.exports = router;
