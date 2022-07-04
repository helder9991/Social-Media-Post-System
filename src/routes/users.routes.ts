import { Router } from 'express';

import CreateUserController from '../modules/user/controllers/CreateUserController';

const userRoutes = Router();

userRoutes.post('/user', (req, res) => CreateUserController.handle(req, res));

export { userRoutes };
