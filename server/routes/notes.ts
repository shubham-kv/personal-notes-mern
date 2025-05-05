import { Router } from 'express';
import { requireAuth } from '@clerk/express';

import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from '@server/services/notes';

import {
  authenticate,
  clerkAuthStrategy,
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
const signInUrl = process.env.CLERK_SIGN_IN_URL;

notesRouter.use(requireAuth({ signInUrl }), authenticate(clerkAuthStrategy));

notesRouter.post(
  '/',
  zodSchemaValidator(createNoteSchema, 'body', 'parsedBody'),
  middlewareWrapper(async (req, res) => {
    const parsedBody = res.locals.parsedBody as CreateNoteData;
    const createNoteResponse = await createNote(req.user!.id, parsedBody);
    res.status(201).json(createNoteResponse);
  })
);

notesRouter.get(
  '/',
  zodSchemaValidator(getNotesQueryParamsSchema, 'query', 'parsedQuery'),
  middlewareWrapper(async (req, res) => {
    const parsedQuery = res.locals.parsedQuery as GetNotesQueryParams;
    const response = await getNotes(req.user!.id, parsedQuery);
    res.status(200).json(response);
  })
);

notesRouter.get(
  '/:id',
  mongoIdParamValidator('id'),
  middlewareWrapper(async (req, res) => {
    const response = await getNote(req.user!.id, req.params.id);
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
    const response = await updateNote(req.user!.id, noteId, updateData);
    res.status(200).json(response);
  })
);

notesRouter.delete(
  '/:id',
  mongoIdParamValidator('id'),
  middlewareWrapper(async (req, res) => {
    const noteId = req.params.id;
    const response = await deleteNote(req.user!.id, noteId);
    res.status(200).json(response);
  })
);

export { notesRouter };
