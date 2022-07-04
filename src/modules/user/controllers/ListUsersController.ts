import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from '../useCases/ListUsers/ListUsersUseCase';

class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listUsersUseCase: ListUsersUseCase = container.resolve(ListUsersUseCase);
    const users = await listUsersUseCase.execute();

    return res.status(200).json(users);
  }
}

export default new ListUsersController();
