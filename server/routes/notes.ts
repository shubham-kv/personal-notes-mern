import { Router } from 'express';
import { createNoteSchema } from '@shared/schemas';
import { middlewareWrapper } from '@server/middlewares/middleware-wrapper';
import { createNote } from '@server/services/notes';

const notesRouter = Router();

notesRouter.post(
  '/',
  middlewareWrapper(async (req, _, next) => {
    req.body = await createNoteSchema.parseAsync(req.body);
    next();
  }),
  middlewareWrapper(async (req, res) => {
    const createNoteResponse = await createNote(req.body);
    res.status(201).json(createNoteResponse);
  })
);

export { notesRouter };
