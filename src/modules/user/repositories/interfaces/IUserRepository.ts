/* eslint-disable no-unused-vars */
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null | undefined>;
  list(): Promise<User[]>;
}

export { IUserRepository };
