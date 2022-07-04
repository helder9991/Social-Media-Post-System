import { Router } from 'express';

import CreatePostController from '../modules/post/controllers/CreatePostController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import ShowPostController from '../modules/post/controllers/ShowPostController';
import UpdatePostController from '../modules/post/controllers/UpdatePostController';
import DeletePostController from '../modules/post/controllers/DeletePostController';

const postRoutes = Router();

postRoutes.post('/post', ensureAuthenticated, (req, res) => CreatePostController.handle(req, res));
postRoutes.get('/post/:id', (req, res) => ShowPostController.handle(req, res));
postRoutes.put('/post/:id', ensureAuthenticated, (req, res) => UpdatePostController.handle(req, res));
postRoutes.delete('/post/:id', ensureAuthenticated, (req, res) => DeletePostController.handle(req, res));

export { postRoutes };
