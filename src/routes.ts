import { Router, Request, Response } from 'express';
import TaskController from './controller/TaskController';

const router = Router();

router.get('/tasks', TaskController.getTasks);
router.post('/tasks', TaskController.store);
router.put('/tasks/:id', TaskController.finishTask);

export default router;
