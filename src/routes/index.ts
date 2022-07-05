import { Router } from 'express';

import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { postRoutes } from './post.routes';
import { commentRoutes } from './comment.routes';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(postRoutes);
routes.use(commentRoutes);

export default routes;
