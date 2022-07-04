import { v4 } from 'uuid';

import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
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

  async list(): Promise<User[]> {
    const { users } = this;

    return users;
  }

  async findByEmail(email: string): Promise<User | null | undefined> {
    const userExists = this.users.find((user) => user.email === email);

    return userExists;
  }

  async findById(id: string): Promise<User | null | undefined> {
    const userExists = this.users.find((user) => user.id === id);

    return userExists;
  }

  async update({ id, email, name }: IUpdateUserDTO): Promise<User> {
    const updatedUser = {
      id,
      email,
      name,
    };

    this.users = this.users.map((user) => (user.id === id ? updatedUser : user));

    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const newUsersList = this.users.filter((user) => user.id !== id);
    const deleted = newUsersList < this.users;

    this.users = newUsersList;

    return deleted;
  }
}

export { FakeUserRepository };
