import 'reflect-metadata';
import { User } from '../../../user/entities/User';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { Post } from '../../entities/Post';
import { FakePostRepository } from '../../repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../CreatePost/CreatePostUseCase';
import { ShowPostUseCase } from './ShowPostUseCase';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;
let showPost: ShowPostUseCase;

describe('ShowPost', () => {
  let user: User;
  let post: Post;

  beforeAll(async () => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    showPost = new ShowPostUseCase(fakePostRepository);
    createUser = new CreateUserUseCase(fakeUserRepository);

    user = await createUser.execute({
      email: 'johm@mail.com',
      name: 'John',
      password: 'password',
    });

    post = await createPost.execute({
      userId: user.id,
      title: 'Title #1',
      description: 'Post description',
    });
  });

  it('Should be able to show a post', async () => {
    const findPost = await showPost.execute({ id: post.id });

    expect(findPost).toEqual(
      expect.objectContaining({
        title: 'Title #1',
        description: 'Post description',
      }),
    );
  });

  it('Should not be able to show a non existing post', async () => {
    expect(showPost.execute({ id: 'non-existing-id' }))
      .rejects.toHaveProperty('message', 'Post not found');
  });
});
