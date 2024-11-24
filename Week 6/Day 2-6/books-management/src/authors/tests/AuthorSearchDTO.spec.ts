import { validate } from 'class-validator';
import { AuthorSearchDTO } from '../dtos/AuthorSearchDTO';

describe('AuthorSearchDTO Validation', () => {


  it('should pass validation when valid data is provided', async () => {
    const authorSearchDTO = new AuthorSearchDTO();
     authorSearchDTO.search = `Search`
     authorSearchDTO.country = `country`
 

    const errors = await validate(authorSearchDTO);
    expect(errors.length).toBe(0); 
  });
  


})
