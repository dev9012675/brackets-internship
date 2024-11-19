# MongoDB with NestJS

In this task, I have set up a MongoDB database using MongoDB Atlas and connected it to my NestJS application using Mongoose.I have understood Mongoose schemas, models, and how they map to MongoDB collections.I have also created a Book Schema using Mongoose with properties like title, author, and publishedDate.
Details are given below.

## Step 1(Setting up MongoDB database using MongoDB Atlas)

First, I created an Account on the MongoDB official website. Then, I created a project on the MongoDB website. In that project
I created a MongoDB cluster. MongoDB provided a connection string like below

```
mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority
```

Lastly, I created a user for the above mentioned project.

## Step 2 Connecting MongoDB database to NestJS app

Firstly, I downloaded the **nestjs/config** package. Then, I included the following in imports array of app.module.ts.

```
ConfigModule.forRoot({ isGlobal: true }),BooksModule , 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(`MONGO_STRING`),
      }),
      inject: [ConfigService],
    })
```

The **MONGO_STRING** is defined in the .env file. It is similar to the MongoDB connection string defined above.

## Step 3 Creating a Book Schema

The Book Schema is present in book.schema.ts file located in src/books.