import 'reflect-metadata';
import { FakePostRepository } from '../../../post/repository/fake/FakePostRepository';
import { CreatePostUseCase } from '../../../post/useCases/CreatePost/CreatePostUseCase';
import { FakeUserRepository } from '../../../user/repositories/fake/FakeUserRepository';
import { FakeCommentRepository } from '../../repository/fake/FakeCommentRepository'
import { CreateUserUseCase } from '../../../user/useCases/CreateUser/CreateUserUseCase';
import { CreateCommentUseCase } from '../CreateComment/CreateCommentUseCase';
import { DeleteCommentUseCase } from '../DeleteComment/DeleteCommentUseCase';
import { Post } from '../../../post/entities/Post';
import { User } from '../../../user/entities/User';
import { Comment } from '../../entities/Comment';

let fakePostRepository: FakePostRepository;
let fakeUserRepository: FakeUserRepository;
let fakeCommentRepository: FakeCommentRepository;
let createPost: CreatePostUseCase;
let createUser: CreateUserUseCase;
let createComment: CreateCommentUseCase;
let deleteComment: DeleteCommentUseCase;

describe('DeleteComment', () => {
  let postOwner: User;
  let commentOwner: User;
  let anotherUser: User;
  let post: Post;
  let comment: Comment;

  beforeEach(async () => {
    fakePostRepository = new FakePostRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeCommentRepository = new FakeCommentRepository();
    createPost = new CreatePostUseCase(fakePostRepository);
    createUser = new CreateUserUseCase(fakeUserRepository);
    createComment = new CreateCommentUseCase(fakeCommentRepository, fakePostRepository);
    deleteComment = new DeleteCommentUseCase(fakeCommentRepository, fakePostRepository);

    postOwner = await createUser.execute({
      email: 'johm@mail.com',
      name: 'John',
      password: 'password',
    });

    commentOwner = await createUser.execute({
      email: 'anne@mail.com',
      name: 'Anne',
      password: 'password',
    });

    anotherUser = await createUser.execute({
      email: 'another@mail.com',
      name: 'Another',
      password: 'password',
    });

    post = await createPost.execute({
      userId: postOwner.id,
      title: 'Title #1',
      description: 'Post description',
    });

    comment = await createComment.execute({
      userId: commentOwner.id,
      postId: post.id,
      description: 'Post description',
    });

  });

  it('Should be able to delete a comment', async () => {

    const deleted = await deleteComment.execute({
      id: comment.id,
      userId: commentOwner.id
    })

    expect(deleted).toBeTruthy();
  });

  it('Should not be able to delete a non existing comment', async () => {
    expect(deleteComment.execute({
      id: 'non-existing-id',
      userId: commentOwner.id,
    })).rejects.toHaveProperty('message', 'Comment not found');
  });

  it('Should be able to the owner post delete any commentary', async () => {
    const deleted = deleteComment.execute({
      id: comment.id,
      userId: postOwner.id,
    });

    expect(deleted).toBeTruthy();
  });

  it('Should not be able to delete any commentary if the user is not the owner post or owner commentary', async () => {
    expect(deleteComment.execute({
      id: comment.id,
      userId: anotherUser.id
    })).rejects.toHaveProperty('message', 'Not authorized');
  });
});
