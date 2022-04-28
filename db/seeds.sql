INSERT INTO department (name)
VALUES
('Sales'),
('Legal'),
('Finance'),
('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
('Head of Sales', 100000, 1),
('Salesperson', 80000, 1),
('Legal Team Lead', 250000, 2),
('Lawyer', 200000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Lead Engineer', 200000, 4),
('Software Engineer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, NULL),
  ('Charles', 'LeRoi', 4, 3),
  ('Katherine', 'Mansfield', 5, NULL),
  ('Dora', 'Carrington', 6, 5),
  ('Edward', 'Bellamy', 7, NULL),
  ('Montague', 'Summers', 8, 7),
  ('Octavia', 'Butler', 6, 5),
  ('Unica', 'Zurn', 8, 7);