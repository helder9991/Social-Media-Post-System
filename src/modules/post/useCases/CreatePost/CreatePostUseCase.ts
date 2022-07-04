import { inject, injectable } from 'tsyringe';
import { Post } from '../../entities/Post';
import { IPostRepository } from '../../repository/interface/IPostRepository';

interface ICreatePostParams {
  userId: string;
  title: string;
  description: string;
}

@injectable()
class CreatePostUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute({ userId, title, description }: ICreatePostParams): Promise<Post> {

    const post = await this.postRepository.create({ userId, title, description });

    return post;
  }
}

export { CreatePostUseCase };
