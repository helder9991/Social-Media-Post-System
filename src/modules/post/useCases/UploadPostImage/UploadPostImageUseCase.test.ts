import 'reflect-metadata';
import { User } from '../../../user/entities/User';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { Post } from '../../entities/Post';
import { FakePostRepository } from '../../repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../CreatePost/CreatePostUseCase';
import { UploadPostImageUseCase } from './UploadPostImageUseCase';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;
let uploadPostImagePost: UploadPostImageUseCase;

describe('UploadPostImage', () => {
  let user: User;
  let post: Post;

  beforeAll(async () => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    uploadPostImagePost = new UploadPostImageUseCase(fakePostRepository);
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

  it('Should be able to update a post image', async () => {
    const findPost = await uploadPostImagePost.execute({
      id: post.id,
      userId: user.id,
      url: 'some-url',
      key: 'some-key'
    });

    expect(findPost).toEqual(
      expect.objectContaining({
        url: 'some-url'
      }),
    );
  });

  it('Should not be able to update a non existing post', async () => {
    expect(uploadPostImagePost.execute({
      id: 'non-existing-id',
      userId: user.id,
      url: 'some-url',
      key: 'some-key'
    })).rejects.toHaveProperty('message', 'Post not found');
  });

  it('Should not be able to update a post with a wrong token', async () => {
    expect(uploadPostImagePost.execute({
      id: post.id,
      userId: 'wrong-user-id',
      url: 'some-url',
      key: 'some-key'
    })).rejects.toHaveProperty('message', 'Not authorized');
  });
});
