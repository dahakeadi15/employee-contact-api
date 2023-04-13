const db = require("./db");

const getEmployeeByID = async (id) => {
  const rows = await db.execute_query("SELECT * FROM employees WHERE id = ?", id);
  if (!rows) return [];
  return rows;
};

module.exports = {
  getEmployeeByID,
};
