import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateCommentController from '../modules/comment/controllers/CreateCommentController';

const commentRoutes = Router();

commentRoutes.post('/comment', ensureAuthenticated, (req, res) => CreateCommentController.handle(req, res));

export { commentRoutes };
