import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { hash } from 'bcryptjs';
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

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id: v4(),
      name,
      email,
      password: await hash(password, 8),
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
      select: ['id', 'name', 'email', 'password'],
    });

    return user;
  }

  async findById(id: string): Promise<User | null | undefined> {
    const userExists = this.repository.findOneBy({
      id,
    });

    return userExists;
  }

  async update({ id, email, name }: IUpdateUserDTO): Promise<User> {
    const updatedUser = await this.repository.save({
      id,
      email,
      name,
    });

    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.repository.delete({
      id,
    });

    const deleted = user.affected === 1;

    return deleted;
  }
}

export { UserRepository };
