import { beforeAll, beforeEach, describe, test } from 'vitest';
import supertest, { Response } from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { createApp } from '@server/app';
import { CreateNoteData, GetNotesQueryParams } from '@shared/types/api';

import { runDBHooks } from '../setup';
import { createNoteDataStub } from '../stubs';
import { invalidCreateNoteData, invalidGetNotesQueryParams } from '../data';
import { notesResourcePath } from '../constants';

describe('Notes API e2e', () => {
  const createNoteRequestLine = `POST ${notesResourcePath}`;
  const getNotesRequestLine = `GET ${notesResourcePath}`;
  let testAgent: TestAgent;

  beforeAll(async () => {
    const app = await createApp();
    testAgent = supertest(app);
  });
  runDBHooks(true);

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
          })
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
          })
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
});
