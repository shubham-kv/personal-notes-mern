import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from '@server/services/notes';

import {
  middlewareWrapper,
  mongoIdParamValidator,
  zodSchemaValidator,
} from '@server/middlewares';

import {
  createNoteSchema,
  getNotesQueryParamsSchema,
  updateNoteSchema,
} from '@shared/schemas';

import {
  CreateNoteData,
  GetNotesQueryParams,
  UpdateNoteData,
} from '@shared/types/api';

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

notesRouter.get(
  '/:id',
  mongoIdParamValidator('id'),
  middlewareWrapper(async (req, res) => {
    const response = await getNote(req.params.id);
    res.status(200).json(response);
  })
);

notesRouter.patch(
  '/:id',
  mongoIdParamValidator('id'),
  zodSchemaValidator(updateNoteSchema, 'body', 'parsedBody'),
  middlewareWrapper(async (req, res) => {
    const noteId = req.params.id;
    const updateData = res.locals.parsedBody as UpdateNoteData;
    const response = await updateNote(noteId, updateData);
    res.status(200).json(response);
  })
);

notesRouter.delete(
  '/:id',
  mongoIdParamValidator('id'),
  middlewareWrapper(async (req, res) => {
    const noteId = req.params.id;
    const response = await deleteNote(noteId);
    res.status(200).json(response);
  })
);

export { notesRouter };
