import * as Yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../util/AppError';
import { trimObjectValues } from '../../../util/trimObjectValues';
import { DeleteUserUseCase } from '../useCases/DeleteUser/DeleteUserUseCase';

class DeleteUserController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.string().required(),
    });
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;

    if (id !== req.user.id) throw new AppError('Not authorized', 401);

    ({ id } = trimObjectValues({ id }));

    if (!(await this.schema.isValid({ id }))) throw new AppError('Validation Fails', 400);

    const deleteUserUseCase: DeleteUserUseCase = container.resolve(DeleteUserUseCase);
    await deleteUserUseCase.execute({ id });

    return res.status(204).send();
  }
}

export default new DeleteUserController();
