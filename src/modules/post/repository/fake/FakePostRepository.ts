import { v4 } from 'uuid';
import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';

import { Post } from '../../entities/Post';
import { IPostRepository } from '../interface/IPostRepository';

class FakePostRepository implements IPostRepository {
  posts: Array<Post> = [];

  async create({ userId, title, description }: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, {
      id: v4(),
      userId,
      title,
      description
    });

    this.posts.push(post);

    return post;
  }
}

export { FakePostRepository };
