import { Router } from 'express';

import CreatePostController from '../modules/post/controllers/CreatePostController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import ShowPostController from '../modules/post/controllers/ShowPostController';

const postRoutes = Router();

postRoutes.post('/post', ensureAuthenticated, (req, res) => CreatePostController.handle(req, res));
postRoutes.get('/post/:id', (req, res) => ShowPostController.handle(req, res));

export { postRoutes };
