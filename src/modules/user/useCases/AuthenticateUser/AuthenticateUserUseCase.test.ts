import 'reflect-metadata';
import { FakeUserRepository } from '../../repositories/fake/FakeUserRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { FakeAuthenticateRepository } from '../../repositories/fake/FakeAuthenticationRepository';

let fakeUserRepository: FakeUserRepository;
let fakeAuthenticateRepository: FakeAuthenticateRepository;
let createUser: CreateUserUseCase;
let authenticateUser: AuthenticateUserUseCase;

describe('AuthenticateUser', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeAuthenticateRepository = new FakeAuthenticateRepository();
    createUser = new CreateUserUseCase(fakeUserRepository);
    authenticateUser = new AuthenticateUserUseCase(fakeUserRepository, fakeAuthenticateRepository);

    await createUser.execute({
      name: 'John',
      email: 'john@mail.com',
      password: 'password',
    });
  });

  it('Should be able to authenticate in the application', async () => {
    const token = await authenticateUser.execute({ email: 'john@mail.com', password: 'password' });

    expect(token).toHaveProperty('token');
  });

  it('Should not be able to authenticate in the application with a non existing user', async () => {
    expect(authenticateUser.execute({ email: 'non-existing@mail.com', password: 'wrong-password' }))
      .rejects.toHaveProperty('message', 'User not found');
  });

  it('Should not be able to authenticate in the application with a wrong password', async () => {
    expect(authenticateUser.execute({ email: 'john@mail.com', password: 'wrong-password' }))
      .rejects.toHaveProperty('message', 'Login or password invalid');
  });
});
