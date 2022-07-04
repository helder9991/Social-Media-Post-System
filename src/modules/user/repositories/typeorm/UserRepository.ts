import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { connection } from '../../../../database/typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  repository: Repository<User>;

  constructor() {
    this.repository = connection.getRepository(User);
  }

  async create({ email, name }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id: v4(),
      name,
      email,
    });

    await this.repository.save(user);

    return user;
  }

  async list(): Promise<User[]> {
    const users = this.repository.find({
      select: ['name', 'email'],
    });

    return users;
  }

  findByEmail(email: string): Promise<User | null | undefined> {
    const user = this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export { UserRepository };
