import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { UpdateCommentUseCase } from '../useCases/UpdateComment/UpdateCommentUsecase';

class UpdateCommentController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
      userId: Yup.string().required(),
      description: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { description } = req.body;
    let { id } = req.params;
    let { id: userId } = req.user;

    ({ id, description, userId } = trimObjectValues({ id, description, userId }));

    if (!(await this.schema.isValid({ id, userId, description }))) throw new AppError('Validation Fails', 400);

    const updateCommentUseCase: UpdateCommentUseCase = container.resolve(UpdateCommentUseCase);

    let { postId, deletedBy } = await updateCommentUseCase.execute({ id, userId, description });

    return res.status(200).json({ id, description, postId, userId, deletedBy });
  }
}

export default new UpdateCommentController();
