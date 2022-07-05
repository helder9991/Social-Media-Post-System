import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../util/AppError';
import { deleteImageFromS3 } from '../../../../util/deleteImageFromS3';
import { IPostRepository } from '../../repository/interface/IPostRepository';

interface IDeletePostParams {
  id: string;
  userId: string;
}

@injectable()
class DeletePostUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute({ id, userId }: IDeletePostParams): Promise<boolean> {
    const postExists = await this.postRepository.show(id);

    if (!postExists) throw new AppError('Post not found', 400);

    if (postExists.userId !== userId) throw new AppError('Not authorized', 401);

    const deleted = await this.postRepository.delete(id);

    if (postExists?.key) deleteImageFromS3(postExists.key)

    return deleted;
  }
}

export { DeletePostUseCase };
