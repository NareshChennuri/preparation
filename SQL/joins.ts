/*

Inner Join
    - Join (all the records that matches the joining condition)

Outer Join
    - Left Join (all the left table records and all the records that matches the joining condition)
        (Left table + Inner Join)
    - Right Join (all the right table records and all the records that matches the joining condition)
        (Right table + Inner Join)

Self-joins 
    - are used to compare values in a table to other values of the same table by joining different parts of a table together.

Full join 
    - combines a left join and right join. A full join will return all records from a table, irrespective of whether there is a match on the joining field in the other table, returning null values accordingly.

CROSS JOIN
    - CROSS JOIN ON creates all possible combinations of two tables. 
    - Does not require a field to join .

Union - (Combines 2 sql statements, both should have same number of columns with same data types)
    - Combines 2 sql statements
    - number of columns and data types should be same
    - no duplicate records
    - The Union operator is used to vertically combine the results of two statements. For Union to work without errors, all statements must have the same number of columns and corresponding columns must have the same data type. does not return duplicates.

Union All - (Union + with duplicate records) (Similar to Union, but it returns duplicate values)
    

Intersect - (Union + only duplicate records) The operator returns only identical rows from two tables. 

Except - (returns only those rows from the left table that are not present in the right table.)

Semi Join 
 - selectes records in the first table where a
condition is met in the second table, it uses where clause

select * 
from album
where artist_id IN
(Select artist_id
    from artist);

Anti Join

select * 
from album
where artist_id NOT IN
(Select artist_id
    from artist);




*/

