import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { Post } from '../../entities/Post';
import { IPostRepository } from '../../repository/interface/IPostRepository';

interface IShowPostParams {
  id: string;
}

@injectable()
class ShowPostUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute({ id }: IShowPostParams): Promise<Post> {
    const post = await this.postRepository.show(id);

    if (!post) throw new AppError('Post not found', 400);

    return post;
  }
}

export { ShowPostUseCase };
