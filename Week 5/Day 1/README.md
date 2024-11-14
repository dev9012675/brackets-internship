
# SQL vs NoSQL Databases

## SQL

**Relational:-**
              SQL databases are relational i.e. they store data in a structured , tabular format. Each row has to conform to the format and constraints of the table.  

**Vertically Scalable**:-
                          SQL databases are vertically scalable. This means that to handle more traffic, you have to improve the hardware of your server.

**Complex Queries**:-
                      A SQL database allows gives you a lot of options for querying data such as joins. It also provides you aggregate functions such as MAX , MIN e.t.c.


**Use Case:-**
             A banking application in which users can open accounts , add, take out and transfer money.
A SQL database is better because it provides better support for consistent transactions. This helps prevent problems like two users withdrawing money from the same account at the same time.



## NoSQL

**Dynamic:-**
             NoSQL databases are generally less rigid compared to SQL. For example, in MongoDB, 
a collection can have two documents with different fields and values.  

**Horizontally Scalable**:-
                          NoSQL databases are horizontally scalable. This means that to handle more traffic, you can add more servers to your NoSQL database.

**Limited Queries:-**
                      NoSQL databases generally do not support complex(compared to a SQL database) queries. MongoDB supports aggregation via its aggregation pipeline but it is still relatively limited compared to a SQL database and has a much more complex syntax.

**Use Case:-**
                An application which involves a lot of Nested Data and in which the data structure is not certain i.e. A social media application or website. By using a NoSQL database, any changes to the database structure required would be easier to make as compared to using a SQL database.