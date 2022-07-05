import 'reflect-metadata';
import { FakePostRepository } from '../../../post/repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../../../post/useCases/CreatePost/CreatePostUseCase';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { FakeCommentRepository } from '../../repository/fake/FakeCommentRepository'
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { CreateCommentUseCase } from './CreateCommentUseCase';
import { Post } from '../../../post/entities/Post';
import { User } from '../../../user/entities/User';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let fakeCommentRepository: FakeCommentRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;
let createComment: CreateCommentUseCase;

describe('CreateComment', () => {
  let user: User;
  let post: Post;

  beforeEach(async () => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeCommentRepository = new FakeCommentRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    createUser = new CreateUserUseCase(fakeUserRepository);
    createComment = new CreateCommentUseCase(fakeCommentRepository, fakePostRepository);

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

  it('Should be able to create a comment', async () => {

    const createPost = await createComment.execute({
      userId: user.id,
      postId: post.id,
      description: 'Post description',
    });

    expect(createPost).toEqual(
      expect.objectContaining({
        userId: user.id,
        postId: post.id,
        description: 'Post description',
      })
    );
  });

  it('Should not be able to create a comment with a non existing postId', async () => {

    expect(createComment.execute({
      userId: user.id,
      postId: 'non-existing-postId',
      description: 'Post description',
    })).rejects.toHaveProperty('message', 'Post not found');
  });
});
