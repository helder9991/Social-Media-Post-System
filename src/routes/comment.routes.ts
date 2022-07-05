import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateCommentController from '../modules/comment/controllers/CreateCommentController';
import ShowCommentController from '../modules/comment/controllers/ShowCommentController';
import UpdateCommentController from '../modules/comment/controllers/UpdateCommentController';
import { UpdateCommentUseCase } from '../modules/comment/useCases/UpdateComment/UpdateCommentUsecase';

const commentRoutes = Router();

commentRoutes.get('/comment/:id', (req, res) => ShowCommentController.handle(req, res));
commentRoutes.post('/comment', ensureAuthenticated, (req, res) => CreateCommentController.handle(req, res));
commentRoutes.put('/comment/:id', ensureAuthenticated, (req, res) => UpdateCommentController.handle(req, res));

export { commentRoutes };
