/* eslint-disable no-unused-vars */
import { ICreateCommentDTO } from '../../dtos/ICreateCommentDTO';
import { Comment } from '../../entities/Comment';

interface ICommentRepository {
  create(data: ICreateCommentDTO): Promise<Comment>;
}

export { ICommentRepository };
