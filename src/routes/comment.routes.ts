import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateCommentController from '../modules/comment/controllers/CreateCommentController';
import ShowCommentController from '../modules/comment/controllers/ShowCommentController';

const commentRoutes = Router();

commentRoutes.get('/comment/:id', (req, res) => ShowCommentController.handle(req, res));
commentRoutes.post('/comment', ensureAuthenticated, (req, res) => CreateCommentController.handle(req, res));

export { commentRoutes };
