import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { ShowCommentUseCase } from '../useCases/ShowComment/ShowCommentUseCase';

class ShowCommentController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;

    ({ id } = trimObjectValues({ id }));

    if (!(await this.schema.isValid({ id }))) throw new AppError('Validation Fails', 400);

    const showCommentUseCase: ShowCommentUseCase = container.resolve(ShowCommentUseCase);

    const { description, postId, userId, deletedBy } = await showCommentUseCase.execute({ id });

    if (deletedBy) {
      return res.status(200).json({ deletedBy });
    }

    return res.status(200).json({ id, description, postId, userId });
  }
}

export default new ShowCommentController();
