const mysql = require("mysql2/promise");
const config = require("../config");

const execute_query = async (sql, params) => {
  // Connect to database
  const connection = await mysql.createConnection(config.db);

  // Query Database
  const [results] = await connection.query(sql, params);

  return results;
};

module.exports = {
  execute_query,
};
