
# RESTful API

For this task, I have expanded StudentsController to include all CRUD operations (GET, POST, PUT, DELETE). I have also integrated MongoDB via mongoose in this task such that the api endpoints Create , Fetch , Update and Delete data from the database. 


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



