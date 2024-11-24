import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { AuthorsService } from '../authors/authors.service';
import {  MongoMemoryReplSet } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { ConnectOptions } from 'mongoose';
import { Author, AuthorSchema } from '../authors/author.schema';
import { Book, BookSchema } from './book.schema';
import { CreateBookDTO } from './dtos/CreateBookDTO';
import { NotFoundException } from '@nestjs/common';
import { UpdateBookDTO } from './dtos/UpdateBookDTO';
import { authors } from '../constants/testData.constants';
import { SearchDTO } from './dtos/SearchDTO';




describe('BooksService',  () => {
  let bookService: BooksService;
  let authorService:AuthorsService
  let authorModel , bookModel  , replset
  

  beforeAll(async () => {
    
     replset =  await MongoMemoryReplSet.create({ replSet: { count: 1 } }); 
    const mongoUri = await replset.getUri();
 
   
    const mongoConnection = (await mongoose.connect(mongoUri, {  replicaSet: 'testset'  } as ConnectOptions)).connection;
  
    authorModel = mongoConnection.model(Author.name , AuthorSchema)
    bookModel = mongoConnection.model(Book.name , BookSchema)
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService , {provide: getModelToken(Book.name), useValue: bookModel} ,
         AuthorsService , {provide: getModelToken(Author.name), useValue: authorModel}],
    })
  .compile();

    bookService = module.get<BooksService>(BooksService);
    authorService = module.get<AuthorsService>(AuthorsService);

    

    

 
  } );

  afterAll(async () => {
    await mongoose.disconnect()
    await replset.stop()

  });

  beforeEach(async () => {
    await authorModel.deleteMany({});
    await bookModel.deleteMany({});
   

  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe(`create` , ()=> {
    it('should create a book successfully', async () => {
   
      const createdAuthors = await authorModel.insertMany(authors);
  
      const createBookDTO: CreateBookDTO = {
        title: 'New Book',
        authors: createdAuthors.map((author) => author._id),
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };
  
      const result = await bookService.create(createBookDTO);
  
      expect(result.message).toBe('Book created successfully');
  
      const updatedAuthors = await authorModel.find({ _id: { $in: createBookDTO.authors } });
      expect(updatedAuthors[0].books).toHaveLength(1);
      expect(updatedAuthors[1].books).toHaveLength(1);
    } );

    it('should throw NotFoundException if authors do not exist', async () => {
  
      const createBookDTO: CreateBookDTO = {
        title: 'Invalid Book',
        authors: [`674238a64f19cca1a942eade` , `674238c025e022af2c890167`],
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };
  
      await expect(bookService.create(createBookDTO)).rejects.toThrow(NotFoundException);
      await expect(bookService.create(createBookDTO)).rejects.toThrowError(
        new NotFoundException('Author not found'),
      );
    });

   

   
  })

  describe(`update` , ()=> {
     it(`should update book successfully(authors is present)` , async ()=> {
      const createdAuthors = await authorModel.insertMany(authors);
      const createBookDTO: CreateBookDTO = {
        title: 'Old Book',
        authors: createdAuthors.map((author) => author._id),
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };

      const createdBook = await bookModel.create(createBookDTO);

      const updateBookDTO: UpdateBookDTO = {
        title: 'Updated Book Title',
        authors: createdAuthors.map(a => a._id), 
      };

      const result = await bookService.update(createdBook._id.toString(), updateBookDTO);

 
      expect(result.message).toBe('Book updated successfully.');
      expect(result.data.title).toBe('Updated Book Title');
      expect(result.data.authors).toHaveLength(2);
     
          
     })

     it(`should throw an exception if author is not found` , async ()=> {
      try {
      const createdAuthors = await authorModel.insertMany(authors);
      const createBookDTO: CreateBookDTO = {
        title: 'Old Book',
        authors: createdAuthors.map((author) => author._id),
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };

      const createdBook = await bookModel.create(createBookDTO);

      const updateBookDTO: UpdateBookDTO = {
        title: 'Updated Book Title',
        authors: [`67424bf35a76166d6194feff`], 
      };

        await bookService.update(createdBook, updateBookDTO)
    }catch(error) {
      expect(error.message).toBe('Author not found');
    }
      


     })

     it(`should throw an exception if book is not found` , async ()=> {
            try{
              const updateBookDTO: UpdateBookDTO = {
                title: 'Updated Book Title',
                authors: [],
              };
              await bookService.update(`67424f4af67ae529ab6fc8d4` , updateBookDTO)
            }catch(error){
              expect(error.message).toBe('Book not found');
            }
     })

     it(`should update book successfully(authors is not present)` , async ()=> {
      const createdAuthors = await authorModel.insertMany(authors);
      const createBookDTO: CreateBookDTO = {
        title: 'Old Book',
        authors: createdAuthors.map((author) => author._id),
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };

      const createdBook = await bookModel.create(createBookDTO);

      const updateBookDTO: UpdateBookDTO = {
        title: 'Updated Book Title(No Authors)',
        authors: [], 
      };

      const result = await bookService.update(createdBook._id.toString(), updateBookDTO);

 
      expect(result.message).toBe('Book updated successfully.');
      expect(result.data.title).toBe('Updated Book Title(No Authors)');
     })
  })


  describe(`findMultiple` , ()=> {
     it(`should return an array of books` , async ()=> {
      const createdAuthors = await authorModel.insertMany(authors);
  
      const createBookDTO: CreateBookDTO = {
        title: 'New Book',
        authors: createdAuthors.map((author) => author._id),
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };

      const search:SearchDTO = {
        search: `description` ,
        genre: `Fantasy`
      }

      const book = await bookService.create(createBookDTO);
      const book2 = await bookService.create({...createBookDTO , title : `Book 2` , isbn:`0-8075-2182-5`});

      const foundBooks = await bookService.findMultiple(search)
      expect(foundBooks.message).toBe(`Books fetched successfully`)
      expect(foundBooks.data.length).toBe(2)

     })

     it(`should return an empty array` , async ()=> {
        const search:SearchDTO = {
          search: `description` ,
          genre: `Fantasy`
        }
        const result = await  bookService.findMultiple(search)
        expect(result.message).toBe(`No books found`)
        expect(result.data.length).toBe(0)
     })

  })

  describe(`findOne` , ()=>{
    it(`should return a book` , async ()=> {
      const createdAuthors = await authorModel.insertMany(authors);
  
      const createBookDTO: CreateBookDTO = {
        title: 'New Book',
        authors: createdAuthors.map((author) => author._id),
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };


      const book = await bookModel.create(createBookDTO);
      const book2 = await bookModel.create({...createBookDTO , title : `Book 2` , isbn:`0-8075-2182-5`});

      const foundBook = await bookService.findOne(book._id.toString())
      expect(foundBook.message).toBe(`Book fetched successfully`)

     })

     it(`should return an exception if book is not found` , async ()=> {
          try{
          const result = await bookService.findOne(`67430c9981bbdb3798e30ef5`)
          } catch(error) {
            expect(error.message).toBe('Book not found');
          }
          
     })

  })

  describe(`remove` ,  ()=> {
    it(`should delete a book successfully` , async ()=> {
      const createdAuthors = await authorModel.insertMany(authors);
  
      const createBookDTO: CreateBookDTO = {
        title: 'New Book',
        authors: createdAuthors.map((author) => author._id),
        description:`description` ,
        publisher: `publisher` ,
        pages:300 ,
        genres: [`Science Fiction` , `Fantasy`] ,
        isbn: `0-1928-6306-1` ,
        publishedDate: new Date()
      };


      const book = await bookModel.create(createBookDTO);
      const book2 = await bookModel.create({...createBookDTO , title : `Book 2` , isbn:`0-8075-2182-5`});

      const deletedBook = await bookService.remove(book._id.toString())
      expect(deletedBook.message).toBe(`Book deleted successfully`)
      

    })

    it(`should return an exception if book is not found` , async ()=> {
      try{
      const result = await bookService.remove(`67430c9981bbdb3798e30ef5`)
      } catch(error) {
        expect(error.message).toBe('Book not found');
      }
      
    })
  })


});
