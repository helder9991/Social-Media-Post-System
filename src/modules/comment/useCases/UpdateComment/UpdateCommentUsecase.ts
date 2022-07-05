import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { Comment } from '../../entities/Comment';
import { ICommentRepository } from '../../repository/interface/ICommentRepository';

interface IUpdateCommentParams {
  id: string;
  userId: string;
  description: string;
}

@injectable()
class UpdateCommentUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) { }

  async execute({ userId, id, description }: IUpdateCommentParams): Promise<Comment> {
    const commentExists = await this.commentRepository.show(id);

    if (!commentExists) throw new AppError('Comment not found', 400);

    if (commentExists.userId !== userId) throw new AppError('Not authorized', 401);

    const comment = await this.commentRepository.update({ id, description });

    return comment;
  }
}

export { UpdateCommentUseCase };
