/* eslint-disable no-unused-vars */
import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { Post } from '../../entities/Post';

interface IPostRepository {
  create(data: ICreatePostDTO): Promise<Post>;
}

export { IPostRepository };
