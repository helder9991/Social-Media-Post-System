import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { DeleteCommentUseCase } from '../useCases/DeleteComment/DeleteCommentUseCase';

class DeleteCommentController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
      userId: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;
    let { id: userId } = req.user;

    if (!userId) throw new AppError('Not authorized', 401);

    ({ id, userId } = trimObjectValues({ id, userId }));

    if (!(await this.schema.isValid({ id, userId }))) throw new AppError('Validation Fails', 400);

    const deleteCommentUseCase: DeleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    await deleteCommentUseCase.execute({ id, userId });

    return res.status(204).json();
  }
}

export default new DeleteCommentController();
