-- Query 1: List all employees with their roles and departments
SELECT 
    employees.first_name, 
    employees.last_name, 
    roles.title AS role, 
    departments.department_name AS department 
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;

-- Query 2: Calculate the total salary expenses for each department
SELECT 
    departments.department_name,
    SUM(roles.salary) AS total_salary_expense
FROM roles
JOIN departments ON roles.department_id = departments.id
GROUP BY departments.department_name;

-- Query 3: Find the highest paid employee in each department
SELECT
    departments.department_name,
    employees.first_name,
    employees.last_name,
    MAX(roles.salary) AS max_salary
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
GROUP BY departments.department_name;

-- Query 4: List employees and their managers
SELECT 
    e.first_name AS employee_first_name, 
    e.last_name AS employee_last_name, 
    r.title AS employee_role, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
FROM employees e
JOIN roles r ON e.role_id = r.id
LEFT JOIN employees m ON e.manager_id = m.id;
