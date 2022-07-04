import { Router } from 'express';

import CreatePostController from '../modules/post/controllers/CreatePostController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const postRoutes = Router();

postRoutes.post('/post', ensureAuthenticated, (req, res) => CreatePostController.handle(req, res));

export { postRoutes };
