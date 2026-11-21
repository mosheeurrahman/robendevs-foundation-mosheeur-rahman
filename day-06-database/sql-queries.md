# PostgreSQL Handbook (Basic to Intermediate)

A short reference of the SQL queries you use every day. All examples use the sample tables from [Section 1](#1-sample-data).

## Contents

1. [Sample Data](#1-sample-data)
2. [Create, Alter and Drop Tables](#2-create-alter-and-drop-tables)
3. [INSERT](#3-insert)
4. [SELECT](#4-select)
5. [WHERE](#5-where)
6. [ORDER BY, LIMIT, OFFSET](#6-order-by-limit-offset)
7. [UPDATE and DELETE](#7-update-and-delete)
8. [Aggregate Functions](#8-aggregate-functions)
9. [GROUP BY and HAVING](#9-group-by-and-having)
10. [JOINs](#10-joins)
11. [UNION, INTERSECT, EXCEPT](#11-union-intersect-except)
12. [Subqueries and CTEs](#12-subqueries-and-ctes)
13. [CASE and COALESCE](#13-case-and-coalesce)
14. [Common Functions](#14-common-functions)
15. [Window Functions (Intro)](#15-window-functions-intro)
16. [Indexes, Views, Transactions](#16-indexes-views-transactions)
17. [Query Execution Order and Common Mistakes](#17-query-execution-order-and-common-mistakes)

---

## 1. Sample Data

```sql
CREATE TABLE departments (
    dept_id   SERIAL PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE,
    location  VARCHAR(100)
);

CREATE TABLE employees (
    emp_id     SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    email      VARCHAR(100) UNIQUE,
    salary     NUMERIC(10,2) CHECK (salary > 0),
    hire_date  DATE DEFAULT CURRENT_DATE,
    is_active  BOOLEAN DEFAULT TRUE,
    dept_id    INT REFERENCES departments(dept_id),
    manager_id INT REFERENCES employees(emp_id)
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    city        VARCHAR(50)
);

CREATE TABLE orders (
    order_id    SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date  DATE NOT NULL,
    amount      NUMERIC(10,2) NOT NULL,
    status      VARCHAR(20) DEFAULT 'pending'
);

INSERT INTO departments (dept_name, location) VALUES
    ('Engineering', 'Dhaka'),
    ('Sales',       'Chittagong'),
    ('HR',          'Dhaka'),
    ('Marketing',   'Sylhet'),
    ('Legal',       'Khulna');          -- has no employees

INSERT INTO employees (first_name, last_name, email, salary, hire_date, dept_id, manager_id) VALUES
    ('Rahim', 'Khan',  'rahim@example.com', 90000, '2019-03-15', 1, NULL),
    ('Karim', 'Ahmed', 'karim@example.com', 75000, '2020-07-01', 1, 1);

INSERT INTO employees (first_name, last_name, email, salary, hire_date, dept_id, manager_id) VALUES
    ('Fatima', 'Begum',     'fatima@example.com', 65000, '2021-01-10', 2, 1),
    ('Sadia',  'Islam',     'sadia@example.com',  55000, '2022-05-20', 2, 3),
    ('Tanvir', 'Hossain',   'tanvir@example.com', 48000, '2022-09-05', 3, 1),
    ('Nusrat', 'Jahan',     'nusrat@example.com', 52000, '2023-02-14', NULL, 1),  -- no department
    ('Imran',  'Chowdhury', 'imran@example.com',  75000, '2018-11-30', 4, 1);

INSERT INTO customers (name, city) VALUES
    ('Alpha Traders', 'Dhaka'),
    ('Beta Supplies', 'Chittagong'),
    ('Gamma Corp',    'Dhaka'),
    ('Delta Ltd',     'Sylhet');         -- has no orders

INSERT INTO orders (customer_id, order_date, amount, status) VALUES
    (1, '2024-01-05', 1500.00, 'completed'),
    (1, '2024-02-11',  750.50, 'completed'),
    (2, '2024-02-15', 2200.00, 'pending'),
    (3, '2024-03-01',  300.00, 'cancelled'),
    (3, '2024-03-18', 1800.75, 'completed'),
    (2, '2024-04-02',  950.00, 'completed');
```

---

## 2. Create, Alter and Drop Tables

### Create a database

```sql
CREATE DATABASE company_db;
DROP DATABASE IF EXISTS company_db;
```

### Create a table

```sql
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,         -- auto-incrementing unique ID
    name       VARCHAR(100) NOT NULL,      -- value required
    age        INT CHECK (age >= 0),       -- value must pass the check
    email      VARCHAR(100) UNIQUE,        -- no duplicates allowed
    status     VARCHAR(10) DEFAULT 'active'
);
```
`IF NOT EXISTS` avoids an error when the table is already there.

### Common data types

| Type | Use for |
|------|---------|
| `INT`, `BIGINT` | Whole numbers |
| `NUMERIC(10,2)` | Exact decimals (money) |
| `VARCHAR(n)`, `TEXT` | Text |
| `BOOLEAN` | `TRUE` / `FALSE` |
| `DATE`, `TIMESTAMP` | Dates and date-times |
| `SERIAL` | Auto-incrementing integer |

### Constraints

| Constraint | Meaning |
|------------|---------|
| `PRIMARY KEY` | Unique, not null; identifies the row |
| `FOREIGN KEY` / `REFERENCES` | Links to a row in another table |
| `UNIQUE` | No duplicate values |
| `NOT NULL` | Value is required |
| `CHECK` | Value must satisfy a condition |
| `DEFAULT` | Value used when none is given |

```sql
-- Foreign key with an action: deleting a student also deletes their enrollments
CREATE TABLE enrollments (
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    course_id  INT,
    PRIMARY KEY (student_id, course_id)        -- composite primary key
);
```

### ALTER TABLE

```sql
ALTER TABLE students ADD COLUMN phone VARCHAR(20);              -- add a column
ALTER TABLE students DROP COLUMN phone;                         -- remove a column
ALTER TABLE students RENAME COLUMN name TO full_name;           -- rename a column
ALTER TABLE students RENAME TO learners;                        -- rename the table
ALTER TABLE learners ALTER COLUMN age TYPE SMALLINT;            -- change the data type
ALTER TABLE learners ALTER COLUMN status SET DEFAULT 'new';     -- change the default
ALTER TABLE learners ALTER COLUMN email SET NOT NULL;           -- add NOT NULL
ALTER TABLE learners ADD CONSTRAINT chk_age CHECK (age < 120);  -- add a constraint
ALTER TABLE learners DROP CONSTRAINT chk_age;                   -- remove a constraint
```

### DROP and TRUNCATE

```sql
DROP TABLE IF EXISTS learners;              -- delete the table completely
DROP TABLE IF EXISTS learners CASCADE;      -- also delete things that depend on it
TRUNCATE TABLE enrollments;                 -- delete all rows, keep the table (fast)
TRUNCATE TABLE enrollments RESTART IDENTITY;  -- also reset the auto-increment counter
```

### Copy a table

```sql
CREATE TABLE employees_backup AS SELECT * FROM employees;               -- structure + data
CREATE TABLE employees_empty  AS SELECT * FROM employees WITH NO DATA;  -- structure only
```

---

## 3. INSERT

```sql
-- One row
INSERT INTO customers (name, city) VALUES ('Epsilon Inc', 'Dhaka');

-- Many rows at once
INSERT INTO customers (name, city) VALUES
    ('Zeta Co', 'Khulna'),
    ('Eta Ltd', 'Rajshahi');

-- Skip columns to use their defaults
INSERT INTO orders (customer_id, order_date, amount) VALUES (1, '2024-05-01', 400);

-- Insert rows copied from a query
INSERT INTO employees_backup
SELECT * FROM employees WHERE is_active = FALSE;

-- Get the generated ID back
INSERT INTO customers (name, city) VALUES ('Theta LLC', 'Dhaka') RETURNING customer_id;
```

---

## 4. SELECT

```sql
SELECT * FROM employees;                                  -- all columns
SELECT first_name, last_name, salary FROM employees;      -- chosen columns
```

### Aliases

```sql
SELECT first_name AS name,
       salary * 12 AS annual_salary        -- calculated column with a new name
FROM employees;

SELECT e.first_name, d.dept_name
FROM employees AS e                        -- short table alias
JOIN departments AS d ON e.dept_id = d.dept_id;
```

### Join text with `||`

```sql
SELECT first_name || ' ' || last_name AS full_name FROM employees;
```

### DISTINCT (remove duplicates)

```sql
SELECT DISTINCT dept_id FROM employees;

-- PostgreSQL special: keep one row per group (here: highest paid per department)
SELECT DISTINCT ON (dept_id) dept_id, first_name, salary
FROM employees
ORDER BY dept_id, salary DESC;
```

---

## 5. WHERE

`WHERE` keeps only the rows that match a condition.

```sql
-- Comparison: =  <>  >  <  >=  <=
SELECT * FROM employees WHERE salary > 60000;
SELECT * FROM employees WHERE dept_id = 1;
SELECT * FROM employees WHERE dept_id <> 1;

-- AND, OR, NOT (use parentheses to control priority)
SELECT * FROM employees WHERE dept_id = 1 AND salary > 80000;
SELECT * FROM employees WHERE (dept_id = 1 OR dept_id = 2) AND salary > 60000;
SELECT * FROM employees WHERE NOT is_active;

-- IN: match any value in a list
SELECT * FROM employees WHERE dept_id IN (1, 2, 3);
SELECT * FROM employees WHERE dept_id NOT IN (1, 2);

-- BETWEEN: inclusive range
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 75000;
SELECT * FROM employees WHERE hire_date BETWEEN '2020-01-01' AND '2021-12-31';

-- LIKE: pattern match (% = any characters, _ = exactly one character)
SELECT * FROM employees WHERE first_name LIKE 'R%';      -- starts with R
SELECT * FROM employees WHERE first_name LIKE '%a';      -- ends with a
SELECT * FROM employees WHERE first_name LIKE '%at%';    -- contains "at"
SELECT * FROM employees WHERE first_name ILIKE 'r%';     -- case-insensitive (PostgreSQL)

-- NULL checks (never use = NULL)
SELECT * FROM employees WHERE dept_id IS NULL;
SELECT * FROM employees WHERE dept_id IS NOT NULL;
```

---

## 6. ORDER BY, LIMIT, OFFSET

```sql
SELECT * FROM employees ORDER BY salary;                  -- ascending (default)
SELECT * FROM employees ORDER BY salary DESC;             -- descending
SELECT * FROM employees ORDER BY dept_id, salary DESC;    -- sort by dept, then salary

SELECT * FROM employees ORDER BY salary DESC LIMIT 3;     -- top 3 earners

-- Pagination: page size 3
SELECT * FROM employees ORDER BY emp_id LIMIT 3 OFFSET 0;   -- page 1
SELECT * FROM employees ORDER BY emp_id LIMIT 3 OFFSET 3;   -- page 2
```
- `LIMIT n` returns at most `n` rows. `OFFSET n` skips the first `n` rows.
- Formula: `OFFSET = (page - 1) * page_size`.
- Always use `ORDER BY` with `LIMIT`, or the rows returned are unpredictable.
- NULLs sort last in `ASC` and first in `DESC`. Change this with `NULLS FIRST` / `NULLS LAST`.

---

## 7. UPDATE and DELETE

### UPDATE

```sql
UPDATE employees SET salary = 95000 WHERE emp_id = 1;

UPDATE employees SET salary = 80000, is_active = TRUE WHERE emp_id = 2;   -- several columns

UPDATE employees SET salary = salary * 1.10 WHERE dept_id = 1;            -- 10% raise

UPDATE employees SET salary = salary + 500 WHERE dept_id = 2
RETURNING emp_id, first_name, salary;                                      -- see the changed rows
```

### DELETE

```sql
DELETE FROM employees WHERE emp_id = 7;
DELETE FROM employees WHERE is_active = FALSE;
DELETE FROM employees WHERE dept_id IN (SELECT dept_id FROM departments WHERE location = 'Khulna');
```

> **Warning:** `UPDATE` or `DELETE` without `WHERE` affects **every** row. Test with `SELECT` first, or wrap in a transaction (see [Section 16](#16-indexes-views-transactions)).

### UPSERT (insert or update)

```sql
-- If the email already exists, update the salary instead of failing
INSERT INTO employees (first_name, last_name, email, salary)
VALUES ('Rahim', 'Khan', 'rahim@example.com', 99999)
ON CONFLICT (email)
DO UPDATE SET salary = EXCLUDED.salary;

-- If it exists, do nothing
INSERT INTO employees (first_name, last_name, email, salary)
VALUES ('Rahim', 'Khan', 'rahim@example.com', 99999)
ON CONFLICT (email) DO NOTHING;
```
`EXCLUDED` means "the row I tried to insert".

---

## 8. Aggregate Functions

An aggregate turns many rows into **one value**.

| Function | Result |
|----------|--------|
| `COUNT(*)` | Number of rows |
| `COUNT(col)` | Number of non-NULL values |
| `COUNT(DISTINCT col)` | Number of unique values |
| `SUM(col)` | Total |
| `AVG(col)` | Average |
| `MIN(col)` / `MAX(col)` | Smallest / largest |
| `STRING_AGG(col, ', ')` | Values joined into one text |

```sql
SELECT COUNT(*)                AS total_employees,
       COUNT(DISTINCT dept_id) AS departments_used,
       SUM(salary)             AS total_salary,
       ROUND(AVG(salary), 2)   AS avg_salary,
       MIN(salary)             AS lowest,
       MAX(salary)             AS highest
FROM employees;

SELECT STRING_AGG(first_name, ', ' ORDER BY first_name) FROM employees;

-- Conditional counting with FILTER
SELECT COUNT(*) FILTER (WHERE status = 'completed') AS completed,
       COUNT(*) FILTER (WHERE status = 'pending')   AS pending
FROM orders;
```

---

## 9. GROUP BY and HAVING

`GROUP BY` splits rows into groups, then aggregates each group.

```sql
-- Employees per department
SELECT dept_id, COUNT(*) AS employee_count
FROM employees
GROUP BY dept_id;

-- Average salary per department, highest first
SELECT dept_id, ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY dept_id
ORDER BY avg_salary DESC;

-- Group by two columns
SELECT customer_id, status, COUNT(*) AS cnt
FROM orders
GROUP BY customer_id, status;

-- Group by month
SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) AS total
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;
```
**Rule:** every column in `SELECT` must be inside an aggregate or listed in `GROUP BY`.

### WHERE vs HAVING

| | `WHERE` | `HAVING` |
|---|---------|----------|
| Runs | Before grouping | After grouping |
| Filters | Rows | Groups |
| Can use `SUM`, `COUNT`, etc.? | No | Yes |

```sql
-- Departments with more than one employee
SELECT dept_id, COUNT(*) AS employee_count
FROM employees
GROUP BY dept_id
HAVING COUNT(*) > 1;

-- All together: completed orders only, customers who spent over 1000, top 5
SELECT customer_id, SUM(amount) AS total_spent
FROM orders
WHERE status = 'completed'         -- filter rows first
GROUP BY customer_id
HAVING SUM(amount) > 1000          -- then filter groups
ORDER BY total_spent DESC
LIMIT 5;
```

---

## 10. JOINs

A join combines rows from two tables using a related column.

| Join | Returns |
|------|---------|
| `INNER JOIN` | Only rows that match in **both** tables |
| `LEFT JOIN` | All rows from the left table + matches (NULL if none) |
| `RIGHT JOIN` | All rows from the right table + matches (NULL if none) |
| `FULL JOIN` | All rows from both tables |
| `CROSS JOIN` | Every combination of rows |
| Self join | A table joined to itself |

```sql
-- INNER JOIN: only employees that have a department
SELECT e.first_name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;

-- LEFT JOIN: all employees, even without a department (Nusrat shows NULL)
SELECT e.first_name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;

-- RIGHT JOIN: all departments, even without employees (Legal shows NULL)
SELECT e.first_name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;

-- FULL JOIN: everything from both sides
SELECT e.first_name, d.dept_name
FROM employees e
FULL JOIN departments d ON e.dept_id = d.dept_id;

-- CROSS JOIN: 5 departments x 4 customers = 20 rows (no ON clause)
SELECT d.dept_name, c.city
FROM departments d
CROSS JOIN customers c;

-- SELF JOIN: each employee with their manager
SELECT e.first_name AS employee, m.first_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;
```

### Find rows with no match

```sql
-- Customers who never placed an order
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL;
```

### Join more than two tables

```sql
SELECT e.first_name, d.dept_name, m.first_name AS manager
FROM employees e
JOIN departments d     ON e.dept_id = d.dept_id
LEFT JOIN employees m  ON e.manager_id = m.emp_id;
```

### Join + GROUP BY

```sql
-- Employee count per department, including empty departments
SELECT d.dept_name, COUNT(e.emp_id) AS employee_count
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.dept_id
GROUP BY d.dept_name
ORDER BY employee_count DESC;

-- Total spent per customer, including customers with no orders
SELECT c.name, COALESCE(SUM(o.amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.name
ORDER BY total_spent DESC;
```

### USING shortcut

```sql
-- When both tables have a column with the same name
SELECT first_name, dept_name
FROM employees
JOIN departments USING (dept_id);
```

> **Tip:** with a `LEFT JOIN`, put conditions on the right table in `ON`, not `WHERE`. A `WHERE` condition on the right table removes the NULL rows and turns it into an inner join.

---

## 11. UNION, INTERSECT, EXCEPT

Combine the results of two queries. Both must return the same number of columns with compatible types.

```sql
SELECT city FROM customers
UNION                          -- all values, duplicates removed
SELECT location FROM departments;

SELECT city FROM customers
UNION ALL                      -- all values, duplicates kept (faster)
SELECT location FROM departments;

SELECT city FROM customers
INTERSECT                      -- only values in both
SELECT location FROM departments;

SELECT location FROM departments
EXCEPT                         -- in the first query but not the second
SELECT city FROM customers;
```

---

## 12. Subqueries and CTEs

### Subquery in WHERE

```sql
-- Employees earning more than the average
SELECT first_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Employees who work in Dhaka
SELECT first_name
FROM employees
WHERE dept_id IN (SELECT dept_id FROM departments WHERE location = 'Dhaka');
```

### EXISTS / NOT EXISTS

```sql
-- Customers who have at least one order
SELECT c.name
FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);

-- Customers with no orders
SELECT c.name
FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);
```

### Subquery in FROM

```sql
SELECT dept_id, avg_salary
FROM (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
) AS dept_stats                  -- an alias is required
WHERE avg_salary > 60000;
```

### CTE (WITH): a named, readable subquery

```sql
WITH dept_avg AS (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
)
SELECT e.first_name, e.salary, d.avg_salary
FROM employees e
JOIN dept_avg d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_salary;     -- employees paid above their department average
```

### Second highest salary

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
OFFSET 1 LIMIT 1;
```

---

## 13. CASE and COALESCE

```sql
-- CASE: if / else logic
SELECT first_name, salary,
       CASE
           WHEN salary >= 80000 THEN 'High'
           WHEN salary >= 55000 THEN 'Medium'
           ELSE 'Low'
       END AS salary_band
FROM employees;

-- COALESCE: first non-NULL value (replace NULL with a default)
SELECT first_name, COALESCE(dept_id::TEXT, 'No department') AS dept
FROM employees;

-- NULLIF: returns NULL if both values are equal (avoids divide-by-zero)
SELECT 100 / NULLIF(0, 0);
```

---

## 14. Common Functions

### Strings

```sql
SELECT UPPER('hello'),                          -- HELLO
       LOWER('HELLO'),                          -- hello
       INITCAP('hello world'),                  -- Hello World
       LENGTH('Postgres'),                      -- 8
       LEFT('PostgreSQL', 4),                   -- Post
       SUBSTRING('PostgreSQL' FROM 1 FOR 4),    -- Post
       TRIM('  hi  '),                          -- hi
       REPLACE('a-b-c', '-', '/'),              -- a/b/c
       SPLIT_PART('a@b.com', '@', 2),           -- b.com
       CONCAT('Hi', ' ', 'there');              -- Hi there
```

### Numbers

```sql
SELECT ROUND(3.14159, 2),    -- 3.14
       CEIL(4.1),            -- 5
       FLOOR(4.9),           -- 4
       ABS(-5),              -- 5
       MOD(10, 3),           -- 1
       7 / 2,                -- 3   (integer division)
       7 / 2.0;              -- 3.5
```

### Dates

```sql
SELECT CURRENT_DATE,                                 -- today
       NOW(),                                        -- current date and time
       CURRENT_DATE + INTERVAL '7 days',             -- add time
       AGE(CURRENT_DATE, DATE '2000-05-15'),         -- difference as years/months/days
       EXTRACT(YEAR FROM DATE '2024-03-15'),         -- 2024
       DATE_TRUNC('month', NOW()),                   -- first moment of this month
       TO_CHAR(NOW(), 'DD Mon YYYY');                -- format as text

-- Filter a whole month (use >= and < to be safe)
SELECT * FROM orders
WHERE order_date >= '2024-02-01' AND order_date < '2024-03-01';
```

### Type casting

```sql
SELECT CAST('123' AS INTEGER);
SELECT '123'::INTEGER;            -- PostgreSQL shorthand
SELECT '2024-03-15'::DATE;
SELECT 42::TEXT;
```

---

## 15. Window Functions (Intro)

Window functions calculate across related rows **without merging them** into one row (unlike `GROUP BY`). Syntax: `function() OVER (PARTITION BY ... ORDER BY ...)`.

```sql
-- Ranking: RANK leaves gaps after ties, DENSE_RANK does not, ROW_NUMBER is always unique
SELECT first_name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
       RANK()       OVER (ORDER BY salary DESC) AS rnk,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk
FROM employees;

-- PARTITION BY: restart the ranking in each department
SELECT first_name, dept_id, salary,
       RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank
FROM employees;

-- Top earner in each department
SELECT *
FROM (
    SELECT first_name, dept_id, salary,
           ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rn
    FROM employees
) t
WHERE rn = 1;

-- Running total
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Previous row's value
SELECT order_date, amount,
       LAG(amount) OVER (ORDER BY order_date) AS previous_amount
FROM orders;
```

---

## 16. Indexes, Views, Transactions

### Indexes (make searches faster)

```sql
CREATE INDEX idx_employees_last_name ON employees (last_name);        -- normal index
CREATE UNIQUE INDEX idx_employees_email ON employees (email);         -- also blocks duplicates
CREATE INDEX idx_emp_dept_salary ON employees (dept_id, salary);      -- multi-column index
DROP INDEX IF EXISTS idx_employees_last_name;
```
Indexes speed up reads (`WHERE`, `JOIN`, `ORDER BY`) but slightly slow down writes. Index columns you search or join on often.

### Views (a saved query)

```sql
CREATE VIEW employee_details AS
SELECT e.emp_id, e.first_name, e.salary, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;

SELECT * FROM employee_details WHERE dept_name = 'Engineering';
DROP VIEW IF EXISTS employee_details;
```

### Transactions (all-or-nothing)

```sql
BEGIN;
UPDATE employees SET salary = salary - 1000 WHERE emp_id = 1;
UPDATE employees SET salary = salary + 1000 WHERE emp_id = 2;
COMMIT;       -- save both changes

BEGIN;
DELETE FROM orders WHERE status = 'cancelled';
ROLLBACK;     -- undo everything since BEGIN
```

### Handy extras

```sql
EXPLAIN ANALYZE SELECT * FROM employees WHERE dept_id = 1;   -- see how a query runs and how long it takes
```

---

## 17. Query Execution Order and Common Mistakes

### Execution order

SQL is written in one order but runs in another. That is why you cannot use a `SELECT` alias inside `WHERE`.

| Step | Clause |
|------|--------|
| 1 | `FROM` / `JOIN` |
| 2 | `WHERE` |
| 3 | `GROUP BY` |
| 4 | `HAVING` |
| 5 | `SELECT` (and aliases) |
| 6 | `DISTINCT` |
| 7 | `ORDER BY` |
| 8 | `LIMIT` / `OFFSET` |

```sql
SELECT   d.dept_name, COUNT(*) AS headcount, ROUND(AVG(e.salary), 2) AS avg_salary
FROM     employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
WHERE    e.is_active = TRUE
GROUP BY d.dept_name
HAVING   COUNT(*) >= 1
ORDER BY avg_salary DESC
LIMIT    5;
```

### Common mistakes

| Mistake | Fix |
|---------|-----|
| `WHERE col = NULL` | Use `WHERE col IS NULL` |
| `NOT IN` when the list contains NULL returns nothing | Use `NOT EXISTS` |
| Selecting a non-grouped column with `GROUP BY` | Add it to `GROUP BY` or aggregate it |
| Aggregate (`SUM`, `COUNT`) in `WHERE` | Use `HAVING` |
| `LIMIT` without `ORDER BY` | Add `ORDER BY` |
| `UPDATE` / `DELETE` without `WHERE` | Always add `WHERE`; test in a transaction |
| `7 / 2` gives `3` | Use `7 / 2.0` or `7::NUMERIC / 2` |
| Using `FLOAT` for money | Use `NUMERIC(12,2)` |
| Using `SELECT *` everywhere | List only the columns you need |

### Quick cheat sheet

```sql
SELECT DISTINCT col, COUNT(*)
FROM t
JOIN t2 ON t.id = t2.t_id            -- INNER / LEFT / RIGHT / FULL / CROSS
WHERE col LIKE 'A%' AND n BETWEEN 1 AND 10 AND x IN (1,2) AND y IS NOT NULL
GROUP BY col
HAVING COUNT(*) > 1
ORDER BY col DESC
LIMIT 10 OFFSET 20;
```