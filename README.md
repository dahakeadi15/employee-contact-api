# Employee Contacts API

A backend API to handle employees and their contacts.

## Technologies used

- MySQL
- Node.Js
- Express.Js

## Available Routes

### Add new employee

`POST` => `http://localhost:<port_no>/api/employee/<employee_id>`

### Get information on employee by id

`GET` => `http://localhost:<port_no>/api/employee/<employee_id>`

### Get list of employees (with pagination)

`GET` => `http://localhost:<port_no>/api/employee`

- request body: `{ page_size: <number_of_records_per_page>, page_no: <page_no> }`

### Update employee by id

`PUT` => `http://localhost:<port_no>/api/employee/<employee_id>`

- request body: `{ <data_to_be_updated> }`

### Delete employee by id

`DELETE` => `http://localhost:<port_no>/api/employee/<employee_id>`

## Run in your local machine

1. Install MySQL Server and configure it.
2. Create an employee database using `CREATE DATABASE employeeDB;`
3. Create emergency contacts table

```sql
-- create emergency_contacts_table
CREATE TABLE emergency_contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_name VARCHAR(255),
  phone_number VARCHAR(20),
  relationship VARCHAR(255)
);
```

4. Create employees table

```sql
-- create employees_table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  job_title VARCHAR(255),
  phone_number VARCHAR(20),
  email VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  primary_emergency_contact_id INT,
  secondary_emergency_contact_id INT,
  FOREIGN KEY (primary_emergency_contact_id) REFERENCES emergency_contacts(id),
  FOREIGN KEY (secondary_emergency_contact_id) REFERENCES emergency_contacts(id)
);
```

5. Let's insert some dummy contacts and employees to get started

```sql
-- insert emergency contacts
INSERT INTO emergency_contacts (contact_name, phone_number, relationship)
VALUES ('John Smith', '123-456-7890', 'Father'),
  ('Jane Doe', '987-654-3210', 'Mother'),
  ('Tom Johnson', '111-222-3333', 'Brother'),
  ('Sara Johnson', '444-555-6666', 'Sister');
```

```sql
-- insert data into employees
INSERT INTO employees (
    full_name,
    job_title,
    phone_number,
    email,
    address,
    city,
    state,
    primary_emergency_contact_id,
    secondary_emergency_contact_id
  )
VALUES (
    'John Doe',
    'Manager',
    '555-123-4567',
    'johndoe@example.com',
    '1234 Elm Street',
    'Springfield',
    'IL',
    1,
    2
  ),
  (
    'Jane Smith',
    'Supervisor',
    '555-987-6543',
    'janesmith@example.com',
    '5678 Oak Avenue',
    'Shelbyville',
    'IL',
    3,
    4
  );
```

6. Now clone this repository to your machine via `git clone`.

7. cd into the repository and run `npm i`.

8. create a `.env` file and store the following info:

```
PORT=<PORT_NO>
HOST=localhost
USER=<MySql_user>
PASSWORD=<MySql_user_password>
DATABASE=<database_name>
```

9. Start the server using `node index.js`.
