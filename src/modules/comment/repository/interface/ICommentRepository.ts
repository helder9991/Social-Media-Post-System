/* eslint-disable no-unused-vars */
import { ICreateCommentDTO } from '../../dtos/ICreateCommentDTO';
import { IDeleteCommentDTO } from '../../dtos/IDeleteCommentDTO';
import { IUpdateCommentDTO } from '../../dtos/IUpdateCommentDTO';
import { Comment } from '../../entities/Comment';

interface ICommentRepository {
  create(data: ICreateCommentDTO): Promise<Comment>;
  show(id: string): Promise<Comment | null | undefined>;
  update(data: IUpdateCommentDTO): Promise<Comment>;
  delete(data: IDeleteCommentDTO): Promise<boolean>;
}

export { ICommentRepository };
