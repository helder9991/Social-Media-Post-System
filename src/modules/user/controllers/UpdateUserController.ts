import * as Yup from 'yup';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from '../useCases/UpdateUser/UpdateUserUseCase';
import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';

class UpdateUserController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;
    let { name, email } = req.body;

    if (id !== req.user.id) throw new AppError('Not authorized', 401);

    ({ id, name, email } = trimObjectValues({ id, name, email }));

    if (!(await this.schema.isValid({ id, name, email }))) throw new AppError('Validation Fails', 400);

    const updateUserUseCase: UpdateUserUseCase = container.resolve(UpdateUserUseCase);
    const user = await updateUserUseCase.execute({ id, email, name });

    return res.status(200).json(user);
  }
}

export default new UpdateUserController();
