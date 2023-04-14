const db = require("./db");
const config = require("../config");

// Add New Employee -- CREATE
const createOneEmployee = async (data) => {
  const emergency_contacts_data = [
    data.primary_emergency_contact_name,
    data.primary_emergency_contact_phone_number,
    data.primary_emergency_contact_relationship,
    data.secondary_emergency_contact_name,
    data.secondary_emergency_contact_phone_number,
    data.secondary_emergency_contact_relationship,
  ];
  // Add Emergency contacts and get their ids
  const employee_cont = await db.execute_query(config.sql_queries.addOneEmployeeEmergencyContacts, emergency_contacts_data);
  const last_insert_id = employee_cont.insertId;
  const primary_emergency_contact_id = last_insert_id;
  const secondary_emergency_contact_id = last_insert_id + 1;

  const employee_data = [
    data.full_name,
    data.job_title,
    data.phone_number,
    data.email,
    data.address,
    data.city,
    data.state,
    primary_emergency_contact_id,
    secondary_emergency_contact_id,
  ];
  // Add employee
  const employee = await db.execute_query(config.sql_queries.addOneEmployee, employee_data);
  return employee;
};

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
const deleteOneEmployee = async (id) => {
  const employee = await getEmployeeByID(id);
  if (!employee) {
    return "No such employee";
  }
  const { primary_emergency_contact_id, secondary_emergency_contact_id } = employee;
  await db.execute_query(config.sql_queries.deleteOneEmployee, id);
  await db.execute_query(config.sql_queries.deleteEmergencyContacts, [primary_emergency_contact_id, secondary_emergency_contact_id]);
  return {
    message: `Successfully deleted employee with id ${id}`,
  };
};

module.exports = {
  createOneEmployee,
  getEmployeeByID,
  getEmployees,
  deleteOneEmployee,
};
