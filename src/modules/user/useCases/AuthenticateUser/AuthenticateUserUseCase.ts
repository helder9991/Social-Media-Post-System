import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { IAuthenticateRepository, IToken } from '../../repositories/interfaces/IAuthenticateRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IAuthenticateUserParams {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('AuthenticateRepository')
    private authenticateRepository: IAuthenticateRepository,
  ) { }

  async execute({ email, password }: IAuthenticateUserParams): Promise<IToken> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('User not found', 400);

    const { token } = this.authenticateRepository.create({ id: user.id });
    return { token };
  }
}

export { AuthenticateUserUseCase };
