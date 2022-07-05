import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { IPostRepository } from '../../../post/repository/interface/IPostRepository';
import { Comment } from '../../entities/Comment';
import { ICommentRepository } from '../../repository/interface/ICommentRepository';

interface IShowCommentParams {
  id: string;
}

@injectable()
class ShowCommentUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) { }

  async execute({ id }: IShowCommentParams): Promise<Comment> {
    const comment = await this.commentRepository.show(id);

    if (!comment) throw new AppError('Comment not found', 400);

    return comment;
  }
}

export { ShowCommentUseCase };
