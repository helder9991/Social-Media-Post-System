import { Router } from 'express';

import AuthenticateUserController from '../modules/user/controllers/AuthenticateUserController';

const authRoutes = Router();

authRoutes.post('/auth', (req, res) => AuthenticateUserController.handle(req, res));

export { authRoutes };
