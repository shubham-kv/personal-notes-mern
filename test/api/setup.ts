import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';
import { initiateDbConnection, terminateDbConnection } from '@server/lib/db';

async function clearDatabase() {
  const { connection } = mongoose;
  const collections = Object.values(connection.collections);

  for (const collection of collections) {
    await collection.drop();
  }
}

export function runDBHooks() {
  beforeAll(async () => {
    await initiateDbConnection();
  });

  afterAll(async () => {
    await clearDatabase();
    await terminateDbConnection();
  });
}
