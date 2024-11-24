import { validate } from 'class-validator';
import { UpdateBookDTO } from '../dtos/UpdateBookDTO';

describe('UpdateBookDTO Validation', () => {


  it('should pass validation when valid data is provided', async () => {
    const updateBookDTO = new UpdateBookDTO();
    updateBookDTO.title = 'Updated Book Title';
 

    const errors = await validate(updateBookDTO);
    expect(errors.length).toBe(0); 
  });
  
  it('should fail when faulty data is provided', async () => {
    const BookDTO = new UpdateBookDTO();
    BookDTO.title = '';
    BookDTO.pages = -1;
    BookDTO.authors = ['author'];
    BookDTO.description = ``
    BookDTO.publisher = ``
    BookDTO.isbn = `0-8121212357`
    BookDTO.publishedDate = new Date()
    const errors = await validate(BookDTO);

    expect(errors.length).toBeGreaterThan(0);
    console.log(errors)
  });
  
});
