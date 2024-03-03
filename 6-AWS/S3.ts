/*

S3 (Simple Storage Services)
-----------------------------
    - Backup & Storage
    - Disaster Recovery
    - Archive
    - Hybrid Cloud Storage
    - Application Hosting
    - Media Hosting
    - Data Lakes & Big data analytics
    - Software delivery
    - Static websites

S3 Buckets: 
    - Objects [Files]    
    - Buckets [directories] 
        . Unique name
        . Region specific

    S3 Buckets Naming:
        - No uppercase, No Underscore
        - 3 to 63 chars long
        - must start with lowercase letter/number
        - no starting prefix like xn--
        - no end suffice like -s3 alias
    
S3 Objects (content)
    - Object values are the content of body
    - Max size 5TB
    - more than 5GB must use 'multi-part-upload'
    - metadata
    - tags
    - version id

    S3 Object have a key
    key - full path (s3:://bucketName/fileName.txt)

Cross-region replication
    - backup to some other availability region
    - either replicate or move data
*/
