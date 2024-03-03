/*

Dynamodb 
----------
- is a NoSQL database service
- is no Scheme JSON document or key-value data structures
- Single table design
- Primary Key (Partition Key & Sort Key) & Data atributes
- Scales horizontally
- Availability, durability and scalability built-in

UUID (Universal Unique Identifier) 
    - is a 16-byte unique value. 
        You can use UUID as an identifier for objects. 
        UUID is indexable and you can use it as a primary key.

import { uuid } from ‘uuid’;
uuid();

ULID stands for Universally Unique Alphabetically Sortable Identifier.
    - sortable unique id
    - 26 character strings (128 bits)

01FHZXHK8PTP9FVK99Z66GXQTX
Timestamp (48 bits) - 01FHZXHK8P
Randomness (80 bits) - TP9FVK99Z66GXQTX

import { ulid } from ‘ulid’;
ulid();

NoSQL vs Relational

Relational Databases
---------------------
- Optimized for storage with data normalization
- Each table has a strict schema
- Need more compute power to retrieve data from multiple tables
- Performance may degrade as the database scales

No SQL databases
------------------
- Optimized for compute rather than storage
- Flexible schema
- Designed for highly scalable applications

Dynamodb
============
- NoSQL offerfing from AWS
- Provides consistent performace at any scale (you can scale it horizontally)
- You can attache caching to reduce the latency (you can use DEX - Dynamodb Excellerator)

Dynamodb Data Modeling
========================
- Requires a shift in thinking from relational data modeling
- Don't fake a relational model
- Must identify the "Access Patterns" before table design
- Most applications need only one table
- Identify primary keys and indexes to minimize the number of requests to dynamodb to satisfy each access pattern.

1 Table for the entire application
------------------------------------
- Make use of the flexible schema to store different types of records in the same table
    Ex: company, projects and employees
- Idintifying the most suitable "Hash key (partition key)" and "Sort key (range key)" for each type of record to satisfy access patterns
- Identtifying secondary indexes for additional access patterns that cannot only be satisfied by the primary key (Hash and Sort)

Five step process
--------------------
1) Draw an entity diagram
2) Identify the relationships between entities (1:1, 1:N, N:M)
3) List down all the access patterns for each entity
4) Identify the primary key (Hash + Sort) for each entity
5) Identify the secondary indexes for additional access patterns if required (GSI - Global Secondary Indexes)

==================================
Project Management Tool Db design
==================================
Entity              - Partition Key (PK)                - Sort Key (SK)
-----------------------------------------------------------------------------------
Organization        - ORG#<org-id>                      - #METADATA#<org-id>
Project             - ORG#<org-id>                      - PRO#<type>#<project-id>
Employee            - ORG#<org-id>                      - EMP#<emp-id>
Project-Employee    - Org#<org-id>#PRO#<project-id>     - ORG#<org-id>#EMP#<emp-id>

Organization (org-id=1234)

Organization CRUD operations - PK=ORG#1234, SK=#METADATA#1234
Find all the projects of an organization - PK=ORG#1234, SK begins_with(PRO#)
Find all the employees of an organization - PK=ORG#1234, SK begins_with(EMP#)
Find both employees and projects - PK=ORG#1234
Find organization by name - [Not satisfied yet...]

Indexing in DynamoDB
------------------------
There are two types of secondary indexes: 
- Local secondary indexes (LSIs): 
    - LSIs extend the hash and range key attributes for a single partition. 
- Global secondary indexes (GSIs): 
    - GSIs are indexes that are applied to an entire table instead of a single partition.

GSI Name                - GSI Partition Key (PK)            - GSI Sort Key (SK)
--------------------------------------------------------------------------------------
Project-Employee-Index  - ORG#<org-id>#EMP#<project-id>     - ORG#<org-id>#ORG#<emp-id>

Query on GSI - PK=ORG#1234#EMP#300

GSI/LSI Name            - GSI/LSI Partition Key (PK)        - GSI/LSI Sort Key (filterName)
----------------------------------------------------------------------------------------------
Filter-by-name-index    - ORG#<org-id>                      - ORG#<org-name> or
                                                            - EMP#<emp-name> or
                                                            - PRO#<project-name>

Find by org name - PK=ORG#1234, filterName=ORG#HappyInc
Find by emp name - PK=ORG#1234, filterName=EMP#Naresh

Advanced Text Search (similar to above by  name, age, etc.,)
=================================================================
- Use an "ElasticSearch" attached to Dynamodb
- Enable dynamodb streams to "asynchronously" index table data in ElasticSearch

Sparse Index Key (Another type of GSI (Global secondary index))
----------------------------------------------------------------------
Global secondary indexes are sparse by default. 
When you create a global secondary index, you specify a partition key and optionally a sort key. 
Only items in the base table that contain those attributes appear in the index.

A sparse index is a type of index that only has index entries for some "search" key values or records in a database file. 
Sparse indexes can be useful for implementing queries over a small subset of a table.

ex: Projects that are on hold;
GSI Name                - GIS Partition Key (is_on_hold)
On-Hold-Project-Index   - <any_value> eg: true

Using Filter Conditions
-----------------------------
- If you need to further filter the results by non-key attributes
- A filter expression is applied after a Query finishes, but before the results are returned.
- Therefore, a Query consumes the same amount of read capacity, regardless of whether a filter expression is present.
- Use filter conditions if the secondary indexes cost more than the filter conditions due to low query velocity or frequency

When to use What?
--------------------

Scan
    - Always avoid it

Query
    - If you need to get 1 or more records with the same Partition Key
    - If you need to get many records with the same Partition Key AND
        want to narrow down results with a KeyCondition
        (EQ, GT, LT, EXISTS)

GetItem
    - If you need to get 1 record with a specific Partiion Key AND
        Sort Key (if applicable)        



What are the API's provided by Amazon Dynamodb?
-------------------------------------------------------
CreateTable
DescribeTable
UpdateTable
DeleteTable
GetItem
PutItem
UpdateItem
DeleteItem
BatchWriteItem
ListTables
Query
Scan
BatchGetItem.

*/