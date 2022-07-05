import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { Post } from '../../entities/Post';
import { IPostRepository } from '../../repository/interface/IPostRepository';

interface IUpdatePostParams {
  id: string;
  title: string;
  description: string;
  userId: string;
}

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute({ userId, id, title, description }: IUpdatePostParams): Promise<Post> {
    const postExists = await this.postRepository.show(id);

    if (!postExists) throw new AppError('Post not found', 400);

    if (postExists.userId !== userId) throw new AppError('Not authorized', 401);

    const post = await this.postRepository.update({ id, title, description });

    return post;
  }
}

export { UpdatePostUseCase };
