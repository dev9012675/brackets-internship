import { validate } from 'class-validator';
import { CreateAuthorDTO } from '../dtos/CreateAuthorDTO';

describe('CreateAuthorDTO Validation', () => {
  it('should fail when data is not provided', async () => {
    const createAuthorDTO = new CreateAuthorDTO();
    

    const errors = await validate(createAuthorDTO);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should pass validation when valid data is provided', async () => {
    const createAuthorDTO = new CreateAuthorDTO();
    createAuthorDTO.firstName = `John`
    createAuthorDTO.lastName = `Doe`
    createAuthorDTO.biography = `John's biography`
    createAuthorDTO.country = `John's country`
    createAuthorDTO.dateOfBirth = new Date()

    const errors = await validate(createAuthorDTO);
    expect(errors.length).toBe(0); 
  });
  
  it('should fail when faulty data is provided', async () => {
    const createAuthorDTO = new CreateAuthorDTO();
    createAuthorDTO.firstName = ``
    createAuthorDTO.lastName = ``
    createAuthorDTO.biography = ``
    createAuthorDTO.country = ``
    createAuthorDTO.dateOfBirth = new Date()
    createAuthorDTO.dateOfDeath = null
    const errors = await validate(createAuthorDTO);
    expect(errors.length).toBeGreaterThan(0);
    console.log(errors)
  });
  
});
