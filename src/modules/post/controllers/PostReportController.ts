import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { PostReportUseCase } from '../useCases/PostReport/PostReportUseCase';

class PostReportController {

  async handle(req: Request, res: Response): Promise<Response> {
    const postReportUseCase: PostReportUseCase = container.resolve(PostReportUseCase);

    const report = await postReportUseCase.execute();

    return res.status(200).json({ report });
  }
}

export default new PostReportController();
