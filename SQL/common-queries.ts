/*

delete dupliate records
------------------------------

1) Get the max id of the record with clause group by name

    SELECT MAX(ID)
        FROM [SampleDB].[dbo].[Employee]
        GROUP BY [FirstName], 
                 [LastName], 
                 [Country]

2) we need the other records for deletion
    (Where id NOT IN ())
SELECT *
    FROM [SampleDB].[dbo].[Employee]
    WHERE ID NOT IN
    (
        SELECT MAX(ID)
        FROM [SampleDB].[dbo].[Employee]
        GROUP BY [FirstName], 
                 [LastName], 
                 [Country]
    );


DELETE FROM [SampleDB].[dbo].[Employee]
WHERE ID NOT IN
(
    SELECT MAX(ID) AS MaxRecordID
    FROM [SampleDB].[dbo].[Employee]
    GROUP BY [FirstName], 
                [LastName], 
                [Country]
);


*/