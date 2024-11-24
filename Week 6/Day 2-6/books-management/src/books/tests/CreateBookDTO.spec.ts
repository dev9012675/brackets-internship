import { validate } from 'class-validator';
import { CreateBookDTO } from '../dtos/CreateBookDTO';

describe('CreateBookDTO Validation', () => {
  it('should fail when data is not provided', async () => {
    const createBookDTO = new CreateBookDTO();
    

    const errors = await validate(createBookDTO);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should pass validation when valid data is provided', async () => {
    const createBookDTO = new CreateBookDTO();
    createBookDTO.title = 'Valid Book Title';
    createBookDTO.pages = 200;
    createBookDTO.authors = ['67430c9981bbdb3798e30ef5'];
    createBookDTO.description = `Description`
    createBookDTO.publisher = `publisher`
    createBookDTO.genres = [`Adventure`]
    createBookDTO.isbn = `0-8075-2182-5`
    createBookDTO.publishedDate = new Date()

    const errors = await validate(createBookDTO);
    expect(errors.length).toBe(0); 
  });
  
  it('should fail when faulty data is provided', async () => {
    const createBookDTO = new CreateBookDTO();
    createBookDTO.title = '';
    createBookDTO.pages = -1;
    createBookDTO.authors = ['author'];
    createBookDTO.description = ``
    createBookDTO.publisher = ``
    createBookDTO.isbn = `0-8121212357`
    createBookDTO.publishedDate = new Date()
    const errors = await validate(createBookDTO);

    expect(errors.length).toBeGreaterThan(0);
    console.log(errors)
  });
  
});
