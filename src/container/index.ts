import { container } from 'tsyringe';
import { IAuthenticateRepository } from '../modules/user/repositories/interfaces/IAuthenticateRepository';
import { IUserRepository } from '../modules/user/repositories/interfaces/IUserRepository';
import { AuthenticateRepository } from '../modules/user/repositories/typeorm/AuthenticateRepository';
import { UserRepository } from '../modules/user/repositories/typeorm/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IAuthenticateRepository>('AuthenticateRepository', AuthenticateRepository);
