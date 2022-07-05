import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateCommentController from '../modules/comment/controllers/CreateCommentController';
import DeleteCommentController from '../modules/comment/controllers/DeleteCommentController';
import ShowCommentController from '../modules/comment/controllers/ShowCommentController';
import UpdateCommentController from '../modules/comment/controllers/UpdateCommentController';
import { UpdateCommentUseCase } from '../modules/comment/useCases/UpdateComment/UpdateCommentUsecase';

const commentRoutes = Router();

commentRoutes.get('/comment/:id', (req, res) => ShowCommentController.handle(req, res));
commentRoutes.post('/comment', ensureAuthenticated, (req, res) => CreateCommentController.handle(req, res));
commentRoutes.put('/comment/:id', ensureAuthenticated, (req, res) => UpdateCommentController.handle(req, res));
commentRoutes.delete('/comment/:id', ensureAuthenticated, (req, res) => DeleteCommentController.handle(req, res));

export { commentRoutes };
