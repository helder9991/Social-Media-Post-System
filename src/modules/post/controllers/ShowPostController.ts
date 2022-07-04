import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { CreatePostUseCase } from '../useCases/CreatePost/CreatePostUseCase';
import { ShowPostUseCase } from '../useCases/ShowPost/ShowPostUseCase';

class CreatePostController {
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

    const showPostUseCase: ShowPostUseCase = container.resolve(ShowPostUseCase);

    const { userId, description, title } = await showPostUseCase.execute({ id });

    return res.status(201).json({ id, userId, description, title });
  }
}

export default new CreatePostController();
