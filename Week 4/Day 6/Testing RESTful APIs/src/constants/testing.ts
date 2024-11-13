import { UpdateBookDTO } from "src/books/dtos/update-book-dto";
import { CreateBookDTO } from "src/books/dtos/create-book-dto";

export const booksId = [
    {
      id: `1` ,
      title: 'The Catcher in the Rye',
      authors: ['J.D. Salinger'],
      pages: 277,
      genres: [`Adventure`],
      publicationDate: '1951-07-16',
      isbn: '9780316769488',
      borrower:null
    },
    {
      id:`2` ,
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      pages: 281,
      genres: [`Adventure`],
      publicationDate: '1960-07-11',
      isbn: '9780061120084',
      borrower: `1`
    },
    {
      id: `3` ,
      title: '1984',
      authors: ['George Orwell'],
      pages: 328,
      genres: [`Adventure`],
      publicationDate: '1949-06-08',
      isbn: '9780451524935',
      borrower:`4`
    },
    {
      id: `4` ,
      title: 'Educated: A Memoir',
      authors: ['Tara Westover'],
      pages: 352,
      genres: [`Adventure`],
      publicationDate: '2018-02-20',
      isbn: '9780399590504',
      borrower:null
    },
    {
      id:`5` ,
      title: 'Sapiens: A Brief History of Humankind',
      authors: ['Yuval Noah Harari'],
      pages: 443,
      genres: [`Adventure`],
      publicationDate: '2011-01-01',
      isbn: '9780062316097',
      borrower: `2`
    },
  ];

  export const users = [
    {
      userId:`1` ,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'user',  
    },
    {
      userId:`2` ,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      role: 'admin',  
    },
    {
      userId:`3` ,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      password: 'password789',
      role: 'user',  
    },
    {
      userId:`4` ,
      firstName: 'Bob',
      lastName: 'Williams',
      email: 'bob.williams@example.com',
      password: 'password101',
      role: 'admin', 
    },
  ];

  export const books = [
    {
      title: 'The Catcher in the Rye',
      authors: ['J.D. Salinger'],
      pages: 277,
      genres: [`Adventure`],
      publicationDate: '1951-07-16',
      isbn: '9780316769488',
    },
    {
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      pages: 281,
      genres: [`Adventure`],
      publicationDate: '1960-07-11',
      isbn: '9780061120084',
    },
    {
      title: '1984',
      authors: ['George Orwell'],
      pages: 328,
      genres: [`Adventure`],
      publicationDate: '1949-06-08',
      isbn: '9780451524935',
    },
    {
      title: 'Educated: A Memoir',
      authors: ['Tara Westover'],
      pages: 352,
      genres: [`Adventure`],
      publicationDate: '2018-02-20',
      isbn: '9780399590504',
    },
    {
      title: 'Sapiens: A Brief History of Humankind',
      authors: ['Yuval Noah Harari'],
      pages: 443,
      genres: [`Adventure`],
      publicationDate: '2011-01-01',
      isbn: '9780062316097',
    },
  ];
  

  export const updates:UpdateBookDTO ={
    title: 'Updated Title',
    pages:500 ,
    authors:undefined ,
    publicationDate:undefined ,
    genres:undefined ,
    isbn:undefined
  }
  // The undefined in updates are to simulate the behaviour of the @IsOptional decorator in UpdateBookDTO

  export const initialBook:CreateBookDTO ={
    title: 'The Great Adventure',
    authors: [ 'John Doe', 'Jane Smith' ],
    pages: 350,
    genres: [ 'Fantasy' ],
    publicationDate: new Date('2022-05-15T00:00:00.000Z'),
    isbn: '978-3-16-148410-0' 
  }