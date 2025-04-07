import { beforeAll, beforeEach, describe, test } from 'vitest';
import supertest, { Response } from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { createApp } from '@server/app';
import { Note } from '@server/models';
import { CreateNoteData, GetNotesQueryParams, UpdateNoteData } from '@shared/types/api';

import { runDBHooks } from '../setup';
import { createNoteDataStub, updateNoteDataStub } from '../stubs';
import {
  invalidCreateNoteData,
  invalidGetNotesQueryParams,
  invalidIdParams,
  invalidUpdateNoteData,
} from '../data';
import { noteResourcePath, notesResourcePath } from '../constants';

describe('Notes API e2e', () => {
  const createNoteRequestLine = `POST ${notesResourcePath}`;
  const getNotesRequestLine = `GET ${notesResourcePath}`;
  const getNoteRequestLine = `GET ${noteResourcePath}`;
  const updateNoteRequestLine = `PATCH ${noteResourcePath}`;

  let testAgent: TestAgent;
  const seededNoteIds: string[] = [];

  runDBHooks(true);

  beforeAll(async () => {
    const app = await createApp();
    testAgent = supertest(app);

    const seededNotes = await Note.find();
    seededNoteIds.push(...seededNotes.map((n) => n.id));
  });

  describe(`Create Note API '${createNoteRequestLine}'`, () => {
    describe.each(invalidCreateNoteData)(
      'when requested with invalid inputs',
      (input) => {
        let response: Response;

        beforeEach(async () => {
          response = await testAgent!.post(notesResourcePath).send(input);
        });

        test(`should return '400 Bad Request'`, ({ expect }) => {
          expect(response.statusCode).toBe(400);
        });

        test(`should return errors`, ({ expect }) => {
          expect(response.body).toMatchObject({
            error: expect.stringMatching(/bad/gi),
            message: expect.stringMatching(/fail/gi),
          });
        });
      }
    );

    describe('when requested with valid input', () => {
      let data: CreateNoteData;
      let response: Response;

      beforeEach(async () => {
        data = createNoteDataStub();
        response = await testAgent!.post(notesResourcePath).send(data);
      });

      test(`should return '201 Created'`, ({ expect }) => {
        expect(response.statusCode).toBe(201);
      });

      test(`should return the created note`, ({ expect }) => {
        expect(response.body.note).toMatchObject({
          ...data,
        });
      });
    });
  });

  describe(`Get Notes API '${getNotesRequestLine}'`, () => {
    describe.each(invalidGetNotesQueryParams)(
      'when requested with invalid query params',
      (input) => {
        let response: Response;

        beforeEach(async () => {
          response = await testAgent.get(notesResourcePath).query(input);
        });

        test(`should fail with '400 Bad Request'`, ({ expect }) => {
          expect(response.statusCode).toBe(400);
        });

        test(`should respond with error`, ({ expect }) => {
          expect(response.body).toMatchObject({
            error: expect.stringMatching(/bad/gi),
            message: expect.stringMatching(/fail/gi),
          });
        });
      }
    );

    describe('when requested with valid query params', () => {
      let query: GetNotesQueryParams;
      let response: Response;

      beforeEach(async () => {
        query = {
          page: 1,
          pageLimit: 5,
          search: 'note',
        };
        response = await testAgent.get(notesResourcePath).query(query);
      });

      test(`should respond with '200 OK'`, ({ expect }) => {
        expect(response.statusCode).toBe(200);
      });

      test(`should return the data`, ({ expect }) => {
        expect(response.body).toMatchObject({
          data: expect.arrayContaining([
            expect.objectContaining({
              title: expect.stringMatching(/note/gi),
            }),
          ]),
          total: expect.any(Number),
          pageLimit: query.pageLimit,
          page: query.page,
        });
      });
    });
  });

  describe(`Get Note API '${getNoteRequestLine}'`, () => {
    describe.each(invalidIdParams)(
      'when requested with invalid id parameter',
      (idParam) => {
        let response: Response;

        beforeEach(async () => {
          response = await testAgent.get(
            noteResourcePath.replace(':id', idParam)
          );
        });

        test(`should fail with '400 Bad Request'`, ({ expect }) => {
          expect(response.statusCode).toBe(400);
        });

        test(`should respond with error`, ({ expect }) => {
          expect(response.body).toMatchObject({
            error: expect.stringMatching(/bad/gi),
            message: expect.stringMatching(/fail/gi),
          });
        });
      }
    );

    describe('when requested with valid id but non existing resource', () => {
      let id: string;
      let response: Response;

      beforeEach(async () => {
        id = 'ffffffffffffffffffffffff';
        response = await testAgent.get(noteResourcePath.replace(':id', id));
      });

      test(`should fail with '404 Not Found'`, ({ expect }) => {
        expect(response.statusCode).toBe(404);
      });

      test(`should respond with error`, ({ expect }) => {
        expect(response.body).toMatchObject({
          error: expect.stringMatching(/not found/gi),
          message: expect.stringMatching(/fail/gi),
        });
      });
    });

    describe('when requested with valid id', () => {
      let id: string;
      let response: Response;

      beforeEach(async () => {
        id = seededNoteIds[0];
        response = await testAgent.get(noteResourcePath.replace(':id', id));
      });

      test(`should respond with '200 OK'`, ({ expect }) => {
        expect(response.statusCode).toBe(200);
      });

      test(`should return the data`, ({ expect }) => {
        expect(response.body).toMatchObject({
          note: {
            id,
            title: expect.any(String),
            content: expect.any(String),
          },
        });
      });
    });
  });

  describe(`Update Note API '${updateNoteRequestLine}'`, () => {
    describe.each(invalidIdParams)(
      'when requested with invalid id parameter',
      (idParam) => {
        let response: Response;

        beforeEach(async () => {
          response = await testAgent
            .patch(noteResourcePath.replace(':id', idParam))
            .send(updateNoteDataStub());
        });

        test(`should fail with '400 Bad Request'`, ({ expect }) => {
          expect(response.statusCode).toBe(400);
        });

        test(`should return error response`, ({ expect }) => {
          expect(response.body).toMatchObject({
            error: expect.stringMatching(/bad/gi),
            message: expect.stringMatching(/fail/gi),
          });
        });
      }
    );

    describe('when requested with valid id but non existing resource', () => {
      let id: string;
      let response: Response;

      beforeEach(async () => {
        id = 'ffffffffffffffffffffffff';
        response = await testAgent
          .patch(noteResourcePath.replace(':id', id))
          .send(updateNoteDataStub());
      });

      test(`should fail with '404 Not Found'`, ({ expect }) => {
        expect(response.statusCode).toBe(404);
      });

      test(`should return error response`, ({ expect }) => {
        expect(response.body).toMatchObject({
          error: expect.stringMatching(/not found/gi),
          message: expect.stringMatching(/fail/gi),
        });
      });
    });

    describe.each(invalidUpdateNoteData)(
      'when requested with valid id & invalid update data',
      (invalidData) => {
        let id: string;
        let response: Response;

        beforeEach(async () => {
          id = seededNoteIds[0];
          response = await testAgent
            .patch(noteResourcePath.replace(':id', id))
            .send(invalidData);
        });

        test(`should fail with '400 Bad Request'`, ({ expect }) => {
          expect(response.statusCode).toBe(400);
        });

        test(`should return error response`, ({ expect }) => {
          expect(response.body).toMatchObject({
            error: expect.stringMatching(/bad request/gi),
            message: expect.stringMatching(/fail/gi),
          });
        });
      }
    );

    describe('when requested with valid id & valid data', () => {
      let noteId: string;
      let updateNoteData: UpdateNoteData;
      let response: Response;

      beforeEach(async () => {
        noteId = seededNoteIds[0];
        updateNoteData = updateNoteDataStub();

        response = await testAgent
          .patch(noteResourcePath.replace(':id', noteId))
          .send(updateNoteData);
      });

      test(`should respond with '200 OK'`, ({ expect }) => {
        expect(response.statusCode).toBe(200);
      });

      test(`should return success response`, ({ expect }) => {
        expect(response.body).toMatchObject({
          message: expect.stringMatching(/success/gi),
          note: {
            id: noteId,
            title: updateNoteData.title,
            content: updateNoteData.content,
          },
        });
      });
    });
  });
});
