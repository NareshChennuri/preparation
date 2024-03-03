/*

Primary key:
-------------------
    - Primary key uniquely identifies each record in the table.
    - we can join multiple tables using Primary Key

Foreign key:
-------------------
    - A foreign key references the primary key of another table. (can hold duplicate values)
    - we can join two tables by connecting the foreign key from one table to the primary key of another.

One-to-one relationship: (a given record uniquely related to exactly one record in other table)
-------------------
Database relationships describe the relationships
between records in different tables. When a one-to-one
relationship exists between two tables, a given record in
one table is uniquely related to exactly one record in the
other table.

One-to-many relationship: (a record in one table can be related to one or more records in a second table )
-------------------
In a one-to-many relationship, a record in one table can
be related to one or more records in a second table. However, a given record in the second table will only be
related to one record in the first table.

Many-to-many relationship: (records in a given table A can be related to one or more records in another table B)
-------------------
In a many-to-many relationship, records in a given table
A can be related to one or more records in another table
B , and records in table B can also be related to many records in table A.

================

DDL (Data Definition Language) 
    statements are used to define the database structure or schema. Some examples:

    1. CREATE – to create objects in the database
    2. ALTER – alters the structure of the database
    3. DROP – delete objects from the database
    4. TRUNCATE – remove all records from a table, including all spaces allocated for the records are removed
    5. COMMENT – add comments to the data dictionary
    6. RENAME – rename an object

DML (Data Manipulation Language) 
    statements are used for managing data within schema objects. Some examples:

    1. SELECT – retrieve data from the a database
    2. INSERT – insert data into a table
    3. UPDATE – updates existing data within a table
    4. DELETE – deletes all records from a table, the space for the records remain
    5. MERGE – UPSERT operation (insert or update)
    6. CALL – call a PL/SQL or Java subprogram
    7. EXPLAIN PLAN – explain access path to data
    8. LOCK TABLE – control concurrency

DCL (Data Control Language statements)

    1. GRANT – gives user’s access privileges to database
    2. REVOKE – withdraw access privileges given with the GRANT command

Transaction Control
    Manages the changes made by DML statements. These commands allow statements to be grouped together into logical transactions.

    1. COMMIT – save work done
    2. SAVEPOINT – identify a point in a transaction to which you can later roll back
    3. ROLLBACK – restore database to original since the last COMMIT
    4. SET TRANSACTION – Change transaction options like isolation level and what rollback segment to use

======================


======================

USE sql_store;

SELECT *
FROM customers
WHERE state = ‘CA’
ORDER BY first_name
LIMIT 3;

• SQL is not a case-sensitive language.
• In MySQL, every statement must be terminated with a semicolon.

Comments

We use comments to add notes to our code.
—- This is a comment and it won’t get executed.

SELECT Clause

—- Using expressions
SELECT (points * 10 + 20) AS discount_factor
FROM customers

Order of operations:
• Parenthesis
• Multiplication / division
• Addition / subtraction

—- Removing duplicates
SELECT DISTINCT state
FROM customers
WHERE Clause

We use the WHERE clause to filter data.
Comparison operators:
• Greater than: >
• Greater than or equal to: >=
• Less than: <
• Less than or equal to: <=
• Equal: =
• Not equal: <>
• Not equal: !=

Logical Operators
—- AND (both conditions must be True)
SELECT *
FROM customers
WHERE birthdate > ‘1990-01-01’ AND points > 1000

—- OR (at least one condition must be True)
SELECT *
FROM customers
WHERE birthdate > ‘1990-01-01’ OR points > 1000

—- NOT (to negate a condition)
SELECT *
FROM customers
WHERE NOT (birthdate > ‘1990-01-01’)
IN Operator

—- Returns customers in any of these states: VA, NY, CA
SELECT *
FROM customers
WHERE state IN (‘VA’, ‘NY’, ‘CA’)

BETWEEN Operator

SELECT *
FROM customers
WHERE points BETWEEN 100 AND 200
LIKE Operator

—- Returns customers whose first name starts with b
SELECT *
FROM customers
WHERE first_name LIKE ‘b%’
• %: any number of characters
• _: exactly one character

REGEXP Operator
—- Returns customers whose first name starts with a
SELECT *
FROM customers
WHERE first_name REGEXP ‘^a’
• ^: beginning of a string
• $: end of a string
• |: logical OR
• [abc]: match any single characters
• [a-d]: any characters from a to d

More Examples
—- Returns customers whose first name ends with EY or ON
WHERE first_name REGEXP ‘ey$|on$’

—- Returns customers whose first name starts with MY
—- or contains SE

WHERE first_name REGEXP ‘^my|se’
—- Returns customers whose first name contains B followed by
—- R or U

WHERE first_name REGEXP ‘b[ru]’

IS NULL Operator
—- Returns customers who don’t have a phone number
SELECT *
FROM customers
WHERE phone IS NULL
ORDER BY Clause

—- Sort customers by state (in ascending order), and then
—- by their first name (in descending order)
SELECT *
FROM customers
ORDER BY state, first_name DESC
LIMIT Clause

—- Return only 3 customers
SELECT *
FROM customers
LIMIT 3

—- Skip 6 customers and return 3
SELECT *
FROM customers
LIMIT 6, 3
Inner Joins

SELECT *
FROM customers c
JOIN orders o
 ON c.customer_id = o.customer_id
Outer Joins

—- Return all customers whether they have any orders or not
SELECT *
FROM customers c
LEFT JOIN orders o
 ON c.customer_id = o.customer_id

 USING Clause

If column names are exactly the same, you can simplify the join with the USING
clause.

SELECT *
FROM customers c
JOIN orders o
 USING (customer_id)

 Cross Joins
—- Combine every color with every size
SELECT *
FROM colors
CROSS JOIN sizes

Unions
—- Combine records from multiple result sets
SELECT name, address
FROM customers
UNION
SELECT name, address
FROM clients

Inserting Data
—- Insert a single record
INSERT INTO customers(first_name, phone, points)
VALUES (‘Mosh’, NULL, DEFAULT)

—- Insert multiple single records
INSERT INTO customers(first_name, phone, points)
VALUES
 (‘Mosh’, NULL, DEFAULT),
 (‘Bob’, ‘1234’, 10)

*/