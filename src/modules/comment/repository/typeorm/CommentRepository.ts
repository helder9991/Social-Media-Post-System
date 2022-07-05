import { Repository } from "typeorm";
import { v4 } from "uuid";

import { connection } from "../../../../database/typeorm";
import { ICreateCommentDTO } from "../../dtos/ICreateCommentDTO";
import { IUpdateCommentDTO } from "../../dtos/IUpdateCommentDTO";
import { Comment } from "../../entities/Comment";
import { ICommentRepository } from "../interface/ICommentRepository";

class CommentRepository implements ICommentRepository {
  repository: Repository<Comment>;

  constructor() {
    this.repository = connection.getRepository(Comment);
  }

  async create({ userId, postId, description }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.repository.create({
      id: v4(),
      userId,
      postId,
      description
    })

    await this.repository.save(comment);

    return comment;
  }

  async show(id: string): Promise<Comment | null | undefined> {
    const comment = await this.repository.findOneBy({
      id
    });

    return comment;
  }

  async update({ id, description }: IUpdateCommentDTO): Promise<Comment> {
    const comment = await this.repository.save({
      id,
      description,
    });

    return comment;
  }
}

export { CommentRepository }