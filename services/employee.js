const db = require("./db");
const config = require("../config");

// Add New Employee -- CREATE
// TODO

// Get Employee Info -- READ
const getEmployeeByID = async (id) => {
  const rows = await db.execute_query(config.sql_queries.readOneEmployee, id);
  return rows[0];
};

// List Employees (with Pagination) -- READ
const getEmployees = async (page_size, page_no) => {
  // check if page_no is valid
  var total_pages = await db.execute_query(`SELECT COUNT(*) AS total_records FROM employees;`);
  total_pages = Math.ceil(total_pages[0].total_records / page_size);
  if (page_no < 1 || page_no > total_pages) {
    return ["Out of bounds", total_pages];
  }

  const offset = page_size * (page_no - 1);
  const rows = await db.execute_query(config.sql_queries.readManyEmployees, [page_size, offset]);
  return [rows, total_pages];
};

// Update Employee by id -- UPDATE
// TODO

// Delete Employee by id -- DELETE
// TODO

module.exports = {
  getEmployeeByID,
  getEmployees,
};
