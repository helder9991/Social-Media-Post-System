import { Router } from 'express';

import CreateUserController from '../modules/user/controllers/CreateUserController';
import ListUsersController from '../modules/user/controllers/ListUsersController';

const userRoutes = Router();

userRoutes.post('/user', (req, res) => CreateUserController.handle(req, res));
userRoutes.get('/users', (req, res) => ListUsersController.handle(req, res));

export { userRoutes };
