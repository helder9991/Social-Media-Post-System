import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface ICreateUserParams {
  email: string;
  name: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute({ email, name }: ICreateUserParams): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) throw new AppError('This user already exists', 400);

    const user = await this.userRepository.create({ email, name });

    return user;
  }
}

export { CreateUserUseCase };
