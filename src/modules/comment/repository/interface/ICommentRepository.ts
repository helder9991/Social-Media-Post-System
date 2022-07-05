/* eslint-disable no-unused-vars */
import { ICreateCommentDTO } from '../../dtos/ICreateCommentDTO';
import { IUpdateCommentDTO } from '../../dtos/IUpdateCommentDTO';
import { Comment } from '../../entities/Comment';

interface ICommentRepository {
  create(data: ICreateCommentDTO): Promise<Comment>;
  show(id: string): Promise<Comment | null | undefined>;
  update(data: IUpdateCommentDTO): Promise<Comment>;
}

export { ICommentRepository };
