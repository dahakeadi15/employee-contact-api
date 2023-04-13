const dotenv = require("dotenv");
dotenv.config();

const config = {
  db: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  sql_queries: {
    readOneEmployee:
      "SELECT employees.id," +
      "employees.full_name," +
      "employees.job_title," +
      "employees.phone_number," +
      "employees.email," +
      "employees.address," +
      "employees.city," +
      "employees.state," +
      "primary_contact.id AS primary_emergency_contact_id," +
      "primary_contact.contact_name AS primary_emergency_contact_name," +
      "primary_contact.phone_number AS primary_emergency_contact_phone_number," +
      "primary_contact.relationship AS primary_emergency_contact_relationship," +
      "secondary_contact.id AS secondary_emergency_contact_id," +
      "secondary_contact.contact_name AS secondary_emergency_contact_name," +
      "secondary_contact.phone_number AS secondary_emergency_contact_phone_number," +
      "secondary_contact.relationship AS secondary_emergency_contact_relationship " +
      "FROM employees " +
      "LEFT JOIN emergency_contacts AS primary_contact ON employees.primary_emergency_contact_id = primary_contact.id " +
      "LEFT JOIN emergency_contacts AS secondary_contact ON employees.secondary_emergency_contact_id = secondary_contact.id " +
      "WHERE employees.id = ?;",
    readManyEmployees:
      "SELECT employees.id AS employee_id," +
      "employees.full_name," +
      "employees.job_title," +
      "employees.phone_number," +
      "employees.email," +
      "employees.address," +
      "employees.city," +
      "employees.state," +
      "primary_contact.id AS primary_emergency_contact_id," +
      "primary_contact.contact_name AS primary_emergency_contact_name," +
      "primary_contact.phone_number AS primary_emergency_contact_phone_number," +
      "primary_contact.relationship AS primary_emergency_contact_relationship," +
      "secondary_contact.id AS secondary_emergency_contact_id," +
      "secondary_contact.contact_name AS secondary_emergency_contact_name," +
      "secondary_contact.phone_number AS secondary_emergency_contact_phone_number," +
      "secondary_contact.relationship AS secondary_emergency_contact_relationship " +
      "FROM employees " +
      "LEFT JOIN emergency_contacts AS primary_contact ON employees.primary_emergency_contact_id = primary_contact.id " +
      "LEFT JOIN emergency_contacts AS secondary_contact ON employees.secondary_emergency_contact_id = secondary_contact.id " +
      "ORDER BY employees.id " +
      "LIMIT ? OFFSET ?;",
  },
};

module.exports = config;
