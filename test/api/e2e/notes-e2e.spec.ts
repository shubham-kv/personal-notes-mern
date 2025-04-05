import { beforeAll, beforeEach, describe, test } from 'vitest';
import supertest, { Response } from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { createApp } from '@server/app';
import { CreateNoteData } from '@shared/types/api';

import { runDBHooks } from '../setup';
import { createNoteDataStub } from '../stubs';
import { invalidCreateNoteData } from '../data';
import { createNoteApiPath } from '../constants';

describe('Notes API e2e', () => {
  const createNoteRequestLine = `POST ${createNoteApiPath}`;
  let testAgent: TestAgent;

  beforeAll(async () => {
    const app = await createApp();
    testAgent = supertest(app);
  });
  runDBHooks();

  describe(`Create Note API '${createNoteRequestLine}'`, () => {
    describe.each(invalidCreateNoteData)(
      'when requested with invalid inputs',
      (input) => {
        let response: Response;

        beforeEach(async () => {
          response = await testAgent!.post(createNoteApiPath).send(input);
        });

        test(`should return '400 Bad Request'`, ({ expect }) => {
          expect(response.statusCode).toBe(400);
        });

        test(`should return errors`, ({ expect }) => {
          // expect(response.body).toBe(null); // To make the test fail & display the actual from expected vs. actual
          expect(response.body.errors[0]).toBeDefined();
        });
      }
    );

    describe('when requested with valid input', () => {
      let data: CreateNoteData;
      let response: Response;

      beforeEach(async () => {
        data = createNoteDataStub();
        response = await testAgent!.post(createNoteApiPath).send(data);
      });

      test(`should return '201 Created'`, ({ expect }) => {
        expect(response.statusCode).toBe(201);
      });

      test(`should return the created note`, ({ expect }) => {
        // expect(response.body).toBe(null); // To make the test fail explicitly
        expect(response.body.note).toMatchObject({
          ...data,
        });
      });
    });
  });
});
