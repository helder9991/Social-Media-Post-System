import { v4 } from 'uuid';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

class FakeUserRepository implements IUserRepository {
  users: Array<User> = [];

  async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null | undefined> {
    const userExists = this.users.find((user) => user.email === email);

    return userExists;
  }
}

export { FakeUserRepository };
