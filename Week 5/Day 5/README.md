# Indexing and Performance Optimization

In this task, I have used indexes to optimize query performance. Also , I have checked query performance before and
after using indexes via the explain() method.

## Find Male Users

```
db.users.find({gender:"Male"}).explain("executionStats")
```

### Before Index

```
executionStats: {
    executionSuccess: true,
    nReturned: 4,
    executionTimeMillis: 0,
    totalKeysExamined: 0,
    totalDocsExamined: 8,
    executionStages: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: { gender: { '$eq': 'Male' } },
      nReturned: 4,
      executionTimeMillisEstimate: 0,
      works: 9,
      advanced: 4,
      needTime: 4,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 8
    }
  },
```
Note the value of **totalDocsExamined** is 8 and **nReturned** is 4. Suggesting that MongoDB had to check 8 documents and returned the 4 which matched the provided filter. The stage attribute in the executionStages object has the value **COLLSCAN** which indicates that MongoDB scanned the entire users collection.

### Creating Index

I have created the following **single-field** index.

```
db.users.createIndex({gender:1})
```

### After Index

```
   executionStats: {
    executionSuccess: true,
    nReturned: 4,
    executionTimeMillis: 0,
    totalKeysExamined: 4,
    totalDocsExamined: 4,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 4,
      executionTimeMillisEstimate: 0,
      works: 5,
      advanced: 4,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 4,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 4,
        executionTimeMillisEstimate: 0,
        works: 5,
        advanced: 4,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { gender: 1 },
        indexName: 'gender_1',
        isMultiKey: false,
        multiKeyPaths: { gender: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { gender: [ '["Male", "Male"]' ] },
        keysExamined: 4,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  }
```

Note the value of **totalDocsExamined** is 4 and **nReturned** is also 4. Suggesting that MongoDB only had to examine 4 documents in this case. Without the indexes, MongoDB had to scan all the documents in the collection. With the index, MongoDB is able to determine which documents match the specified filter. The stage attribute in the executionStages object has the value **IXSCAN** which indicates that MongoDB used indexes to find the documents.


## Get all developers and sort the result by age(descending order):

```
db.users.aggregate([ { $match: { tags: "developer" } }, { $project: { _id: 0 } }, { $sort: { age: -1 } }] ).explain("executionStats")
```

### Before Index

```
     executionStats: {
          executionSuccess: true,
          nReturned: 6,
          executionTimeMillis: 0,
          totalKeysExamined: 0,
          totalDocsExamined: 8,
          executionStages: {
            isCached: false,
            stage: 'PROJECTION_SIMPLE',
            nReturned: 6,
            executionTimeMillisEstimate: 0,
            works: 9,
            advanced: 6,
            needTime: 2,
            needYield: 0,
            saveState: 1,
            restoreState: 1,
            isEOF: 1,
            transformBy: { _id: false },
            inputStage: {
              stage: 'COLLSCAN',
              filter: { tags: { '$eq': 'developer' } },
              nReturned: 6,
              executionTimeMillisEstimate: 0,
              works: 9,
              advanced: 6,
              needTime: 2,
              needYield: 0,
              saveState: 1,
              restoreState: 1,
              isEOF: 1,
              direction: 'forward',
              docsExamined: 8
            }
          }
        }
      
      
```

Note the value of **totalDocsExamined** is 8 and **nReturned** is 6. Suggesting that MongoDB had to check 8 documents and returned the 6 which matched the provided filter.

### Creating Index

I have created the following **Compound Multikey Index**

```
db.users.createIndex({tags:1 , age:1})
```

### After Index

```
   executionStats: {
          executionSuccess: true,
          nReturned: 6,
          executionTimeMillis: 0,
          totalKeysExamined: 6,
          totalDocsExamined: 6,
          executionStages: {
            isCached: false,
            stage: 'PROJECTION_SIMPLE',
            nReturned: 6,
            executionTimeMillisEstimate: 0,
            works: 7,
            advanced: 6,
            needTime: 0,
            needYield: 0,
            saveState: 1,
            restoreState: 1,
            isEOF: 1,
            transformBy: { _id: false },
            inputStage: {
              stage: 'FETCH',
              nReturned: 6,
              executionTimeMillisEstimate: 0,
              works: 7,
              advanced: 6,
              needTime: 0,
              needYield: 0,
              saveState: 1,
              restoreState: 1,
              isEOF: 1,
              docsExamined: 6,
              alreadyHasObj: 0,
              inputStage: {
                stage: 'IXSCAN',
                nReturned: 6,
                executionTimeMillisEstimate: 0,
                works: 7,
                advanced: 6,
                needTime: 0,
                needYield: 0,
                saveState: 1,
                restoreState: 1,
                isEOF: 1,
                keyPattern: { tags: 1, age: 1 },
                indexName: 'tags_1_age_1',
                isMultiKey: true,
                multiKeyPaths: { tags: [ 'tags' ], age: [] },
                isUnique: false,
                isSparse: false,
                isPartial: false,
                indexVersion: 2,
                direction: 'forward',
                indexBounds: {
                  tags: [ '["developer", "developer"]' ],
                  age: [ '[MinKey, MaxKey]' ]
                },
                keysExamined: 6,
                seeks: 1,
                dupsTested: 6,
                dupsDropped: 0
              }
            }
          }
        }
      
      
```


