import { Router } from 'express';

import UpdateUserController from '../modules/user/controllers/UpdateUserController';
import CreateUserController from '../modules/user/controllers/CreateUserController';
import ListUsersController from '../modules/user/controllers/ListUsersController';
import DeleteUserController from '../modules/user/controllers/DeleteUserController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const userRoutes = Router();

userRoutes.post('/user', (req, res) => CreateUserController.handle(req, res));
userRoutes.get('/users', (req, res) => ListUsersController.handle(req, res));

userRoutes.put('/user/:id', ensureAuthenticated, (req, res) => UpdateUserController.handle(req, res));
userRoutes.delete('/user/:id', ensureAuthenticated, (req, res) => DeleteUserController.handle(req, res));

export { userRoutes };
