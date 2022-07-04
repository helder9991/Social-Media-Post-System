import 'reflect-metadata';
import { User } from '../../../user/entities/User';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { Post } from '../../entities/Post';
import { FakePostRepository } from '../../repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../CreatePost/CreatePostUseCase';
import { DeletePostUseCase } from './DeletePostUseCase';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let createPost: CreatePostUseCase;
let deletePost: DeletePostUseCase;
let createUser: CreateUserUseCase;

describe('DeletePost', () => {
  let user: User;
  let post: Post;

  beforeAll(async () => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    deletePost = new DeletePostUseCase(fakePostRepository);
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

  beforeEach(async () => {
    post = await createPost.execute({
      userId: user.id,
      title: 'Title #1',
      description: 'Post description',
    });
  });



  it('Should be able to delete a post', async () => {
    const deleted = await deletePost.execute({
      id: post.id,
      userId: user.id
    });

    expect(deleted).toBeTruthy();
  });

  it('Should not be able to delete a non existing post', async () => {
    expect(deletePost.execute({
      id: 'non-existing-id',
      userId: user.id
    }))
      .rejects.toHaveProperty('message', 'Post not found');
  });

  it('Should not be able to delete a post with a wrong token', async () => {
    expect(deletePost.execute({
      id: post.id,
      userId: 'wrong-token',
    })).rejects.toHaveProperty('message', 'Not authorized');
  });
});
