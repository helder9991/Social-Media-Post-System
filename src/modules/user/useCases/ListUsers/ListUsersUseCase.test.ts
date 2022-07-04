import 'reflect-metadata';
import { FakeUserRepository } from '../../repositories/fake/FakeUserRepository';
import { ListUsersUseCase } from './ListUsersUseCase';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserUseCase;
let listUsers: ListUsersUseCase;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUserUseCase(fakeUserRepository);
    listUsers = new ListUsersUseCase(fakeUserRepository);
  });

  it('Should be able to list all users', async () => {
    await createUser.execute({
      name: 'John 1',
      email: 'john1@mail.com',
      password: 'password',
    });

    await createUser.execute({
      name: 'John 2',
      email: 'john2@mail.com',
      password: 'password',
    });

    const users = await listUsers.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email: 'john1@mail.com' }),
        expect.objectContaining({ email: 'john2@mail.com' }),
      ]),
    );
  });
});
