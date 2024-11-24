import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { Author , AuthorSchema } from './author.schema';
import { Book , BookSchema } from '../books/book.schema';
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from '../books/books.service';
import { authors } from '../constants/testData.constants';
import { CreateAuthorDTO } from './dtos/CreateAuthorDTO';
import { UpdateAuthorDTO } from './dtos/UpdateAuthorDTO';
import { AuthorSearchDTO } from './dtos/AuthorSearchDTO';

describe('AuthorsService', () => {
  let bookService:BooksService
  let authorService: AuthorsService;
   let authorModel , replset , bookModel

   beforeAll(async () => {
    
    replset =  await MongoMemoryReplSet.create({ replSet: { count: 1 } }); 
   const mongoUri = await replset.getUri();

  
   const mongoConnection = (await mongoose.connect(mongoUri, {  replicaSet: 'testset'  } as ConnectOptions)).connection;
 
   authorModel = mongoConnection.model(Author.name , AuthorSchema)
   bookModel = mongoConnection.model(Book.name , BookSchema)
   const module: TestingModule = await Test.createTestingModule({
     providers: [
        AuthorsService , {provide: getModelToken(Author.name), useValue: authorModel} ,
        BooksService , {provide: getModelToken(Book.name), useValue: bookModel}],
   })
 .compile();

   authorService = module.get<AuthorsService>(AuthorsService);

   

   


 } );

 afterAll(async () => {
  await mongoose.disconnect()
  await replset.stop()

});

beforeEach(async () => {
  await authorModel.deleteMany({});

});

  it('should be defined', () => {
    expect(authorService).toBeDefined();
  });

  describe(`create` , ()=> {
    it('should create an author successfully', async () => {
   
      const author:CreateAuthorDTO = authors[0]
      const result = await authorService.create(author)
  
      expect(result.message).toBe('Author created successfully');
  
    } );
  })

  describe(`update` , ()=> {
    it(`should update author successfully` , async ()=> {
      const author:CreateAuthorDTO = authors[0]
      const createdAuthor = await authorModel.create(author)

     const updateAuthorDTO: UpdateAuthorDTO = {
       firstName: 'Updated first name',
       lastName: `Updated last name`
     };

     const result = await authorService.update(createdAuthor._id.toString(), updateAuthorDTO);


     expect(result.message).toBe('Author updated successfully');
     expect(result.data.firstName).toBe('Updated first name');
     expect(result.data.lastName).toBe('Updated last name');
    
         
    })

    it(`should throw an exception if author is not found` , async ()=> {
     try {
      const author:CreateAuthorDTO = authors[0]
      const createdAuthor = await authorModel.create(author)

     const updateAuthorDTO: UpdateAuthorDTO = {
       firstName: 'Updated first name',
       lastName: `Updated last name`
     };

     const result = await authorService.update(`6743319f574a22b2054eac85`, updateAuthorDTO);
   }catch(error) {
     expect(error.message).toBe('Author not found');
   }
     


    })
 })

 describe(`findMultiple` , ()=> {
  it(`should return an array of authors` , async ()=> {
   const createdAuthors = await authorModel.insertMany(authors);
   const search:AuthorSearchDTO = {
     search: `John` ,
     country: `John Country`
   }


   const foundBooks = await authorService.findMultiple(search)
   expect(foundBooks.message).toBe(`Authors fetched successfully`)
   expect(foundBooks.data.length).toBe(1)

  })

  it(`should return an empty array` , async ()=> {
    const search:AuthorSearchDTO = {
      search: `John` ,
      country: `John Country`
    }
     const result = await  authorService.findMultiple(search)
     expect(result.message).toBe(`No Authors found`)
     expect(result.data.length).toBe(0)
  })

})

describe(`findOne` , ()=>{
  it(`should return an author` , async ()=> {


    const author:CreateAuthorDTO = authors[0]
    const createdAuthor = await authorModel.create(author);

    const foundAuthor = await authorService.findOne(createdAuthor._id.toString())
    expect(foundAuthor.message).toBe(`Author fetched successfully`)

   })

   it(`should return an exception if author is not found` , async ()=> {
        try{
        const result = await authorService.findOne(`67430c9981bbdb3798e30ef5`)
        } catch(error) {
          expect(error.message).toBe('Author not Found');
        }
        
   })

})

describe(`remove` ,  ()=> {
  it(`should delete an author successfully` , async ()=> {
    const author:CreateAuthorDTO = authors[0]
    const createdAuthor = await authorModel.create(author);

    const deletedAuthor = await authorService.remove(createdAuthor._id.toString())
    expect(deletedAuthor.message).toBe(`Author deleted successfully`)
    

  })

  it(`should return an exception if author is not found` , async ()=> {
    try{
    const result = await authorService.remove(`67430c9981bbdb3798e30ef5`)
    } catch(error) {
      expect(error.message).toBe('Author not found');
    }
    
  })
})

});
