import 'reflect-metadata';
import { User } from '../../../user/entities/User';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { Post } from '../../entities/Post';
import { FakePostRepository } from '../../repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../CreatePost/CreatePostUseCase';
import { UpdatePostUseCase } from './UpdatePostUseCase';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;
let updatePost: UpdatePostUseCase;

describe('UpdatePost', () => {
  let user: User;
  let post: Post;

  beforeAll(async () => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    updatePost = new UpdatePostUseCase(fakePostRepository);
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

  it('Should be able to update a post', async () => {
    const findPost = await updatePost.execute({
      id: post.id,
      userId: user.id,
      title: 'Another title',
      description: 'Another description',
    });

    expect(findPost).toEqual(
      expect.objectContaining({
        title: 'Another title',
        description: 'Another description',
      }),
    );
  });

  it('Should not be able to update a non existing post', async () => {

    expect(updatePost.execute({
      id: 'non-existing-id',
      userId: user.id,
      title: 'Another title',
      description: 'Another description',
    })).rejects.toHaveProperty('message', 'Post not found');

  });

  it('Should not be able to update a post with a wrong token', async () => {

    expect(updatePost.execute({
      id: post.id,
      userId: user.id,
      title: 'Another title',
      description: 'Another description',
    })).rejects.toHaveProperty('message', 'Not authorized');

  });
});
