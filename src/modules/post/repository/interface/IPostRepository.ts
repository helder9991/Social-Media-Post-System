/* eslint-disable no-unused-vars */
import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { IUpdatePostDTO } from '../../dtos/IUpdatePostDTO';
import { IUploadPostImageDTO } from '../../dtos/IUploadPostImageDTO';
import { Post } from '../../entities/Post';

interface PostReport {
  title: string;
  commentariesNum: number;
}

interface IPostRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  show(id: string): Promise<Post | null | undefined>;
  showReport(): Promise<PostReport[]>;
  update(data: IUpdatePostDTO): Promise<Post>;
  updateImage(data: IUploadPostImageDTO): Promise<Post>;
  delete(id: string): Promise<boolean>;
}

export { IPostRepository, PostReport };
