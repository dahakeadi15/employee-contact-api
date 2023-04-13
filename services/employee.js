const db = require("./db");
const config = require("../config");

const getEmployeeByID = async (id) => {
  const rows = await db.execute_query(config.sql_queries.readOneEmployee, id);
  return rows[0];
};

module.exports = {
  getEmployeeByID,
};
