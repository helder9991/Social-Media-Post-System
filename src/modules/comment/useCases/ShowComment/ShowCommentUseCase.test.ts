import 'reflect-metadata';
import { FakePostRepository } from '../../../post/repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../../../post/useCases/CreatePost/CreatePostUseCase';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { FakeCommentRepository } from '../../repository/fake/FakeCommentRepository'
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { CreateCommentUseCase } from '../CreateComment/CreateCommentUseCase';
import { ShowCommentUseCase } from '../ShowComment/ShowCommentUseCase';
import { Post } from '../../../post/entities/Post';
import { User } from '../../../user/entities/User';
import { Comment } from '../../entities/Comment';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let fakeCommentRepository: FakeCommentRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;
let createComment: CreateCommentUseCase;
let showComment: ShowCommentUseCase;

describe('ShowComment', () => {
  let user: User;
  let post: Post;
  let comment: Comment;

  beforeEach(async () => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeCommentRepository = new FakeCommentRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    createUser = new CreateUserUseCase(fakeUserRepository);
    createComment = new CreateCommentUseCase(fakeCommentRepository, fakePostRepository);
    showComment = new ShowCommentUseCase(fakeCommentRepository);

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

    comment = await createComment.execute({
      userId: user.id,
      postId: post.id,
      description: 'Post description',
    });

  });

  it('Should be able to show a comment', async () => {

    const commentExists = await showComment.execute({ id: comment.id })

    expect(commentExists).toEqual(
      expect.objectContaining({
        id: comment.id,
        userId: user.id,
        postId: post.id,
        description: 'Post description',
      })
    );
  });

  it('Should not be able to show a non existing comment', async () => {
    expect(showComment.execute({
      id: 'non-existing-id'
    })).rejects.toHaveProperty('message', 'Comment not found');
  });
});
