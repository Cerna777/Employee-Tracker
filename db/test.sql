-- Select all employees
SELECT * FROM employees;

-- Select employees in the Sales department
SELECT * FROM employees 
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
WHERE departments.department_name = 'Sales';

-- Update salary of Sales Representatives
UPDATE roles SET salary = 52000.00 WHERE title = 'Sales Representative';

-- Add a new department
INSERT INTO departments (department_name) VALUES ('Human Resources');

-- Delete an employee
DELETE FROM employees WHERE first_name = 'Jane' AND last_name = 'Smith';
