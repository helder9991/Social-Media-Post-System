import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';
import { AppError } from '../../../../util/AppError';
import { IAuhtenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IAuthenticateRepository, IToken } from '../interfaces/IAuthenticateRepository';

class AuthenticateRepository implements IAuthenticateRepository {
  async create({ id, recivedPassword, password }: IAuhtenticateUserDTO): Promise<IToken> {
    const passwordMatched = await compare(recivedPassword, password);

    if (!passwordMatched)
      throw new AppError('Login or password is invalid', 400);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: id,
      expiresIn,
    });

    return { token };
  }
}

export { AuthenticateRepository };
