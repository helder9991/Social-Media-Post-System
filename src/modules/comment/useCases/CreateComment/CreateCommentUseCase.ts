import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { IPostRepository } from '../../../post/repository/interface/IPostRepository';
import { Comment } from '../../entities/Comment';
import { ICommentRepository } from '../../repository/interface/ICommentRepository';

interface ICreateCommentParams {
  userId: string;
  postId: string;
  description: string;
}

@injectable()
class CreateCommentUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute({ userId, postId, description }: ICreateCommentParams): Promise<Comment> {
    const post = await this.postRepository.show(postId);

    if (!post) throw new AppError('Post not found', 400);

    const comment = await this.commentRepository.create({ userId, postId, description });

    return comment;
  }
}

export { CreateCommentUseCase };
