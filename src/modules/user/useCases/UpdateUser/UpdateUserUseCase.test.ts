import 'reflect-metadata';
import { FakeUserRepository } from '../../repositories/fake/FakeUserRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserUseCase;
let updateUser: UpdateUserUseCase;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUserUseCase(fakeUserRepository);
    updateUser = new UpdateUserUseCase(fakeUserRepository);
  });

  it('Should be able to update user', async () => {
    const newUser = await createUser.execute({
      name: 'John 1',
      email: 'john@mail.com',
      password: 'password',
    });

    const users = await updateUser.execute({
      id: newUser.id,
      name: 'John 2',
      email: 'john@mail.com',
    });

    expect(users).toEqual(
      expect.objectContaining({
        name: 'John 2',
        email: 'john@mail.com',
      }),
    );
  });

  it('Should not be able to update a non existing user', async () => {
    expect(updateUser.execute({
      id: 'non-existing-id',
      name: 'non-existing-name',
      email: 'non-existing@mail.com',
    }))
      .rejects.toHaveProperty('message', 'User not found');
  });
});
