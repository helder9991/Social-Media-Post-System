import 'reflect-metadata';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { FakePostRepository } from '../../repository/fake/FakePostRepository';
import { CreatePostUseCase } from './CreatePostUseCase';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;

describe('CreatePost', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    createUser = new CreateUserUseCase(fakeUserRepository);
  });

  it('Should be able to create a post', async () => {
    const user = await createUser.execute({
      email: 'johm@mail.com',
      name: 'John',
      password: 'password',
    });

    const post = await createPost.execute({
      userId: user.id,
      title: 'Title #1',
      description: 'Post description',
    });

    expect(post).toHaveProperty('id');
  });
});
