import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUser/AuthenticateUserUseCase';

class AuthenticateUserController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { email, password } = req.body;

    ({ email, password } = trimObjectValues({ email, password }));

    if (!(await this.schema.isValid({ email, password }))) throw new AppError('Validation Fails', 400);

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const { token } = await authenticateUserUseCase.execute({ email, password });

    return res.status(201).json({ token });
  }
}

export default new AuthenticateUserController();
