
# Error Handling and Custom Exceptions

For this task I have created two middleware functions in src/middleware/logger.middleware.ts. I have bound the 
globalLogger middleware to all the routes in the application whereas specificLogger is only bound to the 
POST /api/students and   PUT /api/students/${id} routes.


## API Reference


#### Create a student

```http
  POST /api/students
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `student`      | `Student` | **Required**. data of student to be created in the database |

#### Get all students

```http
  GET /api/students
```

#### Get specific student

```http
  GET /api/students/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of student to fetch |

#### Update a student

```http
  PUT /api/students/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of student to update |
| `student`      | `Partial<Student>` | **Required**. data of student to be updated |

#### Delete a student

```http
  DELETE /api/students/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of student to delete |



