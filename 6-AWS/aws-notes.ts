/*
Infrastructure Services (IaaS)
    - EC2 (Elastic Compute Cloud)
    - EBS (Elastic Block Storage)
    - AWS Auto Scaling

Container Services
    - RDS (Relational Database Service)
    - ECS (Elastic Container Service)
    - Elasticsearch Service 
    - Elastic Beanstalk

Software Services
    - Amazon Elastic Transcoder
    - Amazon Lex
    - Amazon Athena

IAM (Identity Access Management)
    - Users
    - Groups
    - Roles
    - Permissions

ELB (Elastic Load Balancer)
    - Load Balancing
    - High Availability
    - Scalability
    - Supports HTTP, HTTPS, and TCP traffic
    - Supports health checks
    - Automatically scales based on demands placed on it
    - Single CNAME for DNS configuration

    Types of ELB
        - Classic Load Balancer (CLB) - operates at Transport Layer
        - Application Load Balancer (ALB) - operates at Application Layer
        - Network Load Balancer (NLB) - operates at the Connection Layer

RDS (Relational Database Service)
    - Fast disaster recovery
    - Scalable
    - Ease of management (Backups, patches, security management)
    - Highly available and fault tolerant
    - MySql, Postgres, Aurora, MariaDB, Oracle, SQL Servern 

Region (Cluster of Data Centers) - all aws services are region scoped
    - Compliance (by govt)
    - Available Services
    - Proximity (no latancy)
    - Pricing

Avalability Zones (each region has many availability zones min 3 - max 6)
    - Zones have the data centers.

AWS Services
    Global Services
        - Identity and Access Management (IAM)
        - Route 53 (DNS service)
        - CloudFront (CDN)
        - WAF (Web Application Firewall)
    Region Scodeped Services
        - EC2 (Elastic Compute Cloud) (IaaS)
        - Elastic Beanstalk 
        - Lambda (function as Service)
        - Rekognition (SAS)

    - S3 (Simple Storage Service)
    - Lambda
    - EBS (Elastic Block Storage)
    - EFS (Elastic File Stora ge)
    - Amazon Glacier
    - Storage Gateway

Storage Services 
    - Object storage
    - file storage
    - block storage services
    - backups
    - data migration options


Compute Services
    - EC2
    - ECS
    - AWS Lambda
    - AWS Lightsail

EC2 - Amazon Elastic Compute Cloud (Virtual Machine)
    Mainly consists of
        - Renting Virtual Machines [EC2]
        - Storing Data on Virtual Drives [EBS]
        - Distributing load across machine [ELB]
        - Scaling service using auto scaling group [ASG]

Lambda Service (Fuction as a Service)
    - Developers no need to manage servers
    - just deploy code ... Functions
    - Serverless == FaaS (Function as a Service)
    - Serverless ex: manage db, messaging, storage, etc.,
        - S3
        - Dynamo DB
        - Fargate
        - Lambda

*/
