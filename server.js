const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Luiscerna6793',
  database: 'employee_tracker'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
  initializeDatabase();
});

function initializeDatabase() {
  // Read and execute the schema.sql file
  const schemaQuery = fs.readFileSync('schema.sql', 'utf8');
  connection.query(schemaQuery, (err) => {
    if (err) throw err;
    console.log('Schema created successfully');
    populateSampleData();
  });
}

function populateSampleData() {
  // Read and execute the seeds.sql file
  const seedsQuery = fs.readFileSync('seeds.sql', 'utf8');
  connection.query(seedsQuery, (err) => {
    if (err) throw err;
    console.log('Sample data populated successfully');
    startApp();
  });
}

function startApp() {
  // Use inquirer to present options and handle user input
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ]).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      // Add cases for other options...
      default:
        console.log('Invalid option');
        connection.end();
    }
  });
}

function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    console.table(results);
    connection.end();
  });
}

function viewRoles() {
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    console.table(results);
    connection.end();
  });
}
