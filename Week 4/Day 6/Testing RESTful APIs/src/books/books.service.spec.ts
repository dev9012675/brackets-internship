import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book  } from './books.schema';
import { CreateBookDTO } from './dtos/create-book-dto';
import {  Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User  } from '../users/users.schema';
import { UsersService } from '../users/users.service';
import { books , updates , initialBook } from '../constants/testing';

const fakeBook ={
  id: '672c73332cf0dc610b74ba20',
  title: 'The Great Adventure',
  authors: [ 'John Doe', 'Jane Smith' ],
  pages: 350,
  genres: [ 'Fantasy' ],
  publicationDate: '2022-05-15T00:00:00.000Z',
  isbn: '978-3-16-148410-0' , 
  borrower:null ,
  save:jest.fn().mockResolvedValue(true)
}

const updatedBook ={
  id: '672c73332cf0dc610b74ba20',
  title: 'Updated Title',
  authors: [ 'John Doe', 'Jane Smith' ],
  pages: 500,
  genres: [ 'Fantasy' ],
  publicationDate: '2022-05-15T00:00:00.000Z',
  isbn: '978-3-16-148410-0' ,
  borrower:null ,
  save:jest.fn().mockResolvedValue(true)

}




// The save property in updatedBook and fakeBook is for simulating the save() function for the borrow and return functions


const user = {
  firstName:`Fname` ,
  lastName: `lname` ,
  email: `email` ,
  role: `role` ,
  id: `id` ,
  password:`ab`
}



describe('BooksService', () => {
  let service: BooksService;
  let bookModel:Model<Book>
  let userModel:Model<User>
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            findById: jest.fn().mockResolvedValue(fakeBook),
            findByIdAndUpdate: jest.fn() ,
            findByIdAndDelete:jest.fn() ,
            create:jest.fn().mockImplementation((book:CreateBookDTO)=> Promise.resolve(book)) ,
            find:jest.fn().mockImplementation(()=> Promise.resolve(books))
          }
    }   ,
       UsersService , {
        provide:getModelToken(User.name),
        useValue: {
          findById:jest.fn()

        }
       }],
    }).compile();


    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<Book>>(getModelToken(Book.name))
    userModel = module.get<Model<User>>(getModelToken(User.name)) 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`findOne` , ()=>{
     it(`finds a book` , async ()=> {
         const result = await service.findOne(fakeBook.id)
         const modelSpy = jest.spyOn(bookModel , `findById`)
         expect(result).toEqual(fakeBook)
         expect(modelSpy).toHaveBeenCalledWith(fakeBook.id)
     })

     it('should throw an error if book not found', async () => {
        jest.spyOn(bookModel , `findById`).mockResolvedValue(null)

      try {
        await service.findOne('non-existent-id');
      } catch (error) {
        expect(error.message).toBe('Not Found');
      }
    })
  })

  describe(`update` , ()=>{
    it(`updates a book` , async ()=> {
        const modelSpy = jest.spyOn(bookModel , `findByIdAndUpdate`).mockResolvedValue(updatedBook)
        const result = await service.update(updatedBook.id , updates) 
        expect(result).toEqual(updatedBook)
        expect(modelSpy).toHaveBeenCalledWith(updatedBook.id , updates , {new:true})
    })

    it('should throw an error if book not found', async () => {
       jest.spyOn(bookModel , `findByIdAndUpdate`).mockResolvedValue(null)

     try {
       await service.update('non-existent-id' , updates);
     } catch (error) {
       expect(error.message).toBe('Not Found');
     }
   })
 })

 describe(`remove` , ()=>{
  it(`removes a book` , async ()=> {
      const modelSpy = jest.spyOn(bookModel , `findByIdAndDelete`).mockResolvedValue(updatedBook)
      const result = await service.remove(updatedBook.id) 
      expect(result).toEqual(updatedBook)
      expect(modelSpy).toHaveBeenCalledWith(updatedBook.id)
  })

  it('should throw an error if book not found', async () => {
     jest.spyOn(bookModel , `findByIdAndDelete`).mockResolvedValue(null)

   try {
     await service.remove('non-existent-id');
   } catch (error) {
     expect(error.message).toBe('Not Found');
   }
 })
})

