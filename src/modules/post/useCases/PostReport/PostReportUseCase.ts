import { inject, injectable } from 'tsyringe';
import { IPostRepository, PostReport } from '../../repository/interface/IPostRepository';


@injectable()
class PostReportUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) { }

  async execute(): Promise<PostReport[]> {
    const postReport = await this.postRepository.showReport();

    return postReport;
  }
}

export { PostReportUseCase };
