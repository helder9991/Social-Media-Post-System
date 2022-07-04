import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { CreatePostUseCase } from '../useCases/CreatePost/CreatePostUseCase';

class CreatePostController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { title, description } = req.body;
    let { id } = req.user;

    if (!id) throw new AppError('Not authorized', 401);

    ({ id, title, description } = trimObjectValues({ id, title, description }));

    if (!(await this.schema.isValid({ id, title, description }))) throw new AppError('Validation Fails', 400);

    const createPostUseCase: CreatePostUseCase = container.resolve(CreatePostUseCase);

    await createPostUseCase.execute({ userId: id, title, description });

    return res.status(201).json({ title, description });
  }
}

export default new CreatePostController();
