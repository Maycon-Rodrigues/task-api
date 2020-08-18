import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tasks } from '../entity/Tasks';

export default {
  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await getRepository(Tasks).find();

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async store(req: Request, res: Response) {
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: 'Precisa informar o campo (title)' });
    }
    try {
      const task = await getRepository(Tasks).save({ title });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async finishTask(req: Request, res: Response) {
    const { id } = req.params;
    const { done } = req.body;

    try {
      const task = await getRepository(Tasks).update(id, { done });

      if (task.affected === 1) {
        const newtask = await getRepository(Tasks).findOne(id);
        return res.status(200).json(newtask);
      }

      return res.status(404).json({ message: 'Task not found' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
