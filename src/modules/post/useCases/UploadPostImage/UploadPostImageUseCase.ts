import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { Post } from '../../entities/Post';
import { IPostRepository } from '../../repository/interface/IPostRepository';

interface IUploadPostImageParams {
  id: string;
  url: string;
  userId: string;
  key: string;
}

@injectable()
class UploadPostImageUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute({ userId, id, url, key }: IUploadPostImageParams): Promise<Post> {
    const postExists = await this.postRepository.show(id);

    if (!postExists) throw new AppError('Post not found', 400);

    if (postExists.userId !== userId) throw new AppError('Not authorized', 401);

    const post = await this.postRepository.updateImage({ userId, id, url, key });

    return post;
  }
}

export { UploadPostImageUseCase };
