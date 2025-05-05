import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';

import { User } from '@server/models';
import { createNote } from '@server/services/notes';
import { initiateDbConnection, terminateDbConnection } from '@server/lib/db';

import { createNoteInputs } from './data';
import { testUserStub } from './stubs';

async function seedNotes() {
  const testUser = await User.findOne({ email: testUserStub().email });

  if (!testUser) {
    throw new Error('Expected test user to exist, found none');
  }

  for (let i = 0; i < createNoteInputs.length; i++) {
    await createNote(testUser.id, createNoteInputs[i]);
  }
}

async function seedUsers() {
  await new User(testUserStub()).save();
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
      await seedUsers();
      await seedNotes();
    }
  });

  afterAll(async () => {
    await clearDatabase();
    await terminateDbConnection();
  });
}
