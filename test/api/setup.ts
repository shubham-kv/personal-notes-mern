import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';
import { createNote } from '@server/services/notes';
import { initiateDbConnection, terminateDbConnection } from '@server/lib/db';
import { createNoteInputs } from './data';

async function seedNotes() {
  for (let i = 0; i < createNoteInputs.length; i++) {
    await createNote(createNoteInputs[i]);
  }
}

async function clearDatabase() {
  const { connection } = mongoose;
  const collections = Object.values(connection.collections);

  for (const collection of collections) {
    await collection.drop();
  }
}

export function runDBHooks(shouldSeed = false) {
  beforeAll(async () => {
    await initiateDbConnection();

    if (shouldSeed) {
      await seedNotes();
    }
  });

  afterAll(async () => {
    await clearDatabase();
    await terminateDbConnection();
  });
}