describe(`borrow` , ()=>{
  it(`book is borrowed` , async ()=> {
    console.log("Updated Book")
      console.log(updatedBook)
      const modelSpy = jest.spyOn(bookModel , `findById`).mockResolvedValue(updatedBook)
      const userModelSpy = jest.spyOn(userModel , `findById`).mockResolvedValue(123)
      const result = await service.borrow(updatedBook.id , `Some user id`) 
      expect(result).toEqual({message:"You have borrowed the book"})
      expect(modelSpy).toHaveBeenCalledWith(updatedBook.id)
      expect(userModelSpy).toHaveBeenCalledWith(`Some user id`)
  })

  it(`book is already borrowed by another user` , async ()=> {
    console.log("Updated Book Change")
    console.log(updatedBook)
    const modelSpy = jest.spyOn(bookModel , `findById`).mockResolvedValue({...fakeBook , borrower: `Some user id`})
    const userModelSpy = jest.spyOn(userModel , `findById`).mockResolvedValue(user)
    const result = await service.borrow(updatedBook.id , `Some user id`) 
    expect(result).toEqual({message:"This book is borrowed by another user"})
    expect(modelSpy).toHaveBeenCalledWith(updatedBook.id)
    expect(userModelSpy).toHaveBeenCalledWith(`Some user id`)
})

  it('should throw an error if book not found', async () => {
     jest.spyOn(bookModel , `findById`).mockResolvedValue(null)

   try {
     await service.borrow('non-existent-id' , `User id`);
   } catch (error) {
     expect(error.message).toBe('Not Found');
   }
 })

 it('should throw an error if user not found', async () => {
  jest.spyOn(userModel , `findById`).mockResolvedValue(null)

  try {
    await service.borrow('non-existent-id' , `User id`);
  } catch (error) {
    expect(error.message).toBe('Not Found');
  }
  })
})

describe(`return` , ()=>{
  it(`book is returned` , async ()=> {
    console.log("Updated Book Return")
      console.log(updatedBook)
      const modelSpy = jest.spyOn(bookModel , `findById`).mockResolvedValue(updatedBook)
      const userModelSpy = jest.spyOn(userModel , `findById`).mockResolvedValue(123)
      const result = await service.return(updatedBook.id , `123`) 
      expect(result).toEqual({message:"You have returned the book"})
      expect(modelSpy).toHaveBeenCalledWith(updatedBook.id)
      expect(userModelSpy).toHaveBeenCalledWith(`123`)
  })

  it(`user id does not match borrower` , async ()=> {
    console.log("Updated Book Return Change")
    console.log(updatedBook)
    const modelSpy = jest.spyOn(bookModel , `findById`).mockResolvedValue({...fakeBook , borrower: `Some user id`})
    const userModelSpy = jest.spyOn(userModel , `findById`).mockResolvedValue(user)
    const result = await service.return(updatedBook.id , `Another user id`) 
    expect(result).toEqual({message:"You have not borrowed this book"})
    expect(modelSpy).toHaveBeenCalledWith(updatedBook.id)
    expect(userModelSpy).toHaveBeenCalledWith(`Another user id`)
})

it(`borrower is null` , async ()=> {
  console.log("Updated Book Return Change")
  console.log(updatedBook)
  const modelSpy = jest.spyOn(bookModel , `findById`).mockResolvedValue({...fakeBook , borrower: null})
  const userModelSpy = jest.spyOn(userModel , `findById`).mockResolvedValue(user)
  const result = await service.return(updatedBook.id , `Another user id`) 
  expect(result).toEqual({message:"You have not borrowed this book"})
  expect(modelSpy).toHaveBeenCalledWith(updatedBook.id)
  expect(userModelSpy).toHaveBeenCalledWith(`Another user id`)
})

  it('should throw an error if book not found', async () => {
     jest.spyOn(bookModel , `findById`).mockResolvedValue(null)

   try {
     await service.return('non-existent-id' , `User id`);
   } catch (error) {
     expect(error.message).toBe('Not Found');
   }
 })

 it('should throw an error if user not found', async () => {
  jest.spyOn(userModel , `findById`).mockResolvedValue(null)

  try {
    await service.return('non-existent-id' , `User id`);
  } catch (error) {
    expect(error.message).toBe('Not Found');
  }
  })
})

describe(`create` , ()=> {
    it(`creates a book` , async ()=> {
         const book = await service.create(initialBook)
         expect(book).toEqual(initialBook)
         const modelSpy = jest.spyOn(bookModel , `create`)
         expect(modelSpy).toHaveBeenCalledTimes(1)
         expect(modelSpy).toHaveBeenCalledWith(initialBook)

    })

    describe(`findMultiple` , ()=> {
        it(`finds books` , async ()=> {
           const foundBooks = await service.findMultiple()
           expect(foundBooks).toEqual(books)
           const modelSpy = jest.spyOn(bookModel , `find`)
           expect(modelSpy).toHaveBeenCalledTimes(1)
        })
    })

    
})




});
