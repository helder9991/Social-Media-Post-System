import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IUpdateUserParams {
  id: string;
  email: string;
  name: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute({ id, email, name }: IUpdateUserParams): Promise<User> {
    let user = await this.userRepository.findById(id);

    if (!user) throw new AppError('User not found', 400);

    user = await this.userRepository.update({ id, email, name });

    return user;
  }
}

export { UpdateUserUseCase };
