
# Querying and Aggregation

In this task, I have written queries to filter, sort and aggregate data in the users collection.

## Sample Data

Below is the data on which I have written queries.

```
[
  {
    _id: ObjectId('67358f69e8be4eea79655431'),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 28,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2022-06-15T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'javascript', 'react' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655432'),
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    age: 35,
    gender: 'Female',
    role: 'Admin',
    joinDate: ISODate('2020-01-20T00:00:00.000Z'),
    status: 'Inactive',
    tags: [ 'manager', 'leadership', 'HR' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655433'),
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    age: 24,
    gender: 'Female',
    role: 'User',
    joinDate: ISODate('2023-02-10T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'python', 'data-science' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655434'),
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@example.com',
    age: 40,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2021-07-05T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'devops', 'aws' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655435'),
    firstName: 'Charlie',
    lastName: 'Davis',
    email: 'charlie.davis@example.com',
    age: 31,
    gender: 'Male',
    role: 'Admin',
    joinDate: ISODate('2019-11-12T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'admin', 'cybersecurity', 'networking' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655436'),
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@example.com',
    age: 29,
    gender: 'Female',
    role: 'User',
    joinDate: ISODate('2022-08-19T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'react', 'typescript' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655437'),
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.martinez@example.com',
    age: 38,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2021-03-25T00:00:00.000Z'),
    status: 'Inactive',
    tags: [ 'developer', 'nodejs', 'express' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655438'),
    firstName: 'Grace',
    lastName: 'Taylor',
    email: 'grace.taylor@example.com',
    age: 26,
    gender: 'Female',
    role: 'User',
    joinDate: ISODate('2023-07-12T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'vuejs', 'frontend' ],
    __v: 0
  }
]

```

## Filter and Sort using find()

### Male users sorted by age(Ascending Order)

```
db.users.find({gender:"Male"}).sort({age:1})
```

### Result

```
[
  {
    _id: ObjectId('67358f69e8be4eea79655431'),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 28,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2022-06-15T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'javascript', 'react' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655435'),
    firstName: 'Charlie',
    lastName: 'Davis',
    email: 'charlie.davis@example.com',
    age: 31,
    gender: 'Male',
    role: 'Admin',
    joinDate: ISODate('2019-11-12T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'admin', 'cybersecurity', 'networking' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655437'),
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.martinez@example.com',
    age: 38,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2021-03-25T00:00:00.000Z'),
    status: 'Inactive',
    tags: [ 'developer', 'nodejs', 'express' ],
    __v: 0
  },
  {
    _id: ObjectId('67358f69e8be4eea79655434'),
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@example.com',
    age: 40,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2021-07-05T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'devops', 'aws' ],
    __v: 0
  }
]
```

You can also filter and sort documents in a collection using the aggregate function as you will see below.

## Aggregation

### Number of users of each gender

```
db.users.aggregate([{$group:{_id:"$gender" , count:{$sum:1}}}])
```

### Result

```
[ { _id: 'Female', count: 4 }, { _id: 'Male', count: 4 } ]
```

### Average Age of Users
```
db.users.aggregate([
{$group:{_id:null , averageAge:{$avg:"$age"}}} ,
])
```

### Result

```
[ { _id: null, averageAge: 31.375 } ]
```

### Average Age of Users by Role

```
db.users.aggregate([
{$group:{_id:"$role" , averageAge:{$avg:"$age"}}} ,
])
```

### Result

```
[
  { _id: 'User', averageAge: 30.833333333333332 },
  { _id: 'Admin', averageAge: 33 }
]
```


### Get count of users older than 30:

```
db.users.aggregate([
{$match:{age:{$gt:30}}},
{$group:{_id:null , count:{$sum:1}}} ,
])
```

### Result

```
[ { _id: null, count: 4 } ]
```

### Get all developers and sort the result by age(descending order):

```
db.users.aggregate([
{$match:{tags:"developer"}},
{$project:{_id:0}} ,
{$sort:{age:-1}}
])
```

### Result

```
[
  {
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@example.com',
    age: 40,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2021-07-05T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'devops', 'aws' ],
    __v: 0
  },
  {
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.martinez@example.com',
    age: 38,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2021-03-25T00:00:00.000Z'),
    status: 'Inactive',
    tags: [ 'developer', 'nodejs', 'express' ],
    __v: 0
  },
  {
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@example.com',
    age: 29,
    gender: 'Female',
    role: 'User',
    joinDate: ISODate('2022-08-19T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'react', 'typescript' ],
    __v: 0
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 28,
    gender: 'Male',
    role: 'User',
    joinDate: ISODate('2022-06-15T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'javascript', 'react' ],
    __v: 0
  },
  {
    firstName: 'Grace',
    lastName: 'Taylor',
    email: 'grace.taylor@example.com',
    age: 26,
    gender: 'Female',
    role: 'User',
    joinDate: ISODate('2023-07-12T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'vuejs', 'frontend' ],
    __v: 0
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    age: 24,
    gender: 'Female',
    role: 'User',
    joinDate: ISODate('2023-02-10T00:00:00.000Z'),
    status: 'Active',
    tags: [ 'developer', 'python', 'data-science' ],
    __v: 0
  }
]
```


