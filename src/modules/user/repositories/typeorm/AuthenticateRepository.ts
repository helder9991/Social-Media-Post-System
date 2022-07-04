import { sign } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';
import { IAuhtenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IAuthenticateRepository, IToken } from '../interfaces/IAuthenticateRepository';

class AuthenticateRepository implements IAuthenticateRepository {
  create({ id }: IAuhtenticateUserDTO): IToken {
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: id,
      expiresIn,
    });

    return { token };
  }
}

export { AuthenticateRepository };
