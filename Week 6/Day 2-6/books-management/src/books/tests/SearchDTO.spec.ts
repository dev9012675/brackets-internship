import { validate } from 'class-validator';
import { SearchDTO } from '../dtos/SearchDTO';

describe('SearchDTO Validation', () => {


  it('should pass validation when valid data is provided', async () => {
    const searchDTO = new SearchDTO();
    searchDTO.search = ' Book Title';
    searchDTO.genre = `Fantasy`
    searchDTO.page = 2
    searchDTO.limit = 5
 

    const errors = await validate(searchDTO);
    expect(errors.length).toBe(0); 
  });
  
  it('should fail when faulty data is provided', async () => {

    const searchDTO = new SearchDTO();
    searchDTO.search = 'Book Description';
    searchDTO.genre = `random`
    searchDTO.page = -1
    searchDTO.limit = 0
 

    const errors = await validate(searchDTO);
    expect(errors.length).toBeGreaterThan(1); 
    console.log(errors)
  
});

})
