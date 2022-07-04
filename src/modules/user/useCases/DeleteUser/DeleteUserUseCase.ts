import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IDeleteUserUseCase {
  id: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepostory: IUserRepository,
  ) { }

  async execute({ id }: IDeleteUserUseCase): Promise<boolean> {
    const deleted = await this.userRepostory.delete(id);

    if (!deleted) throw new AppError('User not found', 400);

    return deleted;
  }
}

export { DeleteUserUseCase };
