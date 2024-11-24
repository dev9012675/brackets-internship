# Books Management System

I have implemented a books management system containing CRUD endpoints for both Books and Authors. It also contains search functionality for both Books and Authors implemented using Mongoose's Aggregate function and
MongoDB's text indexes. I have testing using Jest. More details are given below.




## Week 6:Day 2-6


### Week 6:Day 2

For this day's task, I created an AuthorSchema.I have created a one to many relationship between Authors and Books by using **ref** in both their respective schemas. I have created book and author services to manage create , read and update operations and have also created book and author controllers to handle GET, PUT and
POST requests for books and authors. For the GET request endpoints, I am using populate to fetch related data.


### Week 6:Day 3

For this day's task, I added a delete method and delete endpoint to the service and controller of Authors as well as Books. I have implemented delete such that if a book or author is deleted, any references to the deleted
resource are also deleted.

### Week 6:Day 4-5

Used a compound text index using the title and description fields of the books collection to implement search functionality. Implemented transactions in the Books Service and Author Service for atomic operations across multiple collections. Used Mongoose's aggregate function to implement search and pagination as well as create an endpoint which shows the number of books of each genre present in the database.

### Week 6:Day 6

Wrote tests for services that interact with the MongoDB database in the books.service.spec.ts and authors.service.spec.ts files. In these files I mocked MongoDB interactions using mongodb-memory-server. Also tested validation logic using jest in the tests directory located in both src/books and src/authors

