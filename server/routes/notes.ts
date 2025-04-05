import { Router } from 'express';
import { createNote, getNotes } from '@server/services/notes';
import { middlewareWrapper } from '@server/middlewares';
import { createNoteSchema, getNotesQueryParamsSchema } from '@shared/schemas';

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

notesRouter.get(
  '/',
  middlewareWrapper(async (req, res, next) => {
    const schema = getNotesQueryParamsSchema;
    res.locals.parsedQuery = await schema.parseAsync(req.query);
    next();
  }),
  middlewareWrapper(async (_, res) => {
    const response = await getNotes(res.locals.parsedQuery);
    res.status(200).json(response);
  })
);

export { notesRouter };
