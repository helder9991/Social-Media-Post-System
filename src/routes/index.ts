import { Router } from 'express';

import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);

export default routes;
