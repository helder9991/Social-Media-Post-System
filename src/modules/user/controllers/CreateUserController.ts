import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { CreateUserUseCase } from '../useCases/CreateUser/CreateUserUseCase';
import { trimObjectValues } from '../../../util/trimObjectValues';

class CreateUserController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { name, email, password } = req.body;

    ({ name, email, password } = trimObjectValues({ name, email, password }));

    if (!(await this.schema.isValid({ name, email, password }))) throw new AppError('Validation Fails', 400);

    const createUserUseCase: CreateUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({ name, email, password });

    return res.status(201).json({ name, email });
  }
}

export default new CreateUserController();
