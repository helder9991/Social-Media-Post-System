import 'reflect-metadata';
import { FakeUserRepository } from '../../repositories/fake/FakeUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUserUseCase(fakeUserRepository);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John',
      email: 'john@mail.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a user with a existing email', async () => {
    await createUser.execute({
      name: 'John 1',
      email: 'john@mail.com',
    });

    expect(createUser.execute({
      name: 'John 2',
      email: 'john@mail.com',
    })).rejects.toHaveProperty('message', 'This user already exists');
  });
});
