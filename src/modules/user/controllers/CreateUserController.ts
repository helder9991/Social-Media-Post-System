import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { CreateUserUseCase } from '../useCases/CreateUser/CreateUserUseCase';

class CreateUserController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    if (!(await this.schema.isValid({ name, email }))) throw new AppError('Validation Fails', 400);

    const createUserUseCase: CreateUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({ name, email });

    return res.status(201).json({ name, email });
  }
}

export default new CreateUserController();