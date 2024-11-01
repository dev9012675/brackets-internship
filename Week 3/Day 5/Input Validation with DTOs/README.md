
# Input Validation with DTOs

For this task, I have created DTOs to validate incoming data using class-validator and class-transformer, I have also changed the student schema definition to include interfaces as types. The interfaces are in src/students/student.interfaces.ts while the DTOs are in the src/students/dto directory.


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



