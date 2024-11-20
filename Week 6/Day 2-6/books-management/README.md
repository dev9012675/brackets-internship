# Week 6:Day 2-6


## Week 6:Day 2

For this day's task, I created an AuthorSchema.I have created a one to many relationship between Authors and Books by using **ref** in both their respective schemas. I have created book and author services to manage create , read and update operations and have also created book and author controllers to handle GET, PUT and
POST requests for books and authors. For the GET request endpoints, I am using populate to fetch related data.


## Week 6:Day 3

For this day's task, I added a delete method and delete endpoint to the service and controller of Authors as well as Books. I have implemented delete such that if a book or author is deleted, any references to the deleted
resource are also deleted.