Note the value of **totalDocsExamined** is 8 and **nReturned** is 6. Suggesting that MongoDB had to check 8 documents and returned the 6 which matched the provided filter.

## Get the firstName , lastName and joinDate of the user who most recently joined

```
db.users.aggregate([{$sort : {joinDate:-1}} , {$limit:1} , {$project :{firstName:1 , lastName:1 , joinDate:1}} ]).explain("executionStats")
```

### Before Index

```
  executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 1,
    totalKeysExamined: 0,
    totalDocsExamined: 8,
    executionStages: {
      isCached: false,
      stage: 'PROJECTION_SIMPLE',
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      works: 11,
      advanced: 1,
      needTime: 9,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      transformBy: { _id: true, firstName: true, lastName: true, joinDate: true },
      inputStage: {
        stage: 'SORT',
        nReturned: 1,
        executionTimeMillisEstimate: 0,
        works: 11,
        advanced: 1,
        needTime: 9,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        sortPattern: { joinDate: -1 },
        memLimit: 104857600,
        limitAmount: 1,
        type: 'simple',
        totalDataSizeSorted: 0,
        usedDisk: false,
        spills: 0,
        spilledDataStorageSize: 0,
        inputStage: {
          stage: 'COLLSCAN',
          nReturned: 8,
          executionTimeMillisEstimate: 0,
          works: 9,
          advanced: 8,
          needTime: 0,
          needYield: 0,
          saveState: 0,
          restoreState: 0,
          isEOF: 1,
          direction: 'forward',
          docsExamined: 8
        }
      }
    }
  }
```

The above query will return only a single document yet MongoDB scans the entire collection.

### Creating Index

I have created the following index on the joinDate property.

```
db.users.createIndex({joinDate:1})
```

### After Index

```
 executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 1,
    totalKeysExamined: 1,
    totalDocsExamined: 1,
    executionStages: {
      isCached: false,
      stage: 'LIMIT',
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      works: 2,
      advanced: 1,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      limitAmount: 1,
      inputStage: {
        stage: 'PROJECTION_SIMPLE',
        nReturned: 1,
        executionTimeMillisEstimate: 0,
        works: 1,
        advanced: 1,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 0,
        transformBy: { _id: true, firstName: true, lastName: true, joinDate: true },
        inputStage: {
          stage: 'FETCH',
          nReturned: 1,
          executionTimeMillisEstimate: 0,
          works: 1,
          advanced: 1,
          needTime: 0,
          needYield: 0,
          saveState: 0,
          restoreState: 0,
          isEOF: 0,
          docsExamined: 1,
          alreadyHasObj: 0,
          inputStage: {
            stage: 'IXSCAN',
            nReturned: 1,
            executionTimeMillisEstimate: 0,
            works: 1,
            advanced: 1,
            needTime: 0,
            needYield: 0,
            saveState: 0,
            restoreState: 0,
            isEOF: 0,
            keyPattern: { joinDate: 1 },
            indexName: 'joinDate_1',
            isMultiKey: false,
            multiKeyPaths: { joinDate: [] },
            isUnique: false,
            isSparse: false,
            isPartial: false,
            indexVersion: 2,
            direction: 'backward',
            indexBounds: { joinDate: [ '[MaxKey, MinKey]' ] },
            keysExamined: 1,
            seeks: 1,
            dupsTested: 0,
            dupsDropped: 0
          }
        }
      }
    }
  }
```

After creating the index, MongoDB only examines one document and returns it.

## Get all Active users and then sort the result by firstName and lastName

```
db.users.aggregate([{$match:{status:`Active`}}, {$sort:{firstName:1 , lastName:1}}]).explain("executionStats")
```

### Before Index

```
  executionStats: {
    executionSuccess: true,
    nReturned: 6,
    executionTimeMillis: 0,
    totalKeysExamined: 0,
    totalDocsExamined: 8,
    executionStages: {
      isCached: false,
      stage: 'SORT',
      nReturned: 6,
      executionTimeMillisEstimate: 0,
      works: 16,
      advanced: 6,
      needTime: 9,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      sortPattern: { firstName: 1, lastName: 1 },
      memLimit: 104857600,
      type: 'simple',
      totalDataSizeSorted: 2094,
      usedDisk: false,
      spills: 0,
      spilledDataStorageSize: 0,
      inputStage: {
        stage: 'COLLSCAN',
        filter: { status: { '$eq': 'Active' } },
        nReturned: 6,
        executionTimeMillisEstimate: 0,
        works: 9,
        advanced: 6,
        needTime: 2,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        direction: 'forward',
        docsExamined: 8
      }
    }
  }
```

Note the value of **totalDocsExamined** is 8 and **nReturned** is 6. Suggesting that MongoDB had to check 8 documents and returned the 6 which matched the provided filter.

### Created Index

I have created the following **compound index**

```
db.users.createIndex({ status: 1, firstName: 1, lastName: 1 });
```

