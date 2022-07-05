import { Router } from 'express';

import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { postRoutes } from './post.routes';
import { commentRoutes } from './comment.routes';
import { reportRoutes } from './report.routes';

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(postRoutes);
routes.use(commentRoutes);
routes.use(reportRoutes);

export default routes;
