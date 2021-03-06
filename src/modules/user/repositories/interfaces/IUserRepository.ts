/* eslint-disable no-unused-vars */
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { User } from '../../entities/User';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null | undefined>;
  findById(id: string): Promise<User | null | undefined>;
  list(): Promise<User[]>;
  update(data: IUpdateUserDTO): Promise<User>;
  delete(id: string): Promise<boolean>;
}

export { IUserRepository };
