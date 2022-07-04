import { Router } from 'express';

import UpdateUserController from '../modules/user/controllers/UpdateUserController';
import CreateUserController from '../modules/user/controllers/CreateUserController';
import ListUsersController from '../modules/user/controllers/ListUsersController';
import DeleteUserController from '../modules/user/controllers/DeleteUserController';

const userRoutes = Router();

userRoutes.post('/user', (req, res) => CreateUserController.handle(req, res));
userRoutes.get('/users', (req, res) => ListUsersController.handle(req, res));
userRoutes.put('/user/:id', (req, res) => UpdateUserController.handle(req, res));
userRoutes.delete('/user/:id', (req, res) => DeleteUserController.handle(req, res));

export { userRoutes };
