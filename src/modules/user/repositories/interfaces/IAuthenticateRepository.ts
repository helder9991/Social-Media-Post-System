/* eslint-disable no-unused-vars */
import { IAuhtenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';

interface IToken {
  token: string
}

interface IAuthenticateRepository {
  create(data: IAuhtenticateUserDTO): IToken;
}

export { IAuthenticateRepository, IToken };
