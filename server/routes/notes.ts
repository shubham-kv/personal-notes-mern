import { Router } from 'express';

import { createNote, getNotes } from '@server/services/notes';
import { middlewareWrapper, zodSchemaValidator } from '@server/middlewares';

import { createNoteSchema, getNotesQueryParamsSchema } from '@shared/schemas';
import { CreateNoteData, GetNotesQueryParams } from '@shared/types/api';

const notesRouter = Router();

notesRouter.post(
  '/',
  zodSchemaValidator(createNoteSchema, 'body', 'parsedBody'),
  middlewareWrapper(async (_, res) => {
    const parsedBody = res.locals.parsedBody as CreateNoteData;
    const createNoteResponse = await createNote(parsedBody);
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
