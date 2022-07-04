import { container } from 'tsyringe';
import { IPostRepository } from '../modules/post/repository/interface/IPostRepository';
import { PostRepository } from '../modules/post/repository/typeorm/PostRepository';
import { IAuthenticateRepository } from '../modules/user/repositories/interfaces/IAuthenticateRepository';
import { IUserRepository } from '../modules/user/repositories/interfaces/IUserRepository';
import { AuthenticateRepository } from '../modules/user/repositories/typeorm/AuthenticateRepository';
import { UserRepository } from '../modules/user/repositories/typeorm/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IAuthenticateRepository>('AuthenticateRepository', AuthenticateRepository);
container.registerSingleton<IPostRepository>('PostRepository', PostRepository);
