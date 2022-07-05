import { v4 } from 'uuid';
import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { IUpdatePostDTO } from '../../dtos/IUpdatePostDTO';
import { IUploadPostImageDTO } from '../../dtos/IUploadPostImageDTO';

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

  async show(id: string): Promise<Post | null | undefined> {
    const postExists = this.posts.find(post => post.id === id);

    return postExists
  }

  async update({ id, title, description }: IUpdatePostDTO): Promise<Post> {
    const updatedPost = new Post();

    Object.assign(updatedPost, {
      id,
      title,
      description,
    });

    this.posts = this.posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post));

    return updatedPost;
  }

  async updateImage({ id, userId, url, key }: IUploadPostImageDTO): Promise<Post> {
    const updatedPost = new Post();

    Object.assign(updatedPost, {
      id,
      userId,
      url,
      key
    });

    this.posts = this.posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post));

    return updatedPost;
  }

  async delete(id: string): Promise<boolean> {
    const newPostsList = this.posts.filter((post) => post.id !== id);
    const deleted = newPostsList < this.posts;

    this.posts = newPostsList;

    return deleted;
  }
}

export { FakePostRepository };
