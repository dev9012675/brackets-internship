# MongoDB CRUD

For this task, I have performed CRUD operations over a users collection in the mongo shell. The details are as follows:



## Creating Users

### insertOne()

```
db.users.insertOne({name:`Name 1`, email:`name1@mail.com` , password:`123456` , age:27})
```

**Result**

```
{
  acknowledged: true,
  insertedId: ObjectId('6734f4d9011b684a9c86b01d')
}

```

### insertMany()

```
db.users.insertMany([{name:`Name 2`, email:`name2@mail.com` , password:`abcd` , age:30}, {name:`Name 3`, email:`name3@mail.com` , password:`654321` , age:20}])
```

**Result**

```
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6734f5fe011b684a9c86b01e'),
    '1': ObjectId('6734f5fe011b684a9c86b01f')
  }
}
```

##  Reading Users

### find()

```
db.users.find()
```

**Result**

```
[
  {
    _id: ObjectId('6734f4d9011b684a9c86b01d'),
    name: 'Name 1',
    email: 'name1@mail.com',
    password: '123456',
    age: 27
  },
  {
    _id: ObjectId('6734f5fe011b684a9c86b01e'),
    name: 'Name 2',
    email: 'name2@mail.com',
    password: 'abcd',
    age: 30
  },
  {
    _id: ObjectId('6734f5fe011b684a9c86b01f'),
    name: 'Name 3',
    email: 'name3@mail.com',
    password: '654321',
    age: 20
  }
]
```

## Updating Users

### updateOne

```
db.users.updateOne({name:`Name 1`} , {$set:{age:40}})
```

**Before Update**

```
{
    _id: ObjectId('6734f4d9011b684a9c86b01d'),
    name: 'Name 1',
    email: 'name1@mail.com',
    password: '123456',
    age: 27
  },
```

**After Update**

```
  {
    _id: ObjectId('6734f4d9011b684a9c86b01d'),
    name: 'Name 1',
    email: 'name1@mail.com',
    password: '123456',
    age: 40
  },
```

### updateMany

```
db.users.updateMany({age:{$lt : 35}} , {$set:{name:"Updated Name"}})
```

**Before Update**

```
 {
    _id: ObjectId('6734f5fe011b684a9c86b01e'),
    name: 'Name 2',
    email: 'name2@mail.com',
    password: 'abcd',
    age: 30
  },
  {
    _id: ObjectId('6734f5fe011b684a9c86b01f'),
    name: 'Name 3',
    email: 'name3@mail.com',
    password: '654321',
    age: 20
  }
```

**After Update**

```
 {
    _id: ObjectId('6734f5fe011b684a9c86b01e'),
    name: 'Updated Name',
    email: 'name2@mail.com',
    password: 'abcd',
    age: 30
  },
  {
    _id: ObjectId('6734f5fe011b684a9c86b01f'),
    name: 'Updated Name',
    email: 'name3@mail.com',
    password: '654321',
    age: 20
  }
```

## Deleting Users

### deleteOne

```
 db.users.deleteOne({age:{$eq:30}})
```

**Result**

```
{ acknowledged: true, deletedCount: 1 }
```

### deleteMany

```
 db.users.deleteMany({age:{$gte:20}})
```

**Result**

```
{ acknowledged: true, deletedCount: 2 }
```