### After Index

```
  executionStats: {
    executionSuccess: true,
    nReturned: 6,
    executionTimeMillis: 0,
    totalKeysExamined: 6,
    totalDocsExamined: 6,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 6,
      executionTimeMillisEstimate: 0,
      works: 7,
      advanced: 6,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 6,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 6,
        executionTimeMillisEstimate: 0,
        works: 7,
        advanced: 6,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { status: 1, firstName: 1, lastName: 1 },
        indexName: 'status_1_firstName_1_lastName_1',
        isMultiKey: false,
        multiKeyPaths: { status: [], firstName: [], lastName: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: {
          status: [ '["Active", "Active"]' ],
          firstName: [ '[MinKey, MaxKey]' ],
          lastName: [ '[MinKey, MaxKey]' ]
        },
        keysExamined: 6,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  }
```
Note the value of **totalDocsExamined** is 6 and **nReturned** is also 6. Suggesting that MongoDB only had to examine 6 documents in this case.

## Get products having a specific tag

Below is the data present in the products collection.

```
[
  {
    _id: ObjectId('67372f98df1713b6b486b01d'),
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    inStock: true,
    tags: [ 'technology', 'computers' ],
    manufacturer: 'BrandX'
  },
  {
    _id: ObjectId('67372f98df1713b6b486b01e'),
    name: 'Smartphone',
    category: 'Electronics',
    price: 599.99,
    inStock: true,
    color: 'Black',
    weight: '150g',
    tags: [ 'technology', 'phones' ]
  },
  {
    _id: ObjectId('67372f98df1713b6b486b01f'),
    name: 'Coffee Mug',
    price: 12.99,
    inStock: false,
    material: 'Ceramic',
    customLabel: 'Best Seller'
  },
  {
    _id: ObjectId('67372f98df1713b6b486b020'),
    name: 'Desk Lamp',
    category: 'Furniture',
    price: 45,
    inStock: true,
    tags: [ 'lighting', 'office' ],
    warrantyPeriod: '2 years'
  },
  {
    _id: ObjectId('67372f98df1713b6b486b021'),
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 129.99,
    inStock: true,
    brand: 'SoundPro',
    features: [ 'waterproof', 'wireless' ]
  }
]
```

```
db.products.aggregate([{$match:{tags:"technology"}}, {$project:{name:1 , _id:0}}]).explain("executionStats")
```

### Before Index

```
 executionStats: {
    executionSuccess: true,
    nReturned: 2,
    executionTimeMillis: 0,
    totalKeysExamined: 0,
    totalDocsExamined: 5,
    executionStages: {
      isCached: false,
      stage: 'PROJECTION_SIMPLE',
      nReturned: 2,
      executionTimeMillisEstimate: 0,
      works: 6,
      advanced: 2,
      needTime: 3,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      transformBy: { name: true, _id: false },
      inputStage: {
        stage: 'COLLSCAN',
        filter: { tags: { '$eq': 'technology' } },
        nReturned: 2,
        executionTimeMillisEstimate: 0,
        works: 6,
        advanced: 2,
        needTime: 3,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        direction: 'forward',
        docsExamined: 5
      }
    }
  }
```
Note the value of **totalDocsExamined** is 5 and **nReturned** is 2. Suggesting that MongoDB had to check 5 documents and returned the 2 which matched the provided filter.


### Created Index

I have created the following **Wildcard Index**

```
db.products.createIndex({ "$**" : 1 })
```

### After Index

```
 executionStats: {
    executionSuccess: true,
    nReturned: 2,
    executionTimeMillis: 0,
    totalKeysExamined: 2,
    totalDocsExamined: 2,
    executionStages: {
      isCached: false,
      stage: 'PROJECTION_SIMPLE',
      nReturned: 2,
      executionTimeMillisEstimate: 0,
      works: 3,
      advanced: 2,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      transformBy: { name: true, _id: false },
      inputStage: {
        stage: 'FETCH',
        nReturned: 2,
        executionTimeMillisEstimate: 0,
        works: 3,
        advanced: 2,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        docsExamined: 2,
        alreadyHasObj: 0,
        inputStage: {
          stage: 'IXSCAN',
          nReturned: 2,
          executionTimeMillisEstimate: 0,
          works: 3,
          advanced: 2,
          needTime: 0,
          needYield: 0,
          saveState: 0,
          restoreState: 0,
          isEOF: 1,
          keyPattern: { '$_path': 1, tags: 1 },
          indexName: '$**_1',
          isMultiKey: true,
          multiKeyPaths: { '$_path': [], tags: [ 'tags' ] },
          isUnique: false,
          isSparse: false,
          isPartial: false,
          indexVersion: 2,
          direction: 'forward',
          indexBounds: {
            '$_path': [ '["tags", "tags"]' ],
            tags: [ '["technology", "technology"]' ]
          },
          keysExamined: 2,
          seeks: 1,
          dupsTested: 2,
          dupsDropped: 0
        }
      }
    }
  }
```

Note the value of **totalDocsExamined** is 2 and **nReturned** is also 2. Suggesting that MongoDB only had to examine 2 documents in this case.