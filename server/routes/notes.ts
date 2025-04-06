import { Router } from 'express';

import { createNote, getNotes } from '@server/services/notes';
import { middlewareWrapper, zodSchemaValidator } from '@server/middlewares';
import { createNoteSchema, getNotesQueryParamsSchema } from '@shared/schemas';
import { GetNotesQueryParams } from '@shared/types/api';

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
  zodSchemaValidator(getNotesQueryParamsSchema, 'query', 'parsedQuery'),
  middlewareWrapper(async (_, res) => {
    const parsedQuery = res.locals.parsedQuery as GetNotesQueryParams;
    const response = await getNotes(parsedQuery);
    res.status(200).json(response);
  })
);

export { notesRouter };
