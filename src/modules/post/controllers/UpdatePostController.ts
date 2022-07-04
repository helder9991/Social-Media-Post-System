import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { UpdatePostUseCase } from '../useCases/UpdatePost/UpdatePostUseCase';

class UpdatePostController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
      userId: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { title, description } = req.body;
    let { id } = req.params;
    let { id: userId } = req.user;

    if (!userId) throw new AppError('Not authorized', 401);

    ({ id, userId, title, description } = trimObjectValues({ id, userId, title, description }));

    if (!(await this.schema.isValid({ id, userId, title, description }))) throw new AppError('Validation Fails', 400);

    const updatePostUseCase: UpdatePostUseCase = container.resolve(UpdatePostUseCase);

    await updatePostUseCase.execute({ id, userId, description, title });

    return res.status(201).json({ id, description, title });
  }
}

export default new UpdatePostController();
