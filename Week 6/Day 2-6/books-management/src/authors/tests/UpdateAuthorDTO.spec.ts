import { validate } from 'class-validator';
import { UpdateAuthorDTO } from '../dtos/UpdateAuthorDTO';

describe('UpdateAuthorDTO Validation', () => {

  it('should pass validation when valid data is provided', async () => {
    const updateAuthorDTO = new UpdateAuthorDTO();
    updateAuthorDTO.biography = `John's biography`
    updateAuthorDTO.country = `John's country`
    const errors = await validate(updateAuthorDTO);
    expect(errors.length).toBe(0); 
  });
  
  
});
