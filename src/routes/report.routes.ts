import { Router } from 'express';

import CreatePostController from '../modules/post/controllers/CreatePostController';
import PostReportController from '../modules/post/controllers/PostReportController';

const reportRoutes = Router();

reportRoutes.get('/report/post', (req, res) => PostReportController.handle(req, res));


export { reportRoutes };
