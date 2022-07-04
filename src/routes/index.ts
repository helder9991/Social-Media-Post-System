import { Router } from 'express';

import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { postRoutes } from './post.routes';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(postRoutes);

export default routes;
