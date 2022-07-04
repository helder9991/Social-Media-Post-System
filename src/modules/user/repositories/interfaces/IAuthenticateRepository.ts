/* eslint-disable no-unused-vars */
import { IAuhtenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';

interface IToken {
  token: string
}

interface IAuthenticateRepository {
  create(data: IAuhtenticateUserDTO): Promise<IToken>;
}

export { IAuthenticateRepository, IToken };
