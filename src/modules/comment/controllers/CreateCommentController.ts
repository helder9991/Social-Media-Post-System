import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { CreateCommentUseCase } from '../useCases/CreateComment/CreateCommentUseCase';

class CreateCommentController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      postId: Yup.string().required(),
      userId: Yup.string().required(),
      description: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { postId, description } = req.body;
    let { id: userId } = req.user;

    if (!userId) throw new AppError('Not authorized', 401);

    ({ userId, postId, description } = trimObjectValues({ userId, postId, description }));

    if (!(await this.schema.isValid({ userId, postId, description }))) throw new AppError('Validation Fails', 400);

    const createCommentUseCase: CreateCommentUseCase = container.resolve(CreateCommentUseCase);

    await createCommentUseCase.execute({ userId, postId, description });

    return res.status(201).json({ userId, postId, description });
  }
}

export default new CreateCommentController();
