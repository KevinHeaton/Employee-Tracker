const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/api');
require('console.table');
const inquirer = require('inquirer');
const connection = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// turn on routes
app.use('/api', routes);

// turn on connection to db and server
app.use((req, res) => {
  res.status(404).end();
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    start();
  });
});


function start() {
  inquirer.prompt({
    name: 'mainList',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Departments', 
      'View All Roles', 
      'View All Employees', 
      'Add a Department', 
      'Add a Role', 
      'Add an Employee', 
      "Update an Employee's Role", 
      'Nothing, I am done!'
    ]
  })
    .then(answer => {
      switch (answer.mainList) {
        case 'View All Departments':
          viewDepartments();
          break;

        case 'View All Roles':
          viewRoles();
          break;

        case 'View All Employees':
          viewEmployees();
          break;

        case 'Add a Department':
          addDepartment();
          break;

        case 'Add a Role':
          addRole();
          break;

        case 'Add an Employee':
          addEmployee();
          break;

        case "Update an Employee's Role":
          updateEmployee();
          break;

        case 'Nothing, I am done!':
          connection.end();
          break;
      }
    });
}

function viewDepartments() {
  const query = `SELECT * FROM department;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewRoles() {
  const query = `SELECT * FROM role;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewEmployees() {
  const query = `SELECT * FROM employee;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// function departmentName() {
//   return ([
//     {
//       name: "newDepartment",
//       type: "input",
//       message: "What is the name of the new department?"
//     }
//   ]);
// }

function addDepartment() {
  inquirer.prompt([
    {
      name: "new_department",
      type: "input",
      message: "What is the name of the new department?"
    },
  ])
    .then((answer) => {
      connection.query(`INSERT INTO department (name) VALUES (?)`, [answer.new_department]);
      start();
    })
}

function addRole() {
  inquirer.prompt([
    {
      name: "new_title",
      type: "input",
      message: "What is the name of the new role?"
    },
    {
      name: "new_salary",
      type: "input",
      message: "What is the salary of the new role?"
    },
    {
      name: "department_name",
      type: "input",
      message: "What is the department id?"
    },
  ])
    .then((answer) => {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answer.new_title, answer.new_salary, answer.department_name]);
      start();
    })
}

function addEmployee() {
  inquirer.prompt([
    {
      name: "new_first_name",
      type: "input",
      message: "What is the new employee's first name?"
    },
    {
      name: "new_last_name",
      type: "input",
      message: "What is the new employee's last name?"
    },
    {
      name: "role_name",
      type: "input",
      message: "What is the role id?"
    },
    {
      name: "manager_name",
      type: "input",
      message: "What is the id of the employee's manager?"
    },
  ])
    .then((answer) => {
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.new_first_name, answer.new_last_name, answer.role_name, answer.manager_name]);
      start();
    })
}


function updateEmployee() {
  inquirer.prompt([
    {
      name: "employee_id",
      type: "input",
      message: "What is the id of the employee you are looking for?"
    },
    {
      name: "new_role_id",
      type: "input",
      message: "What is the new role id of the employee?"
    },
  ])
    .then((answer) => {
      connection.query(`UPDATE employee SET role_id = (?) WHERE id = (?)`, [answer.new_role_id, answer.employee_id]);
      start();
    })
}
