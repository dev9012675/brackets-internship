
# Error Handling and Custom Exceptions

For this task I have created a Custom Exception Filter in ValidationExceptionFilter.ts located in the src directory. I am using this filter in the update and create method in the Students Controller. I have also
implemented simple error handling in the rest of the controller methods via the NestJS built in Global Exception Filter.


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



