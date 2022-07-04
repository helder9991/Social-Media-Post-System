import { inject, injectable } from 'tsyringe';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepostory: IUserRepository,
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.userRepostory.list();

    return users;
  }
}

export { ListUsersUseCase };
