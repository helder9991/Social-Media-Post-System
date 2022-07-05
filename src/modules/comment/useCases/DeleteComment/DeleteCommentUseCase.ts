import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { IPostRepository } from '../../../post/repository/interface/IPostRepository';
import { ICommentRepository } from '../../repository/interface/ICommentRepository';

interface IDeleteCommentParams {
  id: string;
  userId: string;
}

@injectable()
class DeleteCommentUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute({ id, userId }: IDeleteCommentParams): Promise<boolean> {
    const commentExists = await this.commentRepository.show(id);

    if (!commentExists) throw new AppError('Comment not found', 400);

    const post = await this.postRepository.show(commentExists.postId);

    let deletedBy;

    if (commentExists.userId === userId) deletedBy = 'commentOwner';
    else if (post?.userId === userId) deletedBy = 'postOwner';
    else throw new AppError('Not authorized', 401);

    const comment = await this.commentRepository.delete({ id, deletedBy });

    return comment;
  }
}

export { DeleteCommentUseCase };
