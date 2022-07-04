import { Repository } from "typeorm";
import { v4 } from "uuid";

import { connection } from "../../../../database/typeorm";
import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import { Post } from "../../entities/Post";
import { IPostRepository } from "../interface/IPostRepository";

class PostRepository implements IPostRepository {
  repository: Repository<Post>;

  constructor() {
    this.repository = connection.getRepository(Post);
  }

  async create({ userId, title, description }: ICreatePostDTO): Promise<Post> {
    const post = this.repository.create({
      id: v4(),
      userId,
      title,
      description
    })

    await this.repository.save(post);

    return post;
  }

  async show(id: string): Promise<Post | null | undefined> {
    const postExists = this.repository.findOneBy({
      id
    });

    return postExists
  }
}

export { PostRepository }