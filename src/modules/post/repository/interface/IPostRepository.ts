/* eslint-disable no-unused-vars */
import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { IUpdatePostDTO } from '../../dtos/IUpdatePostDTO';
import { Post } from '../../entities/Post';

interface IPostRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  show(id: string): Promise<Post | null | undefined>;
  update(data: IUpdatePostDTO): Promise<Post>;
}

export { IPostRepository };
