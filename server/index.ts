import 'dotenv/config';
import { createApp } from './app';
import { initiateDbConnection } from './lib/db';
import { logger } from './logger';

(async function main() {
  const port = process.env.PORT || 5173;
  const app = await createApp();
  await initiateDbConnection();

  app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}/`);
  });
})();
