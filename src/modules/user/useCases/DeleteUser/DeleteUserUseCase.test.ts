import 'reflect-metadata';
import { FakeUserRepository } from '../../repositories/fake/FakeUserRepository';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { DeleteUserUseCase } from './DeleteUserUseCase';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserUseCase;
let deleteUser: DeleteUserUseCase;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUserUseCase(fakeUserRepository);
    deleteUser = new DeleteUserUseCase(fakeUserRepository);
  });

  it('Should be able to delete an existing user', async () => {
    const { id } = await createUser.execute({
      name: 'John 1',
      email: 'john1@mail.com',
      password: 'password',
    });

    const deletedUser = await deleteUser.execute({ id });

    expect(deletedUser).toBeTruthy();
  });
  it('Should not be able to delete a non existing user', async () => {
    expect(deleteUser.execute({ id: 'non-existing-id' }))
      .rejects.toHaveProperty('message', 'User not found');
  });
});
