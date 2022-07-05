import { v4 } from 'uuid';
import { ICreateCommentDTO } from '../../dtos/ICreateCommentDTO';
import { IUpdateCommentDTO } from '../../dtos/IUpdateCommentDTO';

import { Comment } from '../../entities/Comment';
import { ICommentRepository } from '../interface/ICommentRepository';

class FakeCommentRepository implements ICommentRepository {
  comments: Array<Comment> = [];

  async create({ userId, postId, description }: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, {
      id: v4(),
      userId,
      postId,
      description
    });

    this.comments.push(comment);

    return comment;
  }

  async show(id: string): Promise<Comment | null | undefined> {
    const commentExists = this.comments.find(comment => comment.id === id);

    return commentExists
  }

  async update({ id, description }: IUpdateCommentDTO): Promise<Comment> {
    const updatedComment = new Comment();

    Object.assign(updatedComment, {
      id,
      description,
    });

    this.comments = this.comments.map((post) => (post.id === id ? { ...post, ...updatedComment } : post));

    return updatedComment;
  }

}

export { FakeCommentRepository };
