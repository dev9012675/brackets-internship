#### Testing RESTful APIs

I have written unit tests for the Books Controller and Books Service in the books.controller.spec
and books.service.spec files respectively using Jest. In the books.controller.spec file, I wrote unit tests by mocking functions of the Books Service. I have also tested this API using Postman.



## API Reference

### User Management


#### Create a User

```http
  POST /api/auth/signup
```
Saves the data of the user to the database.

#### Request Body

```json
{
"firstName": "test",
"lastName": "doe",
"email": "test@gmail.com",
"password": "abcdef"
}
```

#### User Login

```http
  POST /api/auth/login
```
Firstly, it checks user credentials. If valid, it generates Access and Refresh Tokens and saves them in cookies.
The refresh token is also stored in the database as a backup.If credentials are not valid, then an appropriate message is sent to the client.

#### Request Body

```json
{
"email": "test@gmail.com",
"password": "abcdef"
}
```
#### Refresh(Must be an authenticated user)

```http
  POST /api/auth/refresh
```

Generates new access and refresh tokens and stores them in cookies as well as the database in case of the refresh token.


#### Sign out(Must be an authenticated user)

```http
  POST /api/auth/signout
```

Deletes the stored access and refresh tokens from the cookies and the database in case of the refresh token..

### Books Management

Only a properly authenticated user can access the following routes.

#### Create a book(Admin only)

```http
  POST /api/books
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `createBookDto`      | `CreateBookDTO` | **Required**. data of book to be created in the database |

Creates a new book document in the system.

#### Request Body

```json
{
  "title": "Test Final" ,
  "authors": ["Author One" , " Author  2  "],
  "pages": 249,
  "genres": ["Dystopian", "Science Fiction"],
  "publicationDate": "2023-10-23",
  "isbn": "0-1201-5069-7"

}
```

#### Get multiple books

```http
  GET /api/books[?page=num&limit=num&filter=name]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pagination`      | `PaginationDTO` | **Optional**. An object containing pagination options. |


Get an array consisting of multiple book documents.The pagination object consists of three optional properties:page,filter and limit. Limit specifies the number of books shown per page whereas page specifies the page number. By using filter, you can search books by name.

#### Get specific book

```http
  GET /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to fetch |

Get a single book document.

#### Update a book(Admin only)

```http
  PUT /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to update |
| `book`      | `UpdateBookDTO` | **Required**. data of book to be updated |

Updates a book document with the data provided.

#### Request Body

```json
{
  "authors": ["Edgar Wright" , " Steven Martin "]
}
```

#### Delete a book(Admin only)

```http
  DELETE /api/books/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to delete |

Deletes a book from the system
#### Borrow a Book:

```http
  POST /api/books/${id}/borrow
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to borrow |

A user in the system can borrow a book if it is not already borrowed by another person.

#### Return a Book:

```http
  POST /api/books/${id}/return
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to return|

A user in the system can return their borrowed book.





