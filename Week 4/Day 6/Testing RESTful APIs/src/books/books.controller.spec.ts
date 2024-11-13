import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { NotFoundException } from '@nestjs/common';
import { booksId , users , updates , initialBook } from '../constants/testing';
import { UpdateBookDTO } from './dtos/update-book-dto';
import { CreateBookDTO } from './dtos/create-book-dto';




const newBook =   {
  id: `1` ,
  title: 'The Catcher in the Rye',
  authors: ['J.D. Salinger'],
  pages: 277,
  genres: [`Adventure`],
  publicationDate: '1951-07-16',
  isbn: '9780316769488',
  borrower:null
}

const bookUpdated = {
  id: `1` ,
  title: 'Updated Title',
  authors: ['J.D. Salinger'],
  pages: 500,
  genres: [`Adventure`],
  publicationDate: '1951-07-16',
  isbn: '9780316769488',
  borrower:null
}

describe('BooksController', () => {
  let controller: BooksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers:[
        BooksService,
        {
          provide:BooksService , 
          useValue:{
            findMultiple:jest.fn().mockImplementation(()=> Promise.resolve(booksId)) ,
            findOne:jest.fn().mockImplementation(async (id:string)=> {
                       const result = booksId.find((book)=> book.id === id)
                       if(!result){
                         throw new NotFoundException;
                       }
                       return result
            }) ,
            update:jest.fn().mockImplementation((id:string , updates:Partial<UpdateBookDTO>)=> {
              const result = booksId.find((book)=> book.id === id)
              
              if(!result){
                throw new NotFoundException;
              }
              for(const [key , value] of Object.entries(updates)) {
                  if(value !== undefined) {
                    result[key] = updates[key]
                  }
              }
              return result
            }) ,
            remove:jest.fn().mockImplementation((id:string)=> {
              const result = booksId.find((book)=> book.id === id)
              if(!result){
                throw new NotFoundException;
              }
              return result
            }) ,
            borrow:jest.fn().mockImplementation((bookId:string , userId:string)=> {
              const book = booksId.find((book)=> book.id === bookId)
              const user = users.find((user)=> user.userId === userId)
              if(!book || !user) {
                throw new NotFoundException()
              }
              else if(book.borrower !== null) {
                return {
                  message:`This book is borrowed by another user`
                }
              }

              return {
                message:`You have borrowed the book`
              }

            }),
            return:jest.fn().mockImplementation((bookId:string , userId:string)=> {
              const book = booksId.find((book)=> book.id === bookId)
              const user = users.find((user)=> user.userId === userId)
              if(!book || !user) {
                throw new NotFoundException()
              }
              else if(book.borrower === null || book.borrower !== userId) {
                return {
                  message:`You have not borrowed this book`
                }
              }

              return {
                message:`You have returned the book`
              }
            }),
            create:jest.fn().mockImplementation((createBookDto:CreateBookDTO)=> ({...createBookDto , id:`1`}))
          }
        }
      ]
    }).compile();

    controller = module.get<BooksController>(BooksController);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(`findMultiple` , ()=> {
      it(`finds books` , async ()=> {
        const foundBooks = await controller.findMultiple({page:undefined , limit:undefined , filter:undefined});
        expect(foundBooks).toEqual(booksId);

      })
  })

  describe(`findOne` , ()=> {
    it(`finds specific book` , async ()=> {
        const foundBook = await controller.findOne(`1`);
        expect(foundBook).toEqual(newBook)
    })

    it(`throws an error if book is not found` , async ()=> {
      await expect(controller.findOne(`10`)).rejects.toThrow(NotFoundException)
      
  })
  
  })

  describe(`update` , ()=> {
    it(`updates specific book` , async ()=> {
        const updatedBook = await controller.update(`1` , updates);
        console.log(`Updated Book:`)
        console.log(updatedBook)
        expect(updatedBook).toEqual(bookUpdated)
    })

    it(`throws an error if book is not found` , async ()=> {
      await expect(controller.update(`10` ,updates)).rejects.toThrow(NotFoundException)
      
  })

  })

  describe(`remove` , ()=> {
    it(`removes specific book` , async ()=> {
        const foundBook = await controller.remove(`2`);
        expect(foundBook).toEqual(booksId[1])
    })

    it(`throws an error if book is not found` , async ()=> {
      await expect(controller.remove(`10`)).rejects.toThrow(NotFoundException)
      
  })
  
  })


  describe(`borrow` , ()=> {
     it(`book is successfully borrowed` , async ()=> {
          const result = await controller.borrow(`1` , {user:users[0]})
          expect(result).toEqual({message: "You have borrowed the book"})
     })

     it(`book is already borrowed` , async ()=> {
      const result = await controller.borrow(`2` , {user:users[0]})
      expect(result).toEqual({message: "This book is borrowed by another user"})
  })
    
  it(`throws an error if book is not found` , async ()=> {
    await expect(controller.borrow(`10` , {user:users[0]})).rejects.toThrow(NotFoundException)
   
  })
  it(`throws an error if user is not found` , async ()=> {
    await expect(controller.borrow(`10` , {user:{userId:`20`}})).rejects.toThrow(NotFoundException)
  
  })
  })

  describe(`return` , ()=> {
    it(`book is not borrowed` , async ()=> {
         const result = await controller.return(`1` , {user:users[0]})
         expect(result).toEqual({message: "You have not borrowed this book"})
    })

    it(`book is not borrowed(User id is wrong)` , async ()=> {
     const result = await controller.return(`2` , {user:users[1]})
     expect(result).toEqual({message: "You have not borrowed this book"})
 })
   
 it(`throws an error if book is not found` , async ()=> {
   await expect(controller.return(`10` , {user:users[0]})).rejects.toThrow(NotFoundException)
  
 })
 it(`throws an error if user is not found` , async ()=> {
   await expect(controller.return(`1` , {user:{userId:`20`}})).rejects.toThrow(NotFoundException)
 
 })

 it(`book is successfully returned` , async ()=> {
  const result = await controller.return(`2` , {user:users[0]})
  expect(result).toEqual({message: "You have returned the book"})
 })
 })

 describe(`create` , ()=> {
    it(`creates a book` , async ()=> {
        const createdBook = await controller.create(initialBook)
        expect(createdBook).toEqual({...initialBook , id:`1`})
    })
 })
  

;
});
