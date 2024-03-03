/*

MongoDB - Data stored as Document in JSON format (actually BSON (Binary Javascript Object Notation))

SQL                     -->     No SQL
======================================================
Cluster                 -->     Cluster
Database                -->     Database
Table                   -->     Collection
Row                     -->     Document
Column                  -->     Field

MongoDB Atlas ==> Software as service
MongoDB Compass ==> GUI for MongoDB
MongoDB Edge - for some cloud operations

> mongosh --> command to connect Mongo db
> show dbs --> will display the available databases
> use admin --> use the admin user
> use school // use user school

> db.createCollection("students") // create table students
> db.createCollection("teachers", {capped: true, size:10000000, max: 100}, {autoIndexId: false}) // max records 100 and max size of 10MB with no auto index

> db.dropDatabase() // delete the database

> db.students.insertOne({name:"Spongebob", age:30, gpa:3.2}); // insert one record

> db.students.find() // retrieves all students

> db.students.insertMany([{name:"Spongebob", age:30, gpa:3.2}, {name:"Spongebob2", age:32, gpa:2.2}]);


.find({query}, {projection}) // first parameter is where condition, projection is the columns to show set it true or false
=========================================================================================================================
> db.students.find().sort({name:1}) // list of students in ascending order
> db.students.find().sort({name:11}) // list of students in descending order
> db.students.find().limit(1) // gives one record sorted by 'ObjectID'
> db.students.find().sort({gpa: -1}).limit(1) // get highest gpa
> db.students.find({name: "Naresh"}) // where student name is 'Naresh'
> db.students.find({gpa: 4.0, fullTime: true}) // where gpa and fulltime condition

//Projection examples
> db.students.find({}, {name:true})
    [
        {_id: ObjectId("642c0e70985f18e1bcf354ds5"), name: 'Spongebob'},
        {_id: ObjectId("642c0e70985f18e1bcf3654s6"), name: 'Naresh'}
    ]

> db.students.find({}, {_id: false, name: true})
    [
        {name: 'Spongebob'},
        {name: 'Naresh'}
    ]

> db.students.find({}, {_id: false, name: true, gpa: true})
    [
        {name: 'Spongebob', gpa: 3.2},
        {name: 'Naresh', gpa: 1.3}
    ] 

Update a field ($set: {fieldName: fieldValue})
===================================================
> db.students.updateOne({name: "Spongebob"}, {$set: {fullTime:true}})

Delete a field ($unset: {fieldName: ""}) 
================================================
> db.students.updateOne({_id: ObjectId("642c0e70985f18e1bcf354ds5")}, {$unset:{fullTime: ""}})

updateMany that doesn't have field ({fullTime: {$exists: false}})
======================================================================
> db.students.updateMany({fullTime: {$exists: false}}, {$set: {fullTime:true}})

delete document
=============================
> db.students.deleteOne({name: "Larry"}) // delete one document where name is "Larry"
> db.students.deleteMany({fullTime: false}) // delete all document where fullTime is false

MongoDB operators
==================

$ne --> not equals to
> db.students.find({name: {$ne:"Spongebob"}})

$lt  --> less than
$lte --> less than or equals to
$gt --> greater than
$gte --> greater than or equals to
> db.students.find({age: {$lt:20}})
> db.students.find({age: {$lte:20}})

Age in between 
------------------
> db.students.find({gpa: {$gte:3, $lte:4}})

In operator "$in" / not in "$nin"
------------------------------------
> db.students.find({name: {$in: ["Spongebob", "Patrick", "Sandy"]}})

$and $not $nor $or
---------------------------------
> db.students.find({$and: [{fullTime:true}, {age: {$lte:22}}]})
> db.students.find({$or: [{fullTime:true}, {age: {$lte:22}}]})
> db.students.find({$nor: [{fullTime:true}, {age: {$lte:22}}]})
> db.students.find({age: {$not: {$gte:30}}})

Indexes (B-Tree algorithm) 
===============================================================
pros'
- efficient execution of queries
- without Index MongoDB performs a collection scan (scan every docuemnt in a collection)
- MongoDB can use the index to limit the number of documents it can scan

cons'
- takes up more memory
- and slows insert update remove operations

when using Indexes you are storing the data in B-tree algorithm structure.

> db.students.createIndex({name: 1})
name_1 // name of the index

> db.students.getIndexes()
[
    {v: 2, key: {_id:1}, name: '_id_'},
    {v: 2, key: {name:1}, name: 'name_1'}
]

> db.students.dropIndex("name_1")


Explain query
------------------
> db.students.find({name: "Larry"}).explain("executionStats")

"Joins" --> &lookup operator and aggregater framework
============================================================
- Lookup operator allows us to fetch data from two related documents merged into one resulting document.
- Lookup is very expensive
- if you are using more Lookup then use relational database

> db.post.aggregate([
    {
        $lookup:
        {
            from: "comment", // join post document with comment document on the below fields
            localField: "title",            // post.title
            foreignField: "postTitle",      // join on comment.postTitle
            as: "comments" // alias
        }
    }
])


*/
