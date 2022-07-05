import 'reflect-metadata';
import { FakePostRepository } from '../../../post/repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../../../post/useCases/CreatePost/CreatePostUseCase';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { FakeCommentRepository } from '../../repository/fake/FakeCommentRepository'
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { CreateCommentUseCase } from '../CreateComment/CreateCommentUseCase';
import { UpdateCommentUseCase } from './UpdateCommentUsecase';
import { Post } from '../../../post/entities/Post';
import { User } from '../../../user/entities/User';
import { Comment } from '../../entities/Comment';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let fakeCommentRepository: FakeCommentRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;
let createComment: CreateCommentUseCase;
let updateComment: UpdateCommentUseCase;

describe('UpdateComment', () => {
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
    updateComment = new UpdateCommentUseCase(fakeCommentRepository);

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

  it('Should be able to update a comment', async () => {

    const commentExists = await updateComment.execute({
      id: comment.id,
      userId: user.id,
      description: 'Another description',
    })

    expect(commentExists).toEqual(
      expect.objectContaining({
        description: 'Another description',
      })
    );
  });

  it('Should not be able to Update a non existing comment', async () => {
    expect(updateComment.execute({
      id: 'non-existing-id',
      userId: user.id,
      description: 'Another description',
    })).rejects.toHaveProperty('message', 'Comment not found');
  });
});